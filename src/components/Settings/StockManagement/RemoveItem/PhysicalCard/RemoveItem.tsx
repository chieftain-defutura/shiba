import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'

import Card from './RemoveItemCard'
import { removePhysicalItemQuery } from 'constants/query'
import { IRemovePhysicalItem } from 'constants/types'
import Loading from 'components/Loading'

const PhysicalRemoveItem: React.FC = () => {
  const { id } = useParams()
  const [result] = useQuery<{ physicalItems: IRemovePhysicalItem[] }>({
    query: removePhysicalItemQuery,
    variables: { id: id },
    pause: !id,
  })
  const { fetching, data, error } = result

  return (
    <div>
      {fetching ? (
        <div className="loading">
          <Loading />
        </div>
      ) : error ? (
        <div className="error-msg">
          <p>something went wrong</p>
        </div>
      ) : !data?.physicalItems.length ? (
        <div className="error-msg">
          <p>No result</p>
        </div>
      ) : (
        <div className="stock-management-remove-item-container">
          <div className="remove-item-cards-container">
            {data?.physicalItems.map((f, idx) => (
              <div key={idx}>
                <Card {...f} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhysicalRemoveItem
