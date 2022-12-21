import React, { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { SUB_GRAPH_API_URL } from '../../constants/api'
import Card from './PhysicalCard'

const PhysicalRemoveItem: React.FC = () => {
  const { id } = useParams()
  const { address } = useAccount()
  const [removePhysicalItems, setRemovePhysicalItems] = useState<any[]>([])

  const handleRemovePhysicalItems = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        SUB_GRAPH_API_URL,
        {
          query: `
          query{
            physicalItems(where:{ status: ACTIVE,shopDetails: "${id}"}){
              id
              quantity
              shopDetails{
                id
              }
              price
              owner
              erc20Token {
                id
                symbol
                decimals
              }
              subcategory
              category
            }
          }
            `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(data)

      setRemovePhysicalItems(data.data.physicalItems)
    } catch (error) {
      console.log(error)
    }
  }, [address, id])

  useEffect(() => {
    handleRemovePhysicalItems()
  }, [handleRemovePhysicalItems])

  return (
    <div className="stock-management-remove-item-container">
      <div className="remove-item-cards-container">
        {removePhysicalItems.map((f, idx) => (
          <div key={idx}>
            <Card {...f} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhysicalRemoveItem
