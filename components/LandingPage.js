import React from 'react'
import Image from 'next/image'
import styles from '@/styles/styles'

const LandingPage = () => {
  return (
    <div>
      <div className={styles.LandingCont}>
        <div>
          {/* <h1 className={styles.Head}>WELCOME TO MEDINSURE </h1> */}
          <blockquote class='text-2xl font-semibold italic text-center text-white'>
            WELCOME TO
            <span class='ml-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block'>
              <span class='relative text-white'>MEDINSURE</span>
            </span>
          </blockquote>
          <p className={styles.Para}>
            At MedInsure, <br />
            we believe in revolutionizing the way medical insurance works. By
            harnessing the power of the Ethereum blockchain, we offer a secure,
            transparent, and efficient platform for your healthcare coverage
            needs. Our innovative approach ensures that you receive the best
            medical insurance services while benefiting from the advantages of
            decentralized technology
          </p>
          <p className={styles.Para}>
            We understand that navigating the world of medical insurance can be
            complex. That's why we've simplified the process. With MedInsure,
            submitting claims is effortless. <br />
            Our smart contracts automatically verify and process your claims,
            leading to faster settlements. No more lengthy paperwork or delayed
            reimbursements. We are here to make your insurance experience
            seamless and hassle-free.
          </p>
        </div>
        <Image
          src='/image2.png'
          width={300}
          height={300}
          alt='Doctor'
          className={styles.LandingImage1}
        />
      </div>
    </div>
  )
}

export default LandingPage
