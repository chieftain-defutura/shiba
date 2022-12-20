import React from 'react'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'
interface IMyBook {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}

const MyBooks: React.FC<IMyBook> = ({ fetching, error, data }) => {
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

export default MyBooks
