import React, { useState, useEffect } from 'react'
import styles from '@/styles/styles'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import Link from 'next/link'

import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead
} from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants/index'

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { BsFillCartFill } from 'react-icons/bs'

const projectId = '2REJ4VvIBHM1rYin5AgQv6LwDUA'
const projectSecretKey = '11f5a0d8ea71c2f20638bce49c34cd82'
const authorization = 'Basic ' + btoa(projectId + ':' + projectSecretKey)

const CreateClaim = () => {
  const [enteredHsptl, setEnteredHsptl] = useState('')
  const [enteredIns, setEnteredIns] = useState('')
  const [message, setMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [togglePending, setTogglePending] = useState(true)

  const fileChangeHandler = async e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      const ipfs = ipfsHttpClient({
        url: 'https://ipfs.infura.io:5001/api/v0',
        headers: {
          authorization
        }
      })
      const buffer = Buffer.from(reader.result)

      try {
        const { cid } = await ipfs.add(buffer)
        setUploadedFile(cid.toString())
        setIsFileUploaded(true)
      } catch (error) {
        console.error('Error uploading file to IPFS:', error)
      }
    }

    if (file) {
      reader.readAsArrayBuffer(file)
    }
  }

  const hsptlChangeHandler = e => {
    setEnteredHsptl(e.target.value)
  }

  const insChangeHandler = e => {
    setEnteredIns(e.target.value)
  }

  const { data, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createClaimReq',
    args: [uploadedFile, enteredHsptl, enteredIns],
    onSuccess (data) {
      setMessage('Claim Initiated')
    },
    onError (error) {
      setMessage('Enter Valid Details')
    }
  })

  const [claimsData, setClaimsData] = useState([])
  const {
    data: fetchedClaims,
    isError,
    isLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getClaims'
  })
  console.log(claimsData)

  useEffect(() => {
    if (!isError && !isLoading && fetchedClaims) {
      setClaimsData(fetchedClaims)
    }
  }, [isError, isLoading, fetchedClaims])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message])

  const handleSubmit = e => {
    e.preventDefault()
    if (isFileUploaded) {
      write()
    } else {
      setMessage('Please upload a file before submitting.')
    }
  }

  const style = {
    wrapperItem: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
    title: `bg-[#262b2f] px-6 py-4 flex items-center`,
    titleLeft: `flex-1 flex items-center text-xl font-bold`,
    titleIcon: `text-3xl mr-2`,
    titleRight: `text-xl`,
    tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
    tableBody: `flex w-full mt-8 px-4 py-1`,
    eventItem: `flex px-4 py-5 font-medium`,
    event: `flex items-center`,
    eventIcon: `mr-2 text-xl`,
    eventName: `text-lg font-semibold`,
    eventPrice: `flex items-center`,
    eventPriceValue: `text-lg`,
    ethLogo: `h-5 mr-2`,
    accent: `text-[#2081e2]`
  }

  return (
    <div>
      <h1 className='font-bold text-2xl'>CREATE CLAIM REQUEST</h1>
      <div className='flex'>
        <form onSubmit={handleSubmit} class='w-[500px] p-4 pl-16 pt-[45px]'>
          <label
            class='block mb-2 text-sm text-gray-900 dark:text-white'
            for='user_avatar'
          >
            Upload Report
          </label>

          <input
            class='block mb-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            aria-describedby='user_avatar_help'
            type='file'
            onChange={fileChangeHandler}
          />
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              onChange={hsptlChangeHandler}
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Hospital Address
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              onChange={insChangeHandler}
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Insurance Company Address
            </label>
          </div>
          <button
            type='submit'
            class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
          {message}
        </form>
        {/* <div className='mt-10'>
          {uploadedFile && (
            <Link
              legacyBehavior
              href={`http://ipfs.io/ipfs/${uploadedFile}`}
              passHref
            >
              <a target='_blank'>
                <button className={styles.CheckBtn}>Check report</button>
              </a>
            </Link>
          )}
        </div> */}
      </div>
      <div className={style.wrapperItem}>
        <div
          className={style.title}
          onClick={() => setTogglePending(!togglePending)}
        >
          <div className={style.titleLeft}>
            <span className={style.titleIcon}>
              <CgArrowsExchangeV />
            </span>
            Claim Status
          </div>
          <div className={style.titleRight}>
            {togglePending ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
        </div>
        {togglePending && (
          <div className={style.activityTable}>
            <div className={style.tableHeader}>
              <div className='flex-[2] w-full px-4'>Serial ID</div>
              <div className='flex-[3] w-full px-4'>Status</div>
              <div className='flex-[2] w-full px-4'>Report</div>
            </div>
            {claimsData.map((claim, index) => (
              <div className={style.eventItem} key={index}>
                <div className='flex-[2] w-full px-4'>
                  <div className={style.eventName}>{index + 1}</div>
                </div>
                <div className='flex-[3] w-full px-4'>
                  <div className={style.eventName}>
                    {claim.executed ? (
                      <div>APPROVED</div>
                    ) : claim.rejectedByOwners ? (
                      <div>REJECTED</div>
                    ) : (
                      <div>PENDING</div>
                    )}
                  </div>
                </div>
                <div className='flex-[2] w-full px-4'>
                  <div className={style.eventName}>
                    <Link
                      legacyBehavior
                      href={`http://ipfs.io/ipfs/${claim.ipfsHash}`}
                      passHref
                    >
                      <a target='_blank'>
                        <button className={styles.CheckBtn}>View report</button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateClaim
