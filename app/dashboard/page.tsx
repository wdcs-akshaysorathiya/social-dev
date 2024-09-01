"use client";
import React, { useState } from 'react'
import { Rocket, Satellite, Globe, Users, AlertTriangle, BarChart2, Radio } from 'lucide-react'
import { useRouter } from 'next/navigation';

const MissionStatus = ({ status }: { status: 'active' | 'completed' | 'failed' }) => {
  const colors = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    failed: 'bg-red-500'
  }
  return (
    <div className={`w-3 h-3 rounded-full ${colors[status]}`}></div>
  )
}

const StatCard = ({ icon: Icon, title, value, change }: { icon: React.ElementType, title: string, value: string, change: number }) => (
  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex items-center space-x-4">
    <div className="bg-indigo-500 bg-opacity-30 p-3 rounded-full">
      <Icon className="w-6 h-6 text-indigo-300" />
    </div>
    <div>
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-indigo-200 text-2xl font-bold">{value}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </p>
    </div>
  </div>
)

export default function Dashboard() {
  const [selectedMission, setSelectedMission] = useState<number | null>(null)
  const router = useRouter()

  const missions = [
    { id: 1, name: 'Mars Colonization', status: 'active' as const },
    { id: 2, name: 'Lunar Base Alpha', status: 'completed' as const },
    { id: 3, name: 'Asteroid Mining', status: 'active' as const },
    { id: 4, name: 'Jupiter Exploration', status: 'failed' as const },
  ]

  const handleMissionControlClick = () => {
    router.replace("/mission-control");
    console.log('Navigating to Mission Control')
    // In a real application, you would use a router to navigate
    // For example, with Next.js:
    // router.push('/mission-control')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Space Exploration Dashboard</h1>
        <button
          onClick={handleMissionControlClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors duration-300"
        >
          <Radio className="w-5 h-5" />
          <span>Mission Control</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Rocket} title="Active Missions" value="3" change={5} />
        <StatCard icon={Satellite} title="Satellites Deployed" value="28" change={-2} />
        <StatCard icon={Globe} title="Planets Explored" value="4" change={0} />
        <StatCard icon={Users} title="Astronauts on Duty" value="12" change={20} />
        <StatCard icon={AlertTriangle} title="Critical Alerts" value="2" change={-50} />
        <StatCard icon={BarChart2} title="Resource Utilization" value="78%" change={3} />
      </div>

      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Mission Overview</h2>
        <div className="space-y-4">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                selectedMission === mission.id
                  ? 'bg-indigo-500 bg-opacity-50 transform scale-105'
                  : 'bg-white bg-opacity-5 hover:bg-opacity-10'
              }`}
              onClick={() => setSelectedMission(mission.id === selectedMission ? null : mission.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MissionStatus status={mission.status} />
                  <h3 className="font-semibold">{mission.name}</h3>
                </div>
                <span className="text-indigo-300">{mission.status}</span>
              </div>
              {selectedMission === mission.id && (
                <div className="mt-4 text-sm text-indigo-200 animate-fadeIn">
                  <p>Mission Details:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Launch Date: June 15, 2025</li>
                    <li>Crew Members: 6</li>
                    <li>Expected Duration: 2 years</li>
                    <li>Primary Objective: Establish sustainable habitat</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}