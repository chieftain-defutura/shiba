import React from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'

import './ItemsPage.scss'
import DigitalItemCategoryCard from '../../components/DigitalItemCategoryCard.tsx'
import { IDigitalItemsCategory } from '../../constants/contract'
import { userDigitalItemsPageQuery } from '../../constants/query'
import { IUserDigitalItem } from '../../constants/types'
import HomeLayout from '../../Layout/HomeLayout'

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
      </div>
    </HomeLayout>
  )
}

export default MyItems
