import React, { useRef, useState } from 'react'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'
import videoBg from '../../../assets/img/video-bg.png'
import PlayBtn from '../../../assets/icon/play-btn.svg'
import './item.scss'

interface IMyMovies {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMovies: React.FC<IMyMovies> = ({ fetching, error, data }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        <div className="item-card-container">
          <div className="movies-card">
            <div className="movies-card-top">
              <video
                ref={videoRef}
                src="https://cdn.coverr.co/videos/coverr-rear-view-of-a-porsche-911-turbo-s-9150/1080p.mp4"
              ></video>
            </div>
            <div className="icon" onClick={() => videoRef.current!.play()}>
              <img src={PlayBtn} alt="card" />
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

export default MyMovies
