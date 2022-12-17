import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { useParams } from 'react-router-dom'
import { useTransactionModal } from '../../context/TransactionContext'

const Transfer: React.FC = () => {
  const { id } = useParams()
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [toAddress, setToAddress] = useState('')

  const result = ethers.utils.isAddress(toAddress)
  console.log(result)
  const handleSubmit = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      console.log('pending')

      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        data,
      )

      const tx = await contract.transferFrom(address, toAddress, id)
      await tx.wait()
      console.log('success')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="transfer-sub-menu-container sub-menu-container">
      <div className="content">
        <input type="text" onChange={(e) => setToAddress(e.target.value)} />
      </div>
      {!result && <div>please enter valid address</div>}
      <div className="btn-cont">
        <button
          onClick={handleSubmit}
          disabled={!toAddress}
          style={{ marginLeft: '10px' }}
        >
          Submit Changes
        </button>
      </div>
    </div>
  )
}

export default Transfer
