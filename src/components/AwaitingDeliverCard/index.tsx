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
          <p>Shoes1</p>
        </td>
        <td>
          <p>{data.quantity}</p>
        </td>
        <td>
          <p>Shipped/Pending</p>
        </td>
        <td>
          <button onClick={() => setState({ data, status: 'RECEIVED' })}>
            Received
          </button>
        </td>
        <td>
          <button
            className="complaint-btn"
            onClick={() => setState({ data, status: 'COMPLAINT' })}
          >
            Complaint
          </button>
        </td>
      </tr>
    </>
  )
}

export default AwaitingDeliveryCard
