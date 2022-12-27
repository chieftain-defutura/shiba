import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'

import Card from './PhysicalCard'
import { removePhysicalItemQuery } from '../../constants/query'
import { IRemovePhysicalItem } from '../../constants/types'

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
        <div>Loading...</div>
      ) : error ? (
        <div>something went wrong</div>
      ) : !data?.physicalItems.length ? (
        <div>No result</div>
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
