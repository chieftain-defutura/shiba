import React, { useRef } from 'react'
import { IUserDigitalItem } from '../../../constants/types'
import Book from '../../../assets/icon/Book-mark.svg'
import { getDecryptedData } from '../../../utils/formatters'
import Loading from '../../../components/Loading/Loading'

interface IBookCard {
  fullproduct: string
  category: string
}
export const BookCard: React.FC<IBookCard> = ({ fullproduct, category }) => {
  const bookRef = useRef<HTMLAudioElement>(null)

  return (
    <div className="music-card">
      <div className="icon" onClick={() => bookRef.current?.play()}>
        <a
          href={getDecryptedData(fullproduct)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Book} alt="card" />
        </a>
      </div>
      <div className="icon">
        <img src={Book} alt="card" />
      </div>
      <div className="details">
        <h3>Name: {category}</h3>
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
        <Loading />
      ) : error ? (
        <div style={{ color: '#fff', textAlign: 'center' }}>
          something went wrong
        </div>
      ) : !data?.digitalItems.length ? (
        <div style={{ color: '#fff', textAlign: 'center' }}>No Items Here</div>
      ) : (
        <div className="music-item-card-container">
          {data?.digitalItems.map((item, i) => {
            return (
              <BookCard
                key={i}
                fullproduct={item.fullproduct}
                category={item.category}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyBooks
