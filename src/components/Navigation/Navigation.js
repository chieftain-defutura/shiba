import React, { useState } from "react"
import { useAccount } from "wagmi"
import { Connector } from "../Connect"
import LayoutModal from "../Model"
import logo from "../../assets/img/logo.png"
import searchIcon from "../../assets/img/search-icon.png"
import "./Navigation.css"
import { Link } from "react-router-dom"
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
                <Link to="">Shops</Link>
              </li>
              <li>
                <Link to="">Websites</Link>
              </li>
              <li>
                <Link to="">Domain Names</Link>
              </li>
              <li>
                <Link to="">Full On Blockchain NFT</Link>
              </li>
              <li>
                <Link to="">Charities</Link>
              </li>
              <li>
                <Link to="">MarketPlace</Link>
              </li>
              <li>
                <Link to="">Auction</Link>
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
              {open && (
                <LayoutModal onClose={() => setOpen(false)}>
                  <Connector />
                </LayoutModal>
              )}
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
