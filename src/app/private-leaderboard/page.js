'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TEAMS } from '@/config/teams'

function PrivateLeaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className='w-full shadow-md relative'>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full m-auto text-center p-2 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className=""><Image src="/assets/cloudLg.png" alt="cloud" width="40" height="40" /></div>
            <p className='font-semibold'>🔒 Private Leaderboards</p>
          </div>
        </div>

        <div className="p-3 flex mob:flex-col m-auto max-w-6xl justify-between items-center">
          <div className="logo mob:border-b mob:border-b-gray-200 flex justify-center items-center">
            <div className="img w-16 h-16 rounded-full">
              <Image src="/assets/gdsc-logo.png" alt="GDSC" width="64" height="64" />
            </div>
            <div className="text flex flex-col justify-start items-start">
              <p className="text-base">Google Developer Group On Campus</p>
              <p className="text-xs">MLR Institute of Technology</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Select Your Team</h1>
          <p className="text-gray-600 text-lg">Choose your team to access the private leaderboard</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
          {Object.entries(TEAMS).map(([teamId, team]) => (
            <Link
              key={teamId}
              href={`/private-leaderboard/${teamId}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center border-2 border-transparent hover:border-purple-200 w-64 flex-shrink-0"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">
                    {team.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h3>
                <p className="text-gray-600 text-xs mb-3">{team.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span className="text-xs font-medium">
                    {team.participantEmails.length} participants
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-purple-600 group-hover:text-purple-700 transition-colors">
                <span className="text-sm font-medium">Access Leaderboard</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Public Leaderboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PrivateLeaderboard

