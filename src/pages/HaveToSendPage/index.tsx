import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { SUB_GRAPH_API_URL } from '../../constants/api'
import './HaveToSend.css'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import HomeLayout from '../../Layout/HomeLayout'
import HaveToSendCard from '../../components/HaveToSendCard'

const HaveToSend = () => {
  const { address } = useAccount()
  const [shipment, setShipment] = useState<any[]>([])
  const handleHaveToSend = useCallback(async () => {
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
    handleHaveToSend()
  }, [handleHaveToSend])

  return (
    <div>
      <HomeLayout>
        <div className="shipping-queue-container-right">
          <div className="content-box">
            <div className="shipping-queue-header">
              <img src={ArrowIcon} alt="" />
              <h2 className="heading">Shipping Queue</h2>
            </div>
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <td>Product Name </td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                {!shipment.length ? (
                  <div>No Result</div>
                ) : (
                  shipment.map((f, idx) => (
                    <div key={idx}>
                      <HaveToSendCard {...f} />
                    </div>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default HaveToSend
