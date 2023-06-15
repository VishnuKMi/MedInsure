'use client'

import React, { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import LandingPage from '@/components/LandingPage'
import NavBar from '@/components/NavBar'

import { useAccount } from 'wagmi'

export default function Home () {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false)

  const handleConnect = () => {
    setIsMetaMaskConnected(true)
  }

  const handleDisconnect = () => {
    setIsMetaMaskConnected(false)
  }

  useAccount({
    onConnect ({ address, connector, isReconnected }) {
      setIsMetaMaskConnected(true)
    },
    onDisconnect () {
      setIsMetaMaskConnected(false)
    }
  })

  return (
    <div>
      <NavBar
        isMetaMaskConnected={isMetaMaskConnected}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      {isMetaMaskConnected ? <HeroSection /> : <LandingPage />}
    </div>
  )
}
