import React from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from 'urql'

import { IDigitalItemsCategory } from 'constants/contract'
import { userDigitalItemsPageQuery } from 'constants/query'
import { IUserDigitalItem } from 'constants/types'
import HomeLayout from 'Layout/HomeLayout'
import MyBooks from './Components/MyBooks'
import MyMovies from './Components/MyMovies'
import MyMusic from './Components/MyMusic'
import MyCourses from './Components/MyCourses'

const MyItems: React.FC<{ digitalItem: IDigitalItemsCategory }> = ({
  digitalItem,
}) => {
  const { address } = useAccount()
  const [result] = useQuery<{ digitalItems: IUserDigitalItem[] }>({
    query: userDigitalItemsPageQuery,
    variables: { owner: [address?.toLowerCase()], category: digitalItem.name },
    pause: !address,
  })

  const { data, error, fetching } = result

  return (
    <HomeLayout>
      {digitalItem.path === 'my-movies' && (
        <MyMovies fetching={fetching} error={error} data={data} />
      )}
      {digitalItem.path === 'my-books' && (
        <MyBooks fetching={fetching} error={error} data={data} />
      )}
      {digitalItem.path === 'my-music' && (
        <MyMusic fetching={fetching} error={error} data={data} />
      )}
      {digitalItem.path === 'my-courses' && (
        <MyCourses fetching={fetching} error={error} data={data} />
      )}
    </HomeLayout>
  )
}

export default MyItems
