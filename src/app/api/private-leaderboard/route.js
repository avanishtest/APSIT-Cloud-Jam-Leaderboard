// src/app/api/private-leaderboard/route.js
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { promises as fs } from 'fs';
import path from 'path';
import { PRIVATE_LEADERBOARD_CONFIG, validateAccess } from '@/config/privateLeaderboard';

// Auto-detect numeric fields (same as main API)
const isNumericField = (fieldName) => {
  const numericPatterns = [
    /^#/,
    /^total/i,
    /count$/i,
    /^number/i,
  ];
  
  const excludePatterns = [
    /names of/i,
    /url/i,
    /email/i,
    /status/i,
  ];
  
  if (excludePatterns.some(pattern => pattern.test(fieldName))) {
    return false;
  }
  
  return numericPatterns.some(pattern => pattern.test(fieldName));
};

// Function to read CSV from local file
const readLocalCSV = async () => {
  const CSV_FILE_PATH = path.join(process.cwd(), 'public', 'data.csv');
  return await fs.readFile(CSV_FILE_PATH, 'utf-8');
};

// Function to read CSV from GCP Storage (when deployed)
const readGCPCSV = async () => {
  const { Storage } = await import('@google-cloud/storage');
  
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: process.env.GCP_CREDENTIALS ? JSON.parse(process.env.GCP_CREDENTIALS) : undefined
  });

  const bucketName = process.env.GCS_BUCKET_NAME || 'cloud-jam-leaderboard-data';
  const fileName = process.env.CSV_FILE_NAME || 'data.csv';
  
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  
  const [fileContents] = await file.download();
  return fileContents.toString('utf-8');
};

export async function POST(request) {
  try {
    // Get password from request body
    const body = await request.json();
    const { password } = body;
    
    // Validate access
    if (!validateAccess(password)) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        message: 'Invalid access credentials'
      }, { status: 401 });
    }
    
    let csvString;
    let dataSource = 'unknown';
    
    // Determine if we're running locally or on GCP
    if (process.env.GCP_PROJECT_ID && process.env.GCS_BUCKET_NAME) {
      csvString = await readGCPCSV();
      dataSource = 'gcp';
    } else {
      csvString = await readLocalCSV();
      dataSource = 'local-csv';
    }
    
    // Parse CSV to JSON
    const result = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });
    
    // Get headers from CSV
    const headers = result.meta.fields || [];
    
    // Transform data with auto-detected numeric conversion
    const transformedData = result.data.map(row => {
      const transformedRow = {};
      Object.keys(row).forEach(key => {
        if (isNumericField(key)) {
          transformedRow[key] = parseInt(row[key]) || 0;
        } else {
          transformedRow[key] = row[key];
        }
      });
      return transformedRow;
    });
    
    // Filter for only private participants
    const privateParticipants = transformedData.filter(participant => 
      PRIVATE_LEADERBOARD_CONFIG.participantEmails.includes(participant['User Email'])
    );
    
    return NextResponse.json({
      data: privateParticipants,
      headers: headers,
      totalRecords: privateParticipants.length,
      totalInConfig: PRIVATE_LEADERBOARD_CONFIG.participantEmails.length,
      lastUpdated: new Date().toISOString(),
      source: dataSource,
      isPrivate: true
    });
  } catch (error) {
    console.error('❌ Private API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      message: error.message,
      details: error.stack
    }, { status: 500 });
  }
}


