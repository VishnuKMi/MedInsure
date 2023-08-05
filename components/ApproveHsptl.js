import React, { useState, useEffect } from 'react'
import styles from '@/styles/styles'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants'
import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import Link from 'next/link'

const ApproveHsptl = () => {
  const [claims, setClaims] = useState([])
  const { address } = useAccount()
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getClaims'
  })

  const { write: approve } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'approveClaim'
  })

  const { write: reject } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rejectClaim'
  })

  const { data: userData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserRole',
    args: [address]
  })

  const userRole = userData && userData.toString() // Extract the user role as a string
  console.log(userRole)
  console.log(address)

  useEffect(() => {
    if (!isLoading && !isError) {
      const updatedClaims = data.map((claim, index) => ({
        ...claim,
        id: index
      }))
      setClaims(updatedClaims)
    }
  }, [data, isLoading, isError])

  const handleApproveClaim = async index => {
    const claim = claims[index]
    if (claim) {
      try {
        await approve({ args: [BigInt(claim.id)] })
        console.log('Claim approved successfully')
      } catch (error) {
        console.error('Error approving claim:', error)
      }
    }
  }

  const handleRejectClaim = async index => {
    const claim = claims[index]
    if (claim) {
      try {
        await reject({ args: [BigInt(claim.id)] })
        console.log('Claim rejected')
      } catch (error) {
        console.error('Error rejecting claim', error)
      }
    }
  }

  console.log(claims)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading claims</div>
  }

  return (
    <div>
      <div className='font-bold mb-4 text-2xl'>PENDING CLAIMS</div>
      <ul>
        {address &&
          claims &&
          userRole === 'hospital' &&
          claims
            .filter(
              claim =>
                !claim.approvedByHospital &&
                !claim.rejectedByOwners &&
                !claim.executed
            )
            .map((claim, index) => (
              <li key={claim.id}>
                Patient: {claim.patient}
                <br />
                <div className={styles.HospitalAction}>
                  <div className={styles.ActionIndex}>
                    <Link
                      legacyBehavior
                      href={`http://ipfs.io/ipfs/${claim.ipfsHash}`}
                      passHref
                    >
                      <a target='_blank'>
                        <button className={styles.CheckBtn}>
                          Check report
                        </button>
                      </a>
                    </Link>
                  </div>
                  <div className={styles.ApproveReject}>
                    <button
                      className={styles.ApproveBtn}
                      disabled={!approve}
                      onClick={() => handleApproveClaim(index)}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.RejectBtn}
                      disabled={!reject}
                      onClick={() => handleRejectClaim(index)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default ApproveHsptl
