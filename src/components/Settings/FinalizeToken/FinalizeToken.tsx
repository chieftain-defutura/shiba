import React from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import { useAccount, useSigner } from 'wagmi'

import { useTransactionModal } from 'context/TransactionContext'
import {
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  RESIDUAL_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import residualABI from 'utils/abi/resideuABI.json'
import cardImgSix from 'assets/img/card-9.png'

const FinalizeToken: React.FC = () => {
  const { id } = useParams()
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const handleFinalizeToken = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        RESIDUAL_CONTRACT_ADDRESS,
        residualABI,
        data,
      )
      const tx = await contract.finalizeToken(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        id,
      )
      await tx.wait()
      console.log('finalized')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }
  return (
    <div onClick={handleFinalizeToken}>
      <img src={cardImgSix} alt="card" className="card-img-6" />
      <p>Finalize Token</p>
    </div>
  )
}

export default FinalizeToken
