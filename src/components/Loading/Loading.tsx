import React from 'react'
import './Loading.scss'

const Loading: React.FC = () => {
  return (
    <div className="center">
      <div className="ring"></div>
      <span>loading...</span>
    </div>
  )
}

export default Loading
