import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'

import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'
import digitalShopABI from 'utils/abi/digitalShopABI.json'
import { useTransactionModal } from 'context/TransactionContext'

interface IAppearanceSetting {
  setClickCard: any
}

const Transfer: React.FC<IAppearanceSetting> = ({ setClickCard }) => {
  const { id } = useParams()
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [toAddress, setToAddress] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const isValidAddress = ethers.utils.isAddress(toAddress)

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
      navigate(`/${location.pathname.split('/')[1]}`)
      setTransaction({ loading: true, status: 'success' })
      console.log('success')
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="transfer-sub-menu-container sub-menu-container">
      <div className="transfer-head">
        <BsArrowLeftCircle
          className="arrow-icon"
          onClick={() => setClickCard(null)}
        />
        <h2>Transfer</h2>
      </div>

      <div className="content">
        <input type="text" onChange={(e) => setToAddress(e.target.value)} />
      </div>
      {!isValidAddress && (
        <div style={{ color: 'red', fontSize: '16px' }}>
          please enter valid address
        </div>
      )}
      <div className="btn-cont">
        <button
          onClick={handleSubmit}
          disabled={!toAddress || !isValidAddress}
          style={{ marginLeft: '10px' }}
        >
          Submit Changes
        </button>
      </div>
    </div>
  )
}

export default Transfer
