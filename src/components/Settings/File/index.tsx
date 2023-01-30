import React, { useState, ChangeEvent, useEffect } from 'react'
import { create } from 'ipfs-http-client'
import { useTransactionModal } from 'context/TransactionContext'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { Buffer } from 'buffer'

import websiteABI from '../../../utils/abi/websiteABI.json'
import Folder from '../../../assets/icon/folder.png'
import Upload from '../../../assets/icon/upload.svg'
import Links from '../../../assets/icon/link.png'
import Unlink from '../../../assets/icon/unlink.png'
import './File.scss'
import { useQuery } from 'urql'
import { IWebsiteToken } from 'constants/types'
import { websitePageQuery } from 'constants/query'

const auth =
  'Basic ' +
  Buffer.from(
    process.env.REACT_APP_INFURA_PROJECT_ID +
      ':' +
      process.env.REACT_APP_INFURA_API_SECRET_KEY,
  ).toString('base64')
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

interface IFile {
  setClickCard: any
  domainName: string
  contractAddress: string
  contractData: any
  link: string
}
const File: React.FC<IFile> = ({
  setClickCard,
  contractAddress,
  contractData,
  link,
}) => {
  const { data: signerData } = useSigner()
  const { id } = useParams()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [openFile, setOpenFile] = useState<File | null>(null)
  const [hash, setHash] = useState('')
  const [step, setStep] = useState('selectfile')
  const [result] = useQuery<{ websiteTokens: IWebsiteToken[] }>({
    query: websitePageQuery,
  })
  console.log(link)
  console.log(step)
  useEffect(() => {
    if (!link) {
      return setStep('selectfile')
    }
    setStep('unlink')
  }, [link])

  const { data } = result

  const nftData = data?.websiteTokens ?? []
  console.log(nftData)

  useEffect(() => {
    if (!data) return
  }, [data])

  console.log(step)

  const upload = async () => {
    if (!address || !signerData || link) return
    if (openFile) {
      try {
        setTransaction({ loading: true, status: 'pending' })

        const JsonHash = await client.add(openFile)
        const imagePath = JsonHash.path
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${JsonHash.path}`
        console.log(ImgHash)
        setHash(imagePath)

        console.log('updated')
        setTransaction({ loading: true, status: 'success' })
        setStep('link')
      } catch (error) {
        console.log('Error sending File to IPFS:')
        console.log(error)
        setTransaction({ loading: true, status: 'error' })
      }
    }
  }

  const handleLink = async () => {
    if (!address || !signerData || link) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        contractAddress,
        websiteABI,
        signerData,
      )

      const tx = await contract.setLink(id, hash)
      await tx.wait()
      console.log('updated')
      setTransaction({ loading: true, status: 'success' })
      setStep('unlink')
      setClickCard(null)
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleUnLink = async () => {
    if (!address || !signerData || !link) return
    try {
      setTransaction({ loading: true, status: 'pending' })

      const contract = new ethers.Contract(
        contractAddress,
        websiteABI,
        signerData,
      )

      const tx = await contract.setLink(id, '')
      await tx.wait()
      console.log('updated')
      setTransaction({ loading: true, status: 'success' })
      setStep('selectfile')
      // setClickCard(null)
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="transfer-sub-menu-container sub-menu-container">
      <div className="transfer-head">
        <BsArrowLeftCircle
          className="arrow-icon"
          style={{ position: 'absolute', top: '40px' }}
          onClick={() => setClickCard(null)}
        />
        {link ? (
          <a
            href={`https://dapplink.infura-ipfs.io/ipfs/${link}`}
            style={{ textAlign: 'center', paddingBottom: '20px' }}
          >
            `https://dapplink.infura-ipfs.io/ipfs/${link}`
          </a>
        ) : (
          <h5
            style={{ color: 'red', textAlign: 'center', paddingBottom: '20px' }}
          >
            No Link
          </h5>
        )}
      </div>

      <div className="file-container">
        <div
          className="file-box"
          style={{
            opacity: step === 'selectfile' ? '1' : '0.4',
            pointerEvents: step === 'selectfile' ? 'auto' : 'none',
          }}
        >
          <div className="image">
            <img src={Folder} alt="" />
          </div>
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files || !e.target.files.length || link) return
              setOpenFile(e.target.files[0])
              setStep('upload')
            }}
            accept={
              contractData.pathName === 'my-websites' ? '.html' : 'jpg,png,svg'
            }
          />

          <h2>Select File</h2>
        </div>

        <div
          className="file-box"
          onClick={upload}
          style={{
            opacity: step === 'upload' ? '1' : '0.4',
            pointerEvents: step === 'upload' ? 'auto' : 'none',
          }}
        >
          <div className="image">
            <img src={Upload} alt="" />
          </div>
          <h2>Upload</h2>
        </div>

        <div
          className="file-box"
          onClick={handleLink}
          style={{
            opacity: step === 'link' ? '1' : '0.4',
            pointerEvents: step === 'link' ? 'auto' : 'none',
          }}
        >
          <div className="image">
            <img src={Links} alt="" />
          </div>
          <h2>Link</h2>
        </div>

        <div
          className="file-box"
          onClick={handleUnLink}
          style={{
            opacity: step === 'unlink' ? '1' : '0.4',
            pointerEvents: step === 'unlink' ? 'auto' : 'none',
          }}
        >
          <div className="image">
            <img src={Unlink} alt="" />
          </div>
          <h2> Unlink</h2>
        </div>
      </div>
    </div>
  )
}

export default File
