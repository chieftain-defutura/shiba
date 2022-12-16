import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'
import DigitalItem from '../DigitalItem'

const API_URL = 'https://api.thegraph.com/subgraphs/name/arunram2000/dapplink'

const GoodsMaretPlace: React.FC = () => {
  const { address } = useAccount()
  const [physicalItems, setPhysicalItems] = useState<any[]>([])
  const [digitalItems, setDigitalItems] = useState<any[]>([])

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        API_URL,
        {
          query: `
          query{
            digitalItems(where:{status:"ACTIVE"}){
              id
              shopId
              price
              erc20Token {
                id
                symbol
                decimals
              }
              subcategory
              category
            }
            physicalItems{
              id
              shopId
              price
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
      console.log(data.data)
      setPhysicalItems(data.data.physicalItems)
      setDigitalItems(data.data.digitalItems)
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])
  return (
    <div className="marketplace-container-right-content">
      {!physicalItems.length && !digitalItems.length ? (
        <div>No Result</div>
      ) : (
        physicalItems.map((f, idx) => (
          <div key={idx}>
            <DigitalItem {...f} />
          </div>
        ))
      )}
      {digitalItems.map((f, idx) => (
        <div key={idx}>
          <DigitalItem {...f} />
        </div>
      ))}
    </div>
  )
}

export default GoodsMaretPlace
