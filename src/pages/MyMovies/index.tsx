import React from "react"
import cardImg from "../../assets/img/card-3.png"
import { Link } from "react-router-dom"
import Navigation from "../../components/Navigation/Navigation"
import HeaderNav from "../../components/HeaderNav/HeaderNav"
import SideBar from "../../components/SideBar/SideBar"
const MyMovies = () => {
  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="website-container">
        <div className="website-container-right">
          <SideBar />
        </div>
        <div className="website-container-right">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div className="website-card-container" key={idx}>
              <div className="card">
                <div className="card-top">
                  <img src={cardImg} alt="card" />
                </div>
                <div className="card-center">
                  <h3 className="title">The Holy Grail</h3>
                  <h4 className="sub-title">Pixart Motion</h4>
                </div>
                <div className="card-bottom">
                  <p>Shop Details</p>
                  <Link to="/my-movies/:id">
                    <button style={{ width: "50px" }}>Get In</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyMovies
