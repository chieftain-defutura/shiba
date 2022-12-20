import React, { useRef, useState } from 'react'
import { IUserDigitalItem } from '../../../constants/types'
import PlayBtn from '../../../assets/icon/play-btn.svg'
import './item.scss'
import { getDecryptedData } from '../../../utils/formatters'

interface IMoviesCard {
  fullproduct: string
  category: string
}
export const MoviesCard: React.FC<IMoviesCard> = ({
  fullproduct,
  category,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="movies-card">
      <div className="movies-card-top">
        <video ref={videoRef} src={getDecryptedData(fullproduct)}></video>
      </div>
      <div className="icon" onClick={() => videoRef.current!.play()}>
        <img src={PlayBtn} alt="card" />
      </div>
      <div className="details">
        <h3>Name: {category}</h3>
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
        'Loading...'
      ) : error ? (
        'something went wrong'
      ) : !data?.digitalItems.length ? (
        'No Items Here'
      ) : (
        <div className="item-card-container">
          {data?.digitalItems.map((item, i) => {
            return (
              <MoviesCard
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

export default MyMovies
