import React, { useState } from 'react'
import { useQuery } from 'urql'
import { useAccount } from 'wagmi'

import { IHaveToSend } from 'constants/types'
import { haveToSendQuery } from 'constants/query'
import ArrowIcon from 'assets/img/left-arrow-icon-2.png'
import HomeLayout from 'Layout/HomeLayout'
import HaveToSendCard from 'components/HaveToSendCard'
import Loading from 'components/Loading/Loading'
import ShipmentDetails from './ShipmentDetails'
import './HaveToSend.css'

const HaveToSend: React.FC = () => {
  const { address } = useAccount()
  const [selectedShipment, setSelectedShipment] = useState<IHaveToSend>()

  const [result] = useQuery<{
    shipments: IHaveToSend[]
  }>({
    query: haveToSendQuery,
    variables: {
      owner: address?.toLowerCase(),
    },
    pause: !address,
  })
  const { data, fetching } = result

  return (
    <div>
      <HomeLayout>
        {!selectedShipment ? (
          <div className="shipping-queue-container-right">
            <div className="content-box">
              <div className="shipping-queue-header">
                <img src={ArrowIcon} alt="" />
                <h2 className="heading">Shipping Queue</h2>
              </div>
              {fetching ? (
                <div className="loading">
                  <Loading />
                </div>
              ) : (
                <table cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!data?.shipments.length ? (
                      <tr>
                        <td colSpan={2} className="error-msg">
                          <p>No Result</p>
                        </td>
                      </tr>
                    ) : (
                      data.shipments.map((f, idx) => (
                        <HaveToSendCard
                          key={idx}
                          data={f}
                          setSelectedShipment={setSelectedShipment}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <ShipmentDetails
            setSelectedShipment={setSelectedShipment}
            {...selectedShipment}
          />
        )}
      </HomeLayout>
    </div>
  )
}

export default HaveToSend
