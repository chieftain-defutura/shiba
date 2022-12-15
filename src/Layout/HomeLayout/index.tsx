import React from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import Navigation from '../../components/Navigation/Navigation'
import SideBar from '../../components/SideBar/SideBar'
import './HomeLayout.scss'

interface IHomeLayout {
  children?: React.ReactNode
}

const HomeLayout: React.FC<IHomeLayout> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="home-layout-container">
        <HeaderNav />

        <div className="home-layout-sideBar">
          <SideBar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
