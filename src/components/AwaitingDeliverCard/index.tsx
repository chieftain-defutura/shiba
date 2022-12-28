import React from 'react'

import { IAwaitingDelivery } from '../../constants/types'
import { IAwaitingStatus } from '../../pages/AwaitingDeliveryPage/AwaitingDeliveryPage'

interface IAwaitingDeliveryCard {
  data: IAwaitingDelivery
  setState: React.Dispatch<IAwaitingStatus>
}

const AwaitingDeliveryCard: React.FC<IAwaitingDeliveryCard> = ({
  data,
  setState,
}) => {
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
          <p>{data.status === 'PREPARING' ? 'Preparing' : 'Shipped/Pending'}</p>
        </td>
        <td>
          <button
            disabled={data.status === 'PREPARING'}
            onClick={() => setState({ data, status: 'RECEIVED' })}
          >
            Received
          </button>
        </td>
        <td>
          <button
            className="complaint-btn"
            disabled={data.status === 'PREPARING'}
            onClick={() => setState({ data, status: 'COMPLAINT' })}
          >
            Complaint
          </button>
        </td>
      </tr>
      <tr className="spacer"></tr>
    </>
  )
}

export default AwaitingDeliveryCard
