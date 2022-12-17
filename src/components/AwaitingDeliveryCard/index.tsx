import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { useTransactionModal } from '../../context/TransactionContext'
import shipmentABI from '../../utils/abi/shipmentABI.json'
import { SHIPMENT_CONTRACT } from '../../utils/contractAddress'
interface IAwaitingDeliveryCard {
  id: string
}

const AwaitingDeliveryCard: React.FC<IAwaitingDeliveryCard> = ({ id }) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

  const [recievedInput, setRecievedInput] = useState('')
  const [complainInput, setCompalainInput] = useState('')
  const [isReceived, setIsReceived] = useState(false)
  const [isComplain, setIsComplain] = useState(false)

  const handleRecieved = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(SHIPMENT_CONTRACT, shipmentABI, data)
      const tx = await contract.orderReceived(id, recievedInput)
      await tx.wait()

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }
  const handleComplain = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(SHIPMENT_CONTRACT, shipmentABI, data)
      const tx = await contract.orderReceived(id, complainInput)
      await tx.wait()

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <>
      {!isReceived && !isComplain && (
        <table cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <td>Product Name </td>
              <td>Quantity</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr className="body-tr">
              <td>
                <p>Shoes1</p>
              </td>
              <td>
                <p>1</p>
              </td>
              <td>
                <p>Shipped/Pending</p>
              </td>
              <td>
                <button onClick={() => setIsReceived(true)}>Received</button>
              </td>
              <td>
                <button
                  className="complaint-btn"
                  onClick={() => setIsComplain(true)}
                >
                  Complaint
                </button>
              </td>
            </tr>
            <tr className="spacer"></tr>
          </tbody>
        </table>
      )}
      {isReceived && (
        <div className="received-container">
          <div className="received-top">
            <p>0x002...02: All Great received, and very satisfied!</p>
            <p>0x003...03: Thank you, wish you grow and many sells</p>
            <p>0x003...04: Will buy always from you mate</p>
            <p>0x004...04: Great seller</p>
            <p>0x005...05: Just received shoes!</p>
          </div>
          <div className="received-bottom">
            <input onChange={(e) => setRecievedInput(e.target.value)} />
            <button onClick={handleRecieved}>Send and Mark as Received</button>
          </div>
        </div>
      )}
      {isComplain && (
        <div className="complain-container">
          <div className="complain-top">
            <p>0x002...02: All Great received, and very satisfied!</p>
            <p>0x003...03: Thank you, wish you grow and many sells</p>
            <p>0x003...04: Will buy always from you mate</p>
            <p>0x004...04: Great seller</p>
            <p>0x005...05: Just received shoes!</p>
          </div>
          <div className="complain-bottom">
            <input onChange={(e) => setCompalainInput(e.target.value)} />
            <button onClick={handleComplain}>Send and Complain</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AwaitingDeliveryCard
