import React from 'react'
import { ethers } from 'ethers'
import { useParams } from 'react-router-dom'
import { useContractRead, useAccount } from 'wagmi'
import { DIGITAL_GOODS_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import cardImg from '../../assets/img/card-3.png'
import { useTransactionModal } from '../../context/TransactionContext'

const RemoveItem = () => {
  const { id } = useParams()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const { data }: { data: any } = useContractRead({
    address: DIGITAL_GOODS_ADDRESS,
    abi: digitalShopABI,
    functionName: 'getItemDetails',
    args: ['0'],
  })

  const handleRemoveItem = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        DIGITAL_GOODS_ADDRESS,
        digitalShopABI,
        data,
      )
      const tx = await contract.removeItem(id)
      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="stock-management-remove-item-container">
      <div className="remove-item-cards-container">
        <div>
          <div className="remove-item-card">
            <div className="card-top">
              <img src={cardImg} alt="card" />
            </div>
            <div className="card-center">
              <h3 className="title">The Holy Grail</h3>
              <h4 className="sub-title">Pixart Motion</h4>
            </div>
            <div className="card-bottom">
              <p>Fixed price</p>
              <button> ETH</button>
            </div>
            <div className="card-overlay">
              <button>Details</button>
              <button onClick={handleRemoveItem}>Remove Shop</button>
            </div>
          </div>
          <div className="remove-card-bottom">
            <p>Name: shoes winter</p>
            <p>item-id: {data?.[0].toString()}</p>
          </div>
        </div>

        <div>
          <div className="remove-item-card">
            <div className="card-top">
              <img src={cardImg} alt="card" />
            </div>
            <div className="card-center">
              <h3 className="title">The Holy Grail</h3>
              <h4 className="sub-title">Pixart Motion</h4>
            </div>
            <div className="card-bottom">
              <p>Fixed price</p>
              <button>0.001 ETH</button>
            </div>
            <div className="card-overlay">
              <button>Details</button>
              <button onClick={handleRemoveItem}>Remove Shop</button>
            </div>
          </div>
          <div className="remove-card-bottom">
            <p>Name: shoes summer</p>
            <p>Quantity: 100</p>
            <p>Total Sell: 10</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveItem
