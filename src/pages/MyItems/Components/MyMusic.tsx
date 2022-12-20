import React from 'react'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'

interface IMyMusic {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMusic: React.FC<IMyMusic> = ({ fetching, error, data }) => {
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

export default MyMusic
