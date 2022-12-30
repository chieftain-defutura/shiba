import React from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'

import { useTransactionModal } from 'context/TransactionContext'
import { SHIPMENT_CONTRACT } from 'utils/contractAddress'
import { IHaveToSend } from 'constants/types'
import shipmentABI from 'utils/abi/shipmentABI.json'

interface IHaveToSendProps {
  data: IHaveToSend
  setSelectedShipment: React.Dispatch<
    React.SetStateAction<IHaveToSend | undefined>
  >
}

const HaveToSendCard: React.FC<IHaveToSendProps> = ({
  data,
  setSelectedShipment,
}) => {
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const { setTransaction } = useTransactionModal()

  const handleCancelOrder = async () => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        SHIPMENT_CONTRACT,
        shipmentABI,
        signerData,
      )
      const tx = await contract.cancelBuyOrder(data.id)
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
          <p>{data.itemId.itemName}</p>
        </td>
        <td>
          <p>{data.quantity}</p>
        </td>
        <td>
          <button onClick={() => setSelectedShipment(data)}>
            Start Shipment
          </button>
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
