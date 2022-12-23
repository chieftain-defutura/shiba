import React from 'react'
import { ethers } from 'ethers'
import { useAccount, useSigner } from 'wagmi'

import { IHaveToSend } from '../../constants/types'
import { getDecryptedData } from '../../utils/formatters'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import { useTransactionModal } from '../../context/TransactionContext'
import { SHIPMENT_CONTRACT } from '../../utils/contractAddress'
import shipmentABI from '../../utils/abi/shipmentABI.json'

import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import './ShipmentDetails.css'

interface IShippingDetailsPage extends IHaveToSend {
  setSelectedShipment: React.Dispatch<
    React.SetStateAction<IHaveToSend | undefined>
  >
}

const ShippingDetailsPage: React.FC<IShippingDetailsPage> = ({
  deliveryHash,
  setSelectedShipment,
  id,
  itemId,
}) => {
  const { isLoading, data } = useGetIpfsDataQuery({
    hash: getDecryptedData(deliveryHash, [itemId]),
  })
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const { setTransaction } = useTransactionModal()

  const handleStartShipment = async () => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        SHIPMENT_CONTRACT,
        shipmentABI,
        signerData,
      )
      const tx = await contract.startShipment(id)
      await tx.wait()
      setSelectedShipment(undefined)
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="shipping-details-container">
      <div className="shipping-details-container-right">
        <div className="content-box">
          <div className="shipping-details-header">
            <img
              src={ArrowIcon}
              alt=""
              onClick={() => setSelectedShipment(undefined)}
            />
            <h2 className="heading">Shipment Address and Details</h2>
          </div>
          <div className="shipping-form-container">
            <div className="shipping-form">
              <h2 className="title">Shipping form</h2>
              {isLoading ? (
                <h3>Fetching User Shipment Details...</h3>
              ) : (
                <div className="form-container">
                  <div className="left">
                    <p>Name:</p>
                    <p>Phone:</p>
                    <p>Address:</p>
                    <p>City:</p>
                    <p>State:</p>
                    <p>Postal zip code:</p>
                    <p>Country:</p>
                  </div>
                  <div className="right">
                    <input readOnly value={data?.name} />
                    <input readOnly value={data?.phone} />
                    <input readOnly value={data?.address} />
                    <input readOnly value={data?.city} />
                    <input readOnly value={data?.state} />
                    <input readOnly value={data?.zipCode} />
                    <input readOnly value={data?.country} />
                  </div>
                </div>
              )}
            </div>
            <button className="sent-btn" onClick={() => handleStartShipment()}>
              Successfully Sent
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetailsPage
