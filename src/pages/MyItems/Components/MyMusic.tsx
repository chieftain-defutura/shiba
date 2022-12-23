import React, { useRef } from 'react'
import Music from '../../../assets/icon/Music.svg'
import Loading from '../../../components/Loading/Loading'
import { IUserDigitalItem } from '../../../constants/types'
import { getDecryptedData } from '../../../utils/formatters'

export const CoursesCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
  category,
  shopDetails,
}) => {
  const musicRef = useRef<HTMLAudioElement>(null)

  return (
    <div className="music-card">
      <div className="music-card-top">
        <audio
          ref={musicRef}
          src={getDecryptedData(fullproduct, [shopDetails.id])}
        ></audio>
      </div>
      <div className="icon" onClick={() => musicRef.current?.play()}>
        <img src={Music} alt="card" />
      </div>
      <div className="details">
        <h3>Name: {category}</h3>
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
            return <CoursesCard key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

export default MyMusic
