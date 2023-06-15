'use client'

// import NavBar from '@/components/NavBar'
import { Quicksand } from 'next/font/google'
import './globals.css'

// import dotenv from 'dotenv'
// dotenv.config()
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, goerli, sepolia, polygonMumbai, hardhat } from 'wagmi/chains'

const chains = [mainnet, goerli, sepolia, polygonMumbai, hardhat]
// const projectId = process.env.PROJECT_ID
const projectId = '0fbfc7b8de1bc01c0fba7d725bab50a6'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const inter = Quicksand({ subsets: ['latin'] })

export const metadata = {
  title: 'MedInsure',
  description: 'Embrace the power of blockchain for your medical needs.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          {/* <NavBar /> */}
          {children}
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </WagmiConfig>
      </body>
    </html>
  )
}
