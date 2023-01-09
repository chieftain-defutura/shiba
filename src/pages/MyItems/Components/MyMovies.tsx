import React, { useRef } from 'react'

import { IUserDigitalItem } from 'constants/types'
import { getDecryptedData } from 'utils/formatters'
import Loading from 'components/Loading'
import ReactPlayer from 'react-player'
import './item.scss'

export const MoviesCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
  shopDetails,
  itemName,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const video = getDecryptedData(fullproduct, [shopDetails.id])

  const res = video.includes('youtube.com')
  console.log(res)

  return (
    <div className="movies-card">
      <div className="movies-card-top">
        {!res ? (
          <video ref={videoRef} controls playsInline src={video}></video>
        ) : (
          <ReactPlayer url={video} width={300} height={200} />
        )}
      </div>

      {/* <div className="icon" onClick={() => videoRef.current?.play()}>
        <img src={PlayBtn} alt="card" />
      </div> */}
      <div className="details">
        <h3>Name: {itemName}</h3>
      </div>
    </div>
  )
}

interface IMyMovies {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMovies: React.FC<IMyMovies> = ({ fetching, error, data }) => {
  return (
    <div className="item-container">
      {fetching ? (
        <div className="loading">
          <Loading />
        </div>
      ) : error ? (
        <div className="error-msg">
          <p> something went wrong</p>
        </div>
      ) : !data?.digitalItems.length ? (
        <div className="error-msg">
          <p>No Items Here</p>
        </div>
      ) : (
        <div className="item-card-container">
          {data?.digitalItems.map((item, i) => {
            return <MoviesCard key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

export default MyMovies
