import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import './AwaitingDeliveryPage.css'
import HomeLayout from '../../Layout/HomeLayout'
import AwaitingDeliveryCard from '../../components/AwaitingDeliverCard'
import { IAwaitingDelivery } from '../../constants/types'
import { awaitingDelivery } from '../../constants/query'

const AwaitingDeliveryPage: React.FC = () => {
  const { address } = useAccount()
  const [isReceived, setIsReceived] = useState(false)
  const [isComplain, setIsComplain] = useState(false)

  const [result] = useQuery<{
    shipments: IAwaitingDelivery[]
  }>({
    query: awaitingDelivery,
    variables: {
      owner: address,
    },
    pause: !address,
  })
  const { data } = result
  console.log(data)

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
              {!data?.shipments.length ? (
                <div>No Result</div>
              ) : (
                data?.shipments.map((f, idx) => (
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
