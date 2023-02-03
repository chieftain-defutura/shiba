import React, { useState } from 'react'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'

import Modal from 'components/Model'
import Button from 'components/Button'
import abi from 'utils/abi/artABI.json'
import Close from 'assets/icon/close.svg'
import { useParams } from 'react-router-dom'
import { useTransactionModal } from 'context/TransactionContext'

const FileCategory: React.FC<{
  contractAddress: string
  setClickCard: React.Dispatch<any>
  tokenData: any
}> = ({ contractAddress, setClickCard, tokenData }) => {
  console.log(tokenData)
  const { id } = useParams() as { id: string }
  const [open, setOpen] = useState(true)
  const { data: signerData } = useSigner()
  const { setTransaction } = useTransactionModal()
  const [selectedCategory, setSelectedCategory] = useState(
    tokenData?.category ? tokenData?.category : '',
  )

  const handleClose = () => {
    setOpen(false)
    setClickCard(null)
  }

  const updateCategory = async () => {
    try {
      if (!signerData) return

      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(contractAddress, abi, signerData)

      handleClose()
      const tx = await contract.updateCategory(id, selectedCategory)
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  if (!open) return null

  return (
    <Modal isOpen={open} style={{ maxWidth: '460px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img
          src={Close}
          alt="close"
          style={{ cursor: 'pointer' }}
          onClick={() => handleClose()}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>Current Category</p>
        <h3>{tokenData?.category ? tokenData?.category : 'other'}</h3>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label
          style={{ marginBottom: '10px', display: 'block' }}
          htmlFor="category"
        >
          Select Category
        </label>
        <select
          name=""
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">select category</option>
          <option value="www">www</option>
          <option value="file">file</option>
          <option value="art">art</option>
          <option value="other">other</option>
        </select>
      </div>
      <div>
        <Button
          variant="primary"
          disabled={!selectedCategory}
          onClick={() => updateCategory()}
        >
          Update Category
        </Button>
      </div>
    </Modal>
  )
}

export default FileCategory
