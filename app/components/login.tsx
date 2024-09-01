"use client";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', email, password);

    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-30 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 transform -skew-y-6"></div>
      
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-20 border-0 rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white bg-opacity-20 border-0 rounded-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-md transition duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-white hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  )
}