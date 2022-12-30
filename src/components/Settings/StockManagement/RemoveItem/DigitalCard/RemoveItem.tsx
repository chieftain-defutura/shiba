import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'

import Card from './RemoveItemCard'
import { removeDigitalItemQuery } from 'constants/query'
import { IRemoveDigitalItem } from 'constants/types'
import Loading from 'components/Loading'

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
        <div className="loading">
          <Loading />
        </div>
      ) : error ? (
        <div className="error-msg">
          <p>something went wrong</p>
        </div>
      ) : !data?.digitalItems.length ? (
        <div className="error-msg">
          <p>No result</p>
        </div>
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
