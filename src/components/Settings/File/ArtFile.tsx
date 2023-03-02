import React, { ChangeEvent, useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'

import Folder from 'assets/icon/folder.png'
import Upload from 'assets/icon/upload.svg'
import Links from 'assets/icon/link.png'
import Unlink from 'assets/icon/unlink.png'
import { useTransactionModal } from 'context/TransactionContext'
import artABi from 'utils/abi/artABI.json'
import { IContractData } from 'constants/contract'
import { WEBSITE_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'

const CHUNK_SIZE = 7500

function splitString(str: string) {
  const numChunks = Math.ceil(str.length / CHUNK_SIZE)
  const chunks = []

  for (let i = 0; i < numChunks; i++) {
    const start = i * CHUNK_SIZE
    const end = start + CHUNK_SIZE
    chunks.push(str.slice(start, end))
  }

  return chunks
}

type IChunk = {
  chunkData: string
  isUploaded: boolean
}

const ArtFile = ({
  setClickCard,
  contractData,
}: {
  setClickCard: any
  contractData: IContractData
}) => {
  const [image, setImage] = useState<File | null>(null)
  const [chunks, setChunks] = useState<IChunk[]>([])
  const [step, setStep] = useState('selectfile')
  const { data: signerData } = useSigner()
  const { id } = useParams() as { id: string }
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const handleImageInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    console.log(file)
    setImage(file)

    if (
      contractData.address.toLowerCase() ===
      WEBSITE_NFT_CONTRACT_ADDRESS.toLowerCase()
    ) {
      const reader1 = new FileReader()
      reader1.readAsDataURL(file)

      reader1.onloadend = async () => {
        const chunkStrings = splitString(reader1.result as string)

        setChunks(
          chunkStrings.map((chunk) => ({
            chunkData: chunk,
            isUploaded: false,
          })),
        )
        setStep('upload')
      }
    } else {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = async () => {
        const image = reader.result as ArrayBuffer
        const chunks = []
        const chunkCount = Math.ceil(image.byteLength / CHUNK_SIZE)

        for (let i = 0; i < chunkCount; i++) {
          const start = i * CHUNK_SIZE
          const end = start + CHUNK_SIZE
          const chunk = image.slice(start, end)
          chunks.push(chunk)
        }

        const chunkStrings = chunks.map((chunk) => {
          const uint8Array = new Uint8Array(chunk) as any
          const encodedString = btoa(
            String.fromCharCode.apply(null, uint8Array),
          )
          return encodedString
        })

        setStep('upload')
        setChunks(
          chunkStrings.map((chunk) => ({
            chunkData: chunk,
            isUploaded: false,
          })),
        )
      }
    }
  }

  const handleUploadChunk = async (index: number, chunk: string) => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        contractData.address,
        artABi,
        signerData,
      )

      const tx = await contract.uploadChunk(id, index, chunk)
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
        message: `Uploaded chunk ${index} successfully`,
      })

      const newChunks = chunks
      newChunks[index] = { ...newChunks[index], isUploaded: true }
      setChunks(newChunks)

      if (chunks.length - 1 === index) setStep('link')
      else {
        handleUploadChunk(index + 1, chunks[index + 1].chunkData)
      }
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleUpload = () => {
    setStep('uploadChunks')
  }

  const handleLink = async () => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        contractData.address,
        artABi,
        signerData,
      )

      const tx = await contract.setLink(id, image?.type, chunks.length)
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
      setClickCard(null)
    } catch (error) {
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleUnLink = async () => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        contractData.address,
        artABi,
        signerData,
      )

      const tx = await contract.unLink(id)
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      setTransaction({ loading: true, status: 'error' })
    }
  }

  if (step === 'uploadChunks') {
    return (
      <div className="chunk-grid">
        {chunks.map((chunk, index) => (
          <div
            key={index}
            className="chunk-grid-card"
            onClick={() => handleUploadChunk(index, chunk.chunkData)}
            style={{
              border: '1px solid',
              borderColor: chunk.isUploaded ? 'green' : 'tomato',
            }}
          >
            <h3>Chunk {index + 1}</h3>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="transfer-sub-menu-container sub-menu-container">
      <div className="transfer-head">
        <BsArrowLeftCircle
          className="arrow-icon"
          style={{
            position: 'absolute',
            top: '29px',
            left: '50px',
            fontSize: '28px',
            cursor: 'pointer',
          }}
          onClick={() => setClickCard('file Details')}
        />
      </div>

      <div className="file-container">
        <div
          className="file-box"
          style={{
            opacity: step === 'selectfile' ? '1' : '0.4',
            pointerEvents: step === 'selectfile' ? 'auto' : 'none',
          }}
        >
          <label htmlFor="file">
            <div className="image">
              <img src={Folder} alt="" />
            </div>

            <h2>Select File</h2>
          </label>
          <input
            id="file"
            type="file"
            onChange={handleImageInput}
            accept={contractData.acceptedFileType}
            style={{ display: 'none' }}
          />
        </div>

        <div
          className="file-box"
          onClick={handleUpload}
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
          // style={{
          //   opacity: step === 'unlink' ? '1' : '0.4',
          //   pointerEvents: step === 'unlink' ? 'auto' : 'none',
          // }}
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
export default ArtFile
