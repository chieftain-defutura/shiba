import React from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'
<<<<<<< HEAD
import Navigation from '../../components/Navigation/Navigation'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard'
import { IDigitalItemsCategory } from '../../constants/contract'
import { IMyItems } from '../../constants/types'
import { myItems } from '../../constants/query'
=======

import './ItemsPage.scss'
import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard.tsx'
import { IDigitalItemsCategory } from '../../constants/contract'
import { userDigitalItemsPageQuery } from '../../constants/query'
import { IUserDigitalItem } from '../../constants/types'
import HomeLayout from '../../Layout/HomeLayout'
>>>>>>> 17c832dfaf351994fd7264eafac2d661a60579aa

const MyItems: React.FC<{ digitalItem: IDigitalItemsCategory }> = ({
  digitalItem,
}) => {
  const { address } = useAccount()
<<<<<<< HEAD

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
=======
  const [result] = useQuery<{ digitalItems: IUserDigitalItem[] }>({
    query: userDigitalItemsPageQuery,
    variables: { owner: address?.toLowerCase(), category: digitalItem.name },
    pause: !address,
  })

  const { data, error, fetching } = result

  return (
    <HomeLayout>
      <div className="items-container">
        {fetching ? (
          'Loading...'
        ) : error ? (
          'something went wrong'
        ) : !data?.digitalItems.length ? (
          'No Items Here'
        ) : (
          <div className="items-card-container">
            {data?.digitalItems.map((item, i) => {
              return <DigitalItemCategoryCard key={i} {...item} />
            })}
          </div>
        )}
>>>>>>> 17c832dfaf351994fd7264eafac2d661a60579aa
      </div>
    </HomeLayout>
  )
}

export default MyItems
