import React, { useRef, useState } from 'react'

import Music from 'assets/icon/Music.svg'
import Play from 'assets/icon/Play.svg'
import Pause from 'assets/icon/Pause.svg'
import Loading from 'components/Loading/Loading'
import { IUserDigitalItem } from 'constants/types'
import { getDecryptedData } from 'utils/formatters'

export const CoursesCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
  category,
  shopDetails,
  itemName,
}) => {
  const musicRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
    const player = musicRef.current?.play()

    if (player) {
      player.catch((err) => {
        setIsPlaying(false)
        console.log(err)
        alert('invalid audio format.')
      })
    }
  }

  const handlePause = () => {
    musicRef.current?.pause()
    setIsPlaying(false)
  }

  return (
    <div className="music-card">
      <div className="music-card-top">
        <audio
          ref={musicRef}
          controls
          src={getDecryptedData(fullproduct, [shopDetails.id])}
        ></audio>
      </div>
      <div className="icon">
        <img className="abstract" src={Music} alt="card" />
        <div className="music-controls">
          {isPlaying ? (
            <img src={Pause} alt="card" onClick={handlePause} />
          ) : (
            <img src={Play} alt="card" onClick={handlePlay} />
          )}
        </div>
      </div>
      <div className="details">
        <h3>Name: {itemName}</h3>
      </div>
    </div>
  )
}

interface IMyMusic {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMusic: React.FC<IMyMusic> = ({ fetching, error, data }) => {
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
            return <CoursesCard key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

export default MyMusic
