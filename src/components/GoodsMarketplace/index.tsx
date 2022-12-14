import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import { useGetUserNftsQuery } from '../../store/slices/moralisApiSlice'
import DigitalItem from '../DigitalItem'

const API_URL = 'https://api.thegraph.com/subgraphs/name/arunram2000/dapplink'
const GoodsMaretPlace = () => {
  const { address } = useAccount()
  const [mintData, setMintData] = useState<any[]>([])

  const { isLoading, isError } = useGetUserNftsQuery({
    erc721Address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    address: address ?? '',
  })

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
      setMintData(data.data.digitalItems)
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])
  return (
    <div className="marketplace-container-right-content">
      {isLoading ? (
        <div>Loading</div>
      ) : isError ? (
        <div>Error</div>
      ) : !mintData.length ? (
        <div>No Result</div>
      ) : (
        mintData.map((f, idx) => (
          <div key={idx}>
            <DigitalItem {...f} />
          </div>
        ))
      )}
    </div>
  )
}

export default GoodsMaretPlace
