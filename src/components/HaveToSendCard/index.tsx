import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { useTransactionModal } from '../../context/TransactionContext'
import shipmentABI from '../../utils/abi/shipmentABI.json'
import { SHIPMENT_CONTRACT } from '../../utils/contractAddress'

interface IHaveToSendCard {
  id: string
}

const HaveToSendCard: React.FC<IHaveToSendCard> = ({ id }) => {
  const { address } = useAccount()
  const { data } = useSigner()
  const { setTransaction } = useTransactionModal()

  const handleStartShipment = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(SHIPMENT_CONTRACT, shipmentABI, data)
      const tx = await contract.startShipment(id)
      await tx.wait()

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleCancelOrder = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(SHIPMENT_CONTRACT, shipmentABI, data)
      const tx = await contract.cancelBuyOrder(id)
      await tx.wait()

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }
  return (
    <>
      <tr className="body-tr">
        <td>
          <p>Shoes1</p>
        </td>
        <td>
          <p>1</p>
        </td>
        <td>
          <button onClick={handleStartShipment}>Start Shipment</button>
        </td>
        <td>
          <button className="cancel-btn" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        </td>
      </tr>
      <tr className="spacer"></tr>
    </>
  )
}

export default HaveToSendCard
