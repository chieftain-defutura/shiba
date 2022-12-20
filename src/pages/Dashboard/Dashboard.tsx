import React from 'react'
import { Link } from 'react-router-dom'

import HeaderNav from '../../components/HeaderNav/HeaderNav'
import Navigation from '../../components/Navigation/Navigation'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { DemoDashboard } from './Dashboards'
import './Dashboard.css'

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="dashBoard-container">
        <div className="dashBoard-container-right">
          <SideBar />
        </div>
        <div className="dashBoard-container-right">
          {DemoDashboard.map((f, index) => {
            return (
              <div key={index} className="dashBoard-content">
                <div className="border">
                  <img src={f.image.src} alt={f.image.alt} />
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>

                  <Link to={`/${f.link}`}>
                    <button style={{ padding: '15px' }}>Open</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default Dashboard
