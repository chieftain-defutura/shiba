import React from 'react'
import { useQuery } from 'urql'
import { useNavigate } from 'react-router-dom'

import './RecentlyListed.css'
import SliderCard from '../SliderCard/SliderCard'
import { IListedItems } from 'constants/types'
import { recentlyListedQuery } from 'constants/query'
import Loading from '../Loading/Loading'

const RecentlyListed: React.FC = () => {
  const navigate = useNavigate()
  const [result] = useQuery<{ physicalItems: IListedItems[] }>({
    query: recentlyListedQuery,
    variables: { category: ['accessories', 'clothing'] },
  })
  const { fetching, data } = result

  return (
    <div className="recently-listed">
      <h2 className="section-title">Recently listed Goods</h2>
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
        <button onClick={() => navigate('/marketplace')}>see more</button>
      </div>
    </div>
  )
}

export default RecentlyListed
