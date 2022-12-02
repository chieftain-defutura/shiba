import React from "react"
import "./HeaderNav.css"

const HeaderNav = () => {
  return (
    <div className="header-nav-container">
      <div className="header-nav">
        <ul>
          <li>
            <button>My Items: 105</button>
          </li>
          <li>SHI: 9451</li>
          <li>LEASH: 52</li>
          <li>SHIB: 18520003258</li>
          <li>BONE: 547</li>
          <li>PAW: 11240</li>
          <li>
            <button>Send Crypto</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderNav
