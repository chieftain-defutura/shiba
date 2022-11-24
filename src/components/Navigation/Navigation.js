import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Connector } from "../Connect";
import LayoutModal from "../Model";
import logo from "../../assets/img/logo.png";
import searchIcon from "../../assets/img/search-icon.png";
import "./Navigation.css";

const Navigation = () => {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  return (
    <div className="navigation-container">
      <div className="container">
        <div className="container-left">
          <div className="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <nav>
            <ul>
              <li>Home</li>
              <li>Shops</li>
              <li>Websites</li>
              <li>Domain Names</li>
              <li>Full On Blockchain NFT</li>
              <li>Charities</li>
              <li>MarketPlace</li>
              <li>Auction</li>
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
  );
};

export default Navigation;
