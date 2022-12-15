import React, { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { SUB_GRAPH_API_URL } from '../../constants/api'
import Card from './card'

const RemoveItem: React.FC = () => {
  const { id } = useParams()
  const { address } = useAccount()
  const [mintData, setMintData] = useState<any[]>([])

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        SUB_GRAPH_API_URL,
        {
          query: `
       query{
  digitalItems(where:{status:"ACTIVE", shopId:${id}}){
    id
    shopId
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
      setMintData(data.data.digitalItems)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])

  return (
    <div className="stock-management-remove-item-container">
      <div className="remove-item-cards-container">
        {mintData.map((f, idx) => (
          <div key={idx}>
            <Card {...f} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RemoveItem
