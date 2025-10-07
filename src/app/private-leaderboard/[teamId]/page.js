'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import DynamicTableHeader from '@/components/DynamicTableHeader'
import TableBody from '@/components/TableBody'
import { hasCompletedAll } from '@/config/tableConfig'
import { TEAMS } from '@/config/teams'

export default function TeamLeaderboard() {
  const { teamId } = useParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [data, setData] = useState([])
  const [Participationdata, setParticipationdata] = useState([])
  const [EligibleforSwags, setEligibleforSwags] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const team = TEAMS[teamId]

  useEffect(() => {
    if (!team) return
    const stored = sessionStorage.getItem(`privateAccess:${teamId}`)
    if (stored) {
      setPassword(stored)
      handleAutoLogin(stored)
    }
  }, [teamId])

  const sortLeaderboard = (dataToSort) => {
    return dataToSort
      .map((participant, originalIndex) => ({
        ...participant,
        _originalIndex: originalIndex,
        _totalScore:
          (parseInt(participant['# of Skill Badges Completed']) || 0) +
          (parseInt(participant['# of Arcade Games Completed']) || 0),
      }))
      .sort((a, b) => {
        const statusA = a['Access Code Redemption Status'] === 'Yes' ? 0 : 1
        const statusB = b['Access Code Redemption Status'] === 'Yes' ? 0 : 1
        if (statusA !== statusB) return statusA - statusB
        if (b._totalScore !== a._totalScore) return b._totalScore - a._totalScore
        return a._originalIndex - b._originalIndex
      })
  }

  const loadLeaderboardData = (jsonData) => {
    const sorted = sortLeaderboard(jsonData)
    setData(sorted)
    setParticipationdata(sorted)
    const eligible = sorted.filter((p) => hasCompletedAll(p)).length
    setEligibleforSwags(eligible)
    setLoading(false)
  }

  const handleAutoLogin = async (pwd) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/private-leaderboard/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      })
      if (res.ok) {
        const result = await res.json()
        setIsAuthenticated(true)
        loadLeaderboardData(result.data || [])
      } else {
        sessionStorage.removeItem(`privateAccess:${teamId}`)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      sessionStorage.removeItem(`privateAccess:${teamId}`)
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError('')
    try {
      const res = await fetch(`/api/private-leaderboard/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.status === 401) {
        setLoginError('Invalid password')
        setLoading(false)
        return
      }
      if (!res.ok) throw new Error('Request failed')
      const result = await res.json()
      sessionStorage.setItem(`privateAccess:${teamId}`, password)
      setIsAuthenticated(true)
      loadLeaderboardData(result.data || [])
    } catch (err) {
      console.error('Login error:', err)
      setLoginError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  const searchname = (name) => {
    if (!name.trim()) {
      setParticipationdata(data)
      return
    }
    const filtered = data.filter((participant) => {
      const searchFields = [
        participant['User Name'],
        participant['User Email'],
        participant['Profile URL Status'],
      ].filter(Boolean)
      return searchFields.some((f) => f.toLowerCase().includes(name.toLowerCase()))
    })
    setParticipationdata(filtered)
  }

  if (!team) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='text-center text-red-500'>Team not found</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src="/assets/gdsc-logo.png" alt="GDSC Logo" width="80" height="80" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{team.name}</h1>
            <p className="text-gray-600 text-sm">Private Leaderboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Access Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Access Leaderboard'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← Back to Public Leaderboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading private leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className="text-center text-red-500">
          <p className="text-xl">Error loading data: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <nav className='w-full shadow-md relative'>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full m-auto text-center p-2 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className=""><Image src="/assets/cloudLg.png" alt="cloud" width="40" height="40" /></div>
            <p className='font-semibold'>🔒 {team.name} — Private Leaderboard</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(`privateAccess:${teamId}`); setIsAuthenticated(false); setPassword(''); setData([]); setParticipationdata([]); }}
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className='w-full relative px-3'>
        <div className="sec m-auto my-10 space-y-8 w-1/2 mob:w-full flex flex-col">
          <div className="info flex mob:flex-col mob:justify-center mob:items-center mob:space-y-10 mob:p-5 justify-evenly space-x-3 mob:space-x-0">
            <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-green-50 shadow-lg shadow-green-300/30 border border-green-200">
              <p className="text-center mob:text-start text-sm text-green-400">Eligible for Swags</p>
              <p className="no text-2xl border-l-2 border-l-green-700 pl-3 text-green-800">{EligibleforSwags}</p>
            </div>
            <div className="eligibleforswag w-fit mob:w-full h-20 p-5 space-x-5 rounded-lg flex flex-row justify-evenly mob:justify-between items-center bg-purple-50 shadow-lg shadow-purple-300/30 border border-purple-200">
              <p className="text-center mob:text-start text-sm text-purple-400">Private Participants</p>
              <p className="no text-2xl border-l-2 border-l-purple-700 pl-3 text-purple-800">{data.length}</p>
            </div>
          </div>

          <div className="search m-auto mt-3 mob:py-3 py-2 space-x-5 flex justify-start items-center shadow-lg shadow-purple-400/30 bg-purple-50 w-full rounded-full">
            <div className="icon px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5' viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#9333ea" />
              </svg>
            </div>
            <div className="input w-full">
              <input onChange={(e) => searchname(e.target.value)} className='bg-transparent mob:text-lg text-base outline-none w-full' type="text" name="searchbar" id="searchbar" placeholder='Search Name Here' />
            </div>
          </div>

          {Participationdata.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-10">No results found</div>
          )}
        </div>

        {Participationdata.length > 0 && (
          <table className='mx-auto table-fixed m-5'>
            <DynamicTableHeader />
            <TableBody Participationdata={Participationdata} setParticipationdata={setParticipationdata} />
          </table>
        )}
      </div>
    </>
  )
}



