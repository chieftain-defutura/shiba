import React, { useRef } from 'react'
import Music from '../../../assets/icon/Music.svg'
import DigitalItemCategoryCard from '../../../components/DigitalItemCategoryCard'
import { IUserDigitalItem } from '../../../constants/types'

interface IMyMusic {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}
const MyMusic: React.FC<IMyMusic> = ({ fetching, error, data }) => {
  const musicRef = useRef<HTMLAudioElement>(null)
  return (
    <div className="item-container">
      {fetching ? (
        'Loading...'
      ) : error ? (
        'something went wrong'
      ) : (
        //   ) : !data?.digitalItems.length ? (
        //     'No Items Here'
        //   ) : (
        <div className="music-item-card-container">
          <div className="music-card">
            <audio
              ref={musicRef}
              src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/theygotcha.ogg"
            ></audio>
            <div className="icon" onClick={() => musicRef.current!.play()}>
              <img src={Music} alt="card" />
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

export default MyMusic
