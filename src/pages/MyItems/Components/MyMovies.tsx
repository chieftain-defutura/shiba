import React from 'react'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'

interface IMyMovies {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMovies: React.FC<IMyMovies> = ({ fetching, error, data }) => {
  console.log(data)
  return (
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
  )
}

export default MyMovies
