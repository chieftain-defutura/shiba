import React from "react"
import Footer from "../../components/Footer/Footer"
import HeaderNav from "../../components/HeaderNav/HeaderNav"
import Navigation from "../../components/Navigation/Navigation"
import SideBar from "../../components/SideBar/SideBar"
import "./Dashboard.css"
import { DemoDashboard } from "./Dashboards"
import { Link } from "react-router-dom"

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
                    <button>Open</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
