import React from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'

import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard.tsx'
import { IDigitalItemsCategory } from '../../constants/contract'
import { userDigitalItemsPageQuery } from '../../constants/query'
import { IUserDigitalItem } from '../../constants/types'
import HomeLayout from '../../Layout/HomeLayout'
import './ItemsPage.scss'
import Loading from '../../components/Loading/Loading'

const MyItems: React.FC<{ digitalItem: IDigitalItemsCategory }> = ({
  digitalItem,
}) => {
  const { address } = useAccount()
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
          <div>
            <Loading />
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#fff' }}>
            something went wrong
          </div>
        ) : !data?.digitalItems.length ? (
          <div style={{ textAlign: 'center', color: '#fff' }}>
            No Items Here
          </div>
        ) : (
          <div className="items-card-container">
            {data?.digitalItems.map((item, i) => {
              return <DigitalItemCategoryCard key={i} {...item} />
            })}
          </div>
        )}
      </div>
    </HomeLayout>
  )
}

export default MyItems
