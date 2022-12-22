import React, { useRef } from 'react'
import { IUserDigitalItem } from '../../../constants/types'
import PlayBtn from '../../../assets/icon/play-btn.svg'
import { getDecryptedData } from '../../../utils/formatters'
import Loading from '../../../components/Loading/Loading'

interface ICoursesCard {
  fullproduct: string
  category: string
}
export const CoursesCard: React.FC<ICoursesCard> = ({
  fullproduct,
  category,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="movies-card">
      <div className="movies-card-top">
        <video ref={videoRef} src={getDecryptedData(fullproduct)}></video>
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
        <Loading />
      ) : error ? (
        <div style={{ color: '#fff', textAlign: 'center' }}>
          something went wrong
        </div>
      ) : !data?.digitalItems.length ? (
        <div style={{ color: '#fff', textAlign: 'center' }}>No Items Here</div>
      ) : (
        <div className="item-card-container">
          {data?.digitalItems.map((item, i) => {
            return (
              <CoursesCard
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

export default MyCourses
