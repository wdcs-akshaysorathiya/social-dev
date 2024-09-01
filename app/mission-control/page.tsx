"use client";
import React, { useState } from 'react'
import { Rocket, Battery, Wifi, Thermometer, Wind, AlertCircle } from 'lucide-react'

const StatusIndicator = ({ status }: { status: 'nominal' | 'warning' | 'critical' }) => {
  const colors = {
    nominal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  }
  return (
    <div className={`w-3 h-3 rounded-full ${colors[status]} animate-pulse`}></div>
  )
}

const SystemStatus = ({ icon: Icon, name, status, value }: { icon: React.ElementType, name: string, status: 'nominal' | 'warning' | 'critical', value: string }) => (
  <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-blue-400" />
      <span className="text-white">{name}</span>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-gray-300">{value}</span>
      <StatusIndicator status={status} />
    </div>
  </div>
)

const MissionLog = ({ time, message }: { time: string, message: string }) => (
  <div className="flex items-start space-x-3 text-sm">
    <span className="text-gray-400 whitespace-nowrap">{time}</span>
    <span className="text-white">{message}</span>
  </div>
)

export default function MissionControl() {
  const [selectedMission, setSelectedMission] = useState('Mars Colonization')
  const [commandInput, setCommandInput] = useState('')

  const missions = ['Mars Colonization', 'Lunar Base Alpha', 'Asteroid Mining']

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle command submission logic here
    console.log('Command submitted:', commandInput)
    setCommandInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Mission Control</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Active Mission: {selectedMission}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SystemStatus icon={Rocket} name="Propulsion" status="nominal" value="92%" />
              <SystemStatus icon={Battery} name="Power Systems" status="warning" value="68%" />
              <SystemStatus icon={Wifi} name="Communication" status="nominal" value="100%" />
              <SystemStatus icon={Thermometer} name="Life Support" status="nominal" value="99%" />
              <SystemStatus icon={Wind} name="Environmental" status="warning" value="76%" />
              <SystemStatus icon={AlertCircle} name="Radiation Levels" status="critical" value="HIGH" />
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Mission Log</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <MissionLog time="14:32:07" message="Oxygen recycling system optimized. Efficiency increased by 3%." />
              <MissionLog time="14:28:15" message="Minor solar flare detected. Radiation shielding holding stable." />
              <MissionLog time="14:15:00" message="Course correction maneuver completed successfully." />
              <MissionLog time="13:50:22" message="Communication relay established with Lunar Base Alpha." />
              <MissionLog time="13:42:10" message="Hydroponics bay reports 2% increase in crop yield." />
              <MissionLog time="13:30:00" message="Routine system diagnostics initiated." />
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Mission Selection</h2>
            <div className="space-y-2">
              {missions.map((mission) => (
                <button
                  key={mission}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedMission === mission
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedMission(mission)}
                >
                  {mission}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Command Center</h2>
            <form onSubmit={handleCommandSubmit}>
              <textarea
                className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-md p-3 mb-4 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Enter command..."
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Execute Command
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}