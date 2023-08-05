import React, { useState } from 'react'
import styles from '@/styles/styles'
import CreateClaim from './CreateClaim'
import ApproveHsptl from './ApproveHsptl'
import ApproveIns from './ApproveIns'

const HeroSection = () => {
  const [activeComponent, setActiveComponent] = useState('CreateClaim')

  const handleContentClick = cont => {
    setActiveComponent(cont)
  }

  return (
    <div className={styles.HeroContainer}>
      <div className={styles.RoleIndex}>
        <div
          class='cursor-pointer hover:bg-gray-600 p-2 rounded-lg'
          onClick={() => handleContentClick('CreateClaim')}
        >
          PATIENT
        </div>
        <div
          class='cursor-pointer hover:bg-gray-600 p-2 rounded-lg'
          onClick={() => handleContentClick('ApproveHsptl')}
        >
          HOSPITAL
        </div>
        <div
          class='cursor-pointer hover:bg-gray-600 p-2 rounded-lg'
          onClick={() => handleContentClick('ApproveIns')}
        >
          INSURANCE
        </div>
      </div>
      <div className={styles.RoleContent}>
        {activeComponent === 'CreateClaim' && <CreateClaim />}
        {activeComponent === 'ApproveHsptl' && <ApproveHsptl />}
        {activeComponent === 'ApproveIns' && <ApproveIns />}
      </div>
    </div>
  )
}

export default HeroSection
