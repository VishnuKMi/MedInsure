import React from 'react'
import styles from '@/styles/styles'
import { Web3Button } from '@web3modal/react'

const NavBar = () => {
  return (
    <div>
      <div className={styles.NavBar}>
        <h1 class='mb-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
          <span class='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            MedInsure
          </span>{' '}
        </h1>
        <div className={styles.NavBarRight}>
          {/* <div>Notifications</div> */}
          <Web3Button />
        </div>
      </div>
    </div>
  )
}

export default NavBar
