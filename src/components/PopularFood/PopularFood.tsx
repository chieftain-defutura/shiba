import React from 'react'
import { useQuery } from 'urql'

import './PopularFood.css'
import SliderCard from '../SliderCard/SliderCard'
import { IListedItems } from '../../constants/types'
import { recentlyListedQuery } from '../../constants/query'
import Loading from '../Loading/Loading'

const PopularFood: React.FC = () => {
  const [result] = useQuery<{ physicalItems: IListedItems[] }>({
    query: recentlyListedQuery,
    variables: { category: ['food'] },
  })
  const { fetching, data } = result

  if (!data?.physicalItems.length) return null

  return (
    <div className="popular-food-container">
      <h2 className="section-title">Popular In Food</h2>
      {fetching ? (
        <Loading />
      ) : !data ? (
        <div>
          <p>No Results Found</p>
        </div>
      ) : (
        <SliderCard data={data.physicalItems} />
      )}
      <div className="btn-container">
        <button>see more</button>
      </div>
    </div>
  )
}

export default PopularFood
