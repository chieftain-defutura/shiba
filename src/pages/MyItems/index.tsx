import React from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'
import Navigation from '../../components/Navigation/Navigation'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard'
import { IDigitalItemsCategory } from '../../constants/contract'
import { IMyItems } from '../../constants/types'
import { myItems } from '../../constants/query'

const MyItems: React.FC<{ digitalItem: IDigitalItemsCategory }> = ({
  digitalItem,
}) => {
  const { address } = useAccount()

  const [result, reexecuteQuery] = useQuery<{
    shipments: IMyItems[]
  }>({
    query: myItems,
    variables: {
      category: digitalItem,
    },
    pause: !address,
  })
  const { data, fetching, error } = result
  console.log(data)

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="website-container">
        <div className="website-container-right">
          <SideBar />
        </div>
        <div className="website-card-container">
          {data?.shipments.map((f, i) => {
            return <DigitalItemCategoryCard key={i} />
          })}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default MyItems
