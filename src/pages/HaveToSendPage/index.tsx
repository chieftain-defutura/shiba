import React from 'react'
import { useQuery } from 'urql'
import { useAccount } from 'wagmi'
import { IAwaitingDelivery } from '../../constants/types'
import { awaitingDelivery } from '../../constants/query'
import './HaveToSend.css'
import ArrowIcon from '../../assets/img/left-arrow-icon-2.png'
import HomeLayout from '../../Layout/HomeLayout'
import HaveToSendCard from '../../components/HaveToSendCard'

const HaveToSend = () => {
  const { address } = useAccount()

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
                {!data?.shipments.length ? (
                  <div>No Result</div>
                ) : (
                  data.shipments.map((f, idx) => (
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
