import React, { useRef } from 'react'
import { IUserDigitalItem } from '../../../constants/types'
import PlayBtn from '../../../assets/icon/play-btn.svg'
import { getDecryptedData } from '../../../utils/formatters'
import Loading from '../../../components/Loading/Loading'

export const CoursesCard: React.FC<IUserDigitalItem> = ({
  fullproduct,
  category,
  shopDetails,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="movies-card">
      <div className="movies-card-top">
        <video
          ref={videoRef}
          src={getDecryptedData(fullproduct, [shopDetails.id])}
        ></video>
      </div>
      <div className="icon" onClick={() => videoRef.current?.play()}>
        <img src={PlayBtn} alt="card" />
      </div>
      <div className="details">
        <h3>Name: {category}</h3>
      </div>
    </div>
  )
}

interface IMyCourses {
  fetching: boolean
  error?: any | undefined
  data?: { digitalItems: IUserDigitalItem[] } | undefined
}

const MyCourses: React.FC<IMyCourses> = ({ fetching, error, data }) => {
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
        <div className="item-card-container">
          {data?.digitalItems.map((item, i) => {
            return <CoursesCard key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

export default MyCourses
