import React, { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'
import { SUB_GRAPH_API_URL } from '../../constants/api'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import './AwaitingDeliveryPage.css'
import HomeLayout from '../../Layout/HomeLayout'
import AwaitingDeliveryCard from '../../components/AwaitingDeliveryCard'

const AwaitingDeliveryPage: React.FC = () => {
  const [isReceived, setIsReceived] = useState(false)
  const [isComplain, setIsComplain] = useState(false)

  const { address } = useAccount()
  const [shipment, setShipment] = useState<any[]>([])
  const handleAwaitingDelivery = useCallback(async () => {
    try {
      const { data } = await axios.post(
        SUB_GRAPH_API_URL,
        {
          query: `
          query{
            shipments(where: {owner:"${address}"}){
              id
              owner
              status
              quantity
            }
          }
        `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(data.data)
      setShipment(data.data.shipments)
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleAwaitingDelivery()
  }, [handleAwaitingDelivery])

  const handleBackBtn = () => {
    if (isReceived) return setIsReceived(false)
    if (isComplain) return setIsComplain(false)
  }

  return (
    <div>
      <HomeLayout>
        <div className="awaiting-delivery-container">
          <div className="awaiting-delivery-container-right">
            <div className="content-box">
              <div className="awaiting-delivery-header">
                <img src={ArrowIcon} alt="" onClick={handleBackBtn} />
                <h2 className="heading">Awaiting Delivery</h2>
              </div>
              {!shipment.length ? (
                <div>No Result</div>
              ) : (
                shipment.map((f, idx) => (
                  <div key={idx}>
                    <AwaitingDeliveryCard {...f} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default AwaitingDeliveryPage
