import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Connector } from '../Connect'
import Modal from '../Model'
import logo from '../../assets/img/logo.png'
import searchIcon from '../../assets/img/search-icon.png'
import './Navigation.css'
import { Link } from 'react-router-dom'
// import Link from "next/link";

const Navigation = () => {
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
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shops</Link>
              </li>
              <li>
                <Link to="/websites">Websites</Link>
              </li>
              <li>
                <Link to="/domain-names">Domain Names</Link>
              </li>
              <li>
                <Link to="/full-on-blockChain-nft">Full On Blockchain NFT</Link>
              </li>
              <li>
                <Link to="/charities">Charities</Link>
              </li>
              <li>
                <Link to="/marketplace">MarketPlace</Link>
              </li>
              <li>
                <Link to="/action">Auction</Link>
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
