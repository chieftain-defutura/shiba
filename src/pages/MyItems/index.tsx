import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { SUB_GRAPH_API_URL } from '../../constants/api'
import Navigation from '../../components/Navigation/Navigation'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard.tsx'
import { IDigitalItemsCategory } from '../../constants/contract'

const MyItems: React.FC<{ digitalItem: IDigitalItemsCategory }> = ({
  digitalItem,
}) => {
  const { address } = useAccount()
  const [card, setCard] = useState<any[]>([])

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        SUB_GRAPH_API_URL,
        {
          query: `query{
    digitalItems(where:{status:PURCHASED, category:"${digitalItem.name}"}){
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
    }`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(data.data.digitalItems)
      setCard(data.data.digitalItems)
    } catch (error) {
      console.log(error)
    }
  }, [address, digitalItem.name])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="website-container">
        <div className="website-container-right">
          <SideBar />
        </div>
        <div className="website-card-container">
          {card.map((f, i) => {
            return <DigitalItemCategoryCard key={i} />
          })}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default MyItems
