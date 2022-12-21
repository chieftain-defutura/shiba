import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link, NavLink } from 'react-router-dom'

import { Connector } from '../Connect'
import Modal from '../Model'
import logo from '../../assets/img/logo.png'
import searchIcon from '../../assets/img/search-icon.png'
import './Navigation.css'

const Navigation: React.FC = () => {
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  return (
    <div className="navigation-container">
      <div className="container">
        <div className="container-left">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shops</NavLink>
              </li>
              <li>
                <NavLink to="/websites">Websites</NavLink>
              </li>
              <li>
                <NavLink to="/domain-names">Domain Names</NavLink>
              </li>
              <li>
                <NavLink to="/full-on-blockChain-nft">
                  Full On Blockchain NFT
                </NavLink>
              </li>
              <li>
                <NavLink to="/charities">Charities</NavLink>
              </li>
              <li>
                <NavLink to="/marketplace">MarketPlace</NavLink>
              </li>
              <li>
                <NavLink to="/auction">Auction</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container-right">
          <div className="search-box-container">
            <img src={searchIcon} alt="search icon" />
            <input placeholder="Search by Domain" />
          </div>

          {!address ? (
            <>
              <button className="login-btn" onClick={() => setOpen(true)}>
                Login
              </button>
              <Modal isOpen={open} handleClose={() => setOpen(false)}>
                <Connector />
              </Modal>
            </>
          ) : (
            <div className="address">
              {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
