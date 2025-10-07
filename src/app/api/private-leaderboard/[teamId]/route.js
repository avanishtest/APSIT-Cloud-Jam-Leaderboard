// src/app/api/private-leaderboard/[teamId]/route.js
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { promises as fs } from 'fs';
import path from 'path';
import { getTeam, UNIFIED_PASSWORD } from '@/config/teams';

const isNumericField = (fieldName) => {
  const numericPatterns = [/^#/, /^total/i, /count$/i, /^number/i];
  const excludePatterns = [/names of/i, /url/i, /email/i, /status/i];
  if (excludePatterns.some((p) => p.test(fieldName))) return false;
  return numericPatterns.some((p) => p.test(fieldName));
};

const readLocalCSV = async () => {
  const CSV_FILE_PATH = path.join(process.cwd(), 'public', 'data.csv');
  return await fs.readFile(CSV_FILE_PATH, 'utf-8');
};

const readGCPCSV = async () => {
  const { Storage } = await import('@google-cloud/storage');
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: process.env.GCP_CREDENTIALS ? JSON.parse(process.env.GCP_CREDENTIALS) : undefined,
  });
  const bucketName = process.env.GCS_BUCKET_NAME || 'cloud-jam-leaderboard-data';
  const fileName = process.env.CSV_FILE_NAME || 'data.csv';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  const [fileContents] = await file.download();
  return fileContents.toString('utf-8');
};

export async function POST(request, { params }) {
  try {
    const teamId = params?.teamId;
    if (!teamId) {
      return NextResponse.json({ error: 'Missing teamId' }, { status: 400 });
    }

    const team = getTeam(teamId);
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const providedPassword = body?.password;

    if (!providedPassword || providedPassword !== UNIFIED_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let csvString;
    let dataSource = 'unknown';
    if (process.env.GCP_PROJECT_ID && process.env.GCS_BUCKET_NAME) {
      csvString = await readGCPCSV();
      dataSource = 'gcp';
    } else {
      csvString = await readLocalCSV();
      dataSource = 'local-csv';
    }

    const result = Papa.parse(csvString, { header: true, skipEmptyLines: true, dynamicTyping: false });
    const headers = result.meta.fields || [];

    const transformedData = result.data.map((row) => {
      const transformedRow = {};
      Object.keys(row).forEach((key) => {
        transformedRow[key] = isNumericField(key) ? parseInt(row[key]) || 0 : row[key];
      });
      return transformedRow;
    });

    const filtered = transformedData.filter((p) => team.participantEmails.includes(p['User Email']));

    return NextResponse.json({
      teamId,
      teamName: team.name,
      data: filtered,
      headers,
      totalRecords: filtered.length,
      lastUpdated: new Date().toISOString(),
      source: dataSource,
      isPrivate: true,
    });
  } catch (error) {
    console.error('Private team API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
  }
}



