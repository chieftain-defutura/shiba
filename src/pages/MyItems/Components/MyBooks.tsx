import React, { useRef } from 'react'

import { IUserDigitalItem } from 'constants/types'
import Book from 'assets/icon/Book-mark.svg'
import { getDecryptedData } from 'utils/formatters'
import Loading from 'components/Loading'

export const BookCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
  shopDetails,
  itemName,
}) => {
  const bookRef = useRef<HTMLAudioElement>(null)

  return (
    <div className="music-card">
      <div className="icon" onClick={() => bookRef.current?.play()}>
        <a
          href={getDecryptedData(fullproduct, [shopDetails.id])}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={Book} alt="card" />
        </a>
      </div>

      <div className="details">
        <h3>Name: {itemName}</h3>
      </div>
    </div>
  )
}

interface IMyBook {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}

const MyBooks: React.FC<IMyBook> = ({ fetching, error, data }) => {
  return (
    <div className="item-container">
      {fetching ? (
        <div className="loading">
          <Loading />
        </div>
      ) : error ? (
        <div className="error-msg">
          <p>something went wrong</p>
        </div>
      ) : !data?.digitalItems.length ? (
        <div className="error-msg">
          <p>No Items Here</p>
        </div>
      ) : (
        <div className="music-item-card-container">
          {data?.digitalItems.map((item, i) => {
            return <BookCard key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

export default MyBooks
