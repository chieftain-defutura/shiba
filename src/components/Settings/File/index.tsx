import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import axios from 'axios'
import { useTransactionModal } from 'context/TransactionContext'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import websiteABI from '../../../utils/abi/websiteABI.json'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Folder from '../../../assets/icon/folder.png'
import Upload from '../../../assets/icon/upload.svg'
import Links from '../../../assets/icon/link.png'
import Unlink from '../../../assets/icon/unlink.png'
import './File.scss'
import { useToStore } from 'pages/ShopSettingsOne'
import { useParams } from 'react-router-dom'

interface IFile {
  setClickCard: any
  domainName: string
  contractAddress: string
}
const File: React.FC<IFile> = ({ setClickCard, contractAddress }) => {
  const { data: signerData } = useSigner()
  const { id } = useParams()
  const { address } = useAccount()
  const inputFile = useRef<any>(null)
  const { setTransaction } = useTransactionModal()
  const [subDomain, setSubDomain] = useState<string | null>(null)
  const [openFile, setOpenFile] = useState<File | null>(null)
  const getVotes = useToStore((state: any) => state.storeData)
  const [hash, setHash] = useState(
    'Qma3Sxf1C8J86QVEBcSTTXiXSAMmXvYx4Ag8edBMLwaxKL',
  )
  const onButtonClick = () => {
    inputFile.current.click()
  }

  console.log(getVotes)

  const upload = async () => {
    if (!address || !signerData) return
    if (openFile) {
      try {
        setTransaction({ loading: true, status: 'pending' })
        const formData = new FormData()
        formData.append('file', openFile)

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
        console.log(ImgHash)
        setHash(resFile.data.IpfsHash)

        console.log('updated')
        setTransaction({ loading: true, status: 'success' })
        // setClickCard(null)
      } catch (error) {
        console.log('Error sending File to IPFS:')
        console.log(error)
        setTransaction({ loading: true, status: 'error' })
      }
    }
  }
  console.log(subDomain)

  useEffect(() => {
    const host = window.location.host
    const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2)
    if (arr.length > 0) setSubDomain(arr[0])
  }, [setSubDomain])

  const handleLink = async () => {
    if (!address || !signerData) return
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
      // setClickCard(null)
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleUnLink = async () => {
    if (!address || !signerData) return
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
      </div>

      <div className="file-container">
        <div className="file-box" onClick={onButtonClick}>
          <div className="image">
            <img src={Folder} alt="" />
          </div>
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files || !e.target.files.length) return
              setOpenFile(e.target.files[0])
            }}
            ref={inputFile}
            accept=".html"
            style={{ display: 'none' }}
          />
          <h2>Select File</h2>
        </div>

        <div className="file-box" onClick={upload}>
          <div className="image">
            <img src={Upload} alt="" />
          </div>
          <h2>Upload</h2>
        </div>

        <div className="file-box" onClick={handleLink}>
          <div className="image">
            <img src={Links} alt="" />
          </div>
          <h2>Link</h2>
        </div>

        <div className="file-box" onClick={handleUnLink}>
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
