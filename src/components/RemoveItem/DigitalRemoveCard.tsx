import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'

import Card from './Digitalcard'
import { removeDigitalItemQuery } from '../../constants/query'
import { IRemoveDigitalItem } from '../../constants/types'

const DigitalRemoveItem: React.FC = () => {
  const { id } = useParams()
  const [result] = useQuery<{ digitalItems: IRemoveDigitalItem[] }>({
    query: removeDigitalItemQuery,
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
      ) : !data?.digitalItems.length ? (
        <div>No result</div>
      ) : (
        <div className="stock-management-remove-item-container">
          <div className="remove-item-cards-container">
            {data?.digitalItems.map((f, idx) => (
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

export default DigitalRemoveItem
