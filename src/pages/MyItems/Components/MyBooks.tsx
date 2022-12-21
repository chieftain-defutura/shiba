import React from 'react'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'
import videoBg from '../../../assets/img/video-bg.png'
import dapplingPdf from '../../../assets/pdf/dappling .pdf'
import Book from '../../../assets/icon/Book-mark.svg'
interface IMyBook {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}

const MyBooks: React.FC<IMyBook> = ({ fetching, error, data }) => {
  return (
    <div className="item-container">
      {fetching ? (
        'Loading...'
      ) : error ? (
        'something went wrong'
      ) : (
        // ) : !data?.digitalItems.length ? (
        //   'No Items Here'
        // ) : (
        <div className="music-item-card-container">
          <div className="music-card">
            <div className="icon">
              <a href={dapplingPdf} target="_blank" rel="noreferrer">
                <img src={Book} alt="card" />
              </a>
            </div>
            <div className="details">
              <h3>Name:</h3>
            </div>
          </div>

          {/* {data?.digitalItems.map((item, i) => {
            return <DigitalItemCategoryCard key={i} {...item} />
          })} */}
        </div>
      )}
    </div>
  )
}

export default MyBooks
