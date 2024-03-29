import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'

import { awaitingDeliveryQuery } from 'constants/query'
import { IAwaitingDelivery } from 'constants/types'
import HomeLayout from 'Layout/HomeLayout'
import AwaitingDeliveryCard from 'components/AwaitingDeliverCard'
import Loading from 'components/Loading'
import Received from './components/Received'
import ArrowIcon from 'assets/img/left-arrow-icon-2.png'
import Complaint from './components/Complaint'
import './AwaitingDeliveryPage.css'

export interface IAwaitingStatus {
  data: IAwaitingDelivery
  status: 'RECEIVED' | 'COMPLAINT'
}

const AwaitingDeliveryPage: React.FC = () => {
  const { address } = useAccount()
  const [state, setState] = useState<IAwaitingStatus | null>(null)

  const [result] = useQuery<{
    shipments: IAwaitingDelivery[]
  }>({
    query: awaitingDeliveryQuery,
    variables: {
      buyer: address?.toLowerCase(),
    },
    pause: !address,
  })
  const { data, fetching } = result

  return (
    <div>
      <HomeLayout>
        <div className="awaiting-delivery-container">
          <div className="awaiting-delivery-container-right">
            <div className="content-box">
              <div className="awaiting-delivery-header">
                <img src={ArrowIcon} alt="" onClick={() => setState(null)} />
                <h2 className="heading">Awaiting Delivery</h2>
              </div>
              {!state && (
                <>
                  {fetching ? (
                    <div className="loading">
                      <Loading />
                    </div>
                  ) : !data?.shipments.length ? (
                    <div className="error-msg">
                      <p>No Result</p>
                    </div>
                  ) : (
                    <table cellSpacing={0} cellPadding={0}>
                      <thead>
                        <tr>
                          <td>Product Name </td>
                          <td>Quantity</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.shipments.map((f, idx) => (
                          <AwaitingDeliveryCard
                            key={idx}
                            data={f}
                            setState={setState}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
              {state?.status === 'RECEIVED' && (
                <Received data={state.data} setState={setState} />
              )}
              {state?.status === 'COMPLAINT' && (
                <Complaint data={state.data} setState={setState} />
              )}
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default AwaitingDeliveryPage
