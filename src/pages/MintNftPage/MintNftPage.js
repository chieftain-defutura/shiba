import React, { useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Navigation from "../../components/Navigation/Navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import "./MintNftPage.css";
import FooterBottom from "../../components/FooterBottom/FooterBottom";

const MintNftPage = () => {
  const [isDropDownClick, setIsDropDownClick] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="mint-nft-container">
        <div className="mint-nft-container-left">
          <div className="box">
            <h2 className="heading">My Items</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Movies</p>
                <p className="number">2</p>
              </div>
              <div className="content">
                <p className="name">My Music</p>
                <p className="number">5</p>
              </div>
              <div className="content">
                <p className="name">My Books</p>
                <p className="number">4</p>
              </div>
              <div className="content">
                <p className="name">My Courses</p>
                <p className="number">1</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Websites</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Websites</p>
                <p className="number">2</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Domains</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Domains</p>
                <p className="number">5</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Shops</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Digital Shop</p>
                <p className="number">1</p>
              </div>
              <div className="content">
                <p className="name">My Goods Shop</p>
                <p className="number"></p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">My Charities</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">My Charities</p>
                <p className="number">1</p>
              </div>
            </div>
          </div>
          <div className="box">
            <h2 className="heading">Delivery</h2>
            <div className="content-cont">
              <div className="content">
                <p className="name">Have to Send</p>
                <p className="number">4</p>
              </div>
              <div className="content">
                <p className="name">Awaiting Delivery</p>
                <p className="number">2</p>
              </div>
            </div>
          </div>
          <div className="select-container">
            <select>
              <option>SORT BY DATE</option>
              <option>Websites</option>
            </select>
          </div>
        </div>
        <div className="mint-nft-container-right">
          <h2 className="heading">Mint NFT</h2>
          <div className="box-1">
            <div className="box-left">
              <p className="title">Please Select NFT token type:</p>
              <div className="content-container">
                <div className="content-title">
                  <p className="title">Total LEASH cost:</p>
                  <p className="title">Total SHIB cost:</p>
                </div>
                <div className="content-input">
                  <input />
                  <input />
                </div>
              </div>
            </div>
            <div className="box-right">
              <div
                className="custom-drop-down"
                onClick={() => setIsDropDownClick(!isDropDownClick)}
              >
                {selectedOption}
                <MdKeyboardArrowDown className="arrow-icon" />
              </div>
              <div
                className={
                  isDropDownClick
                    ? "drop-down-content active"
                    : "drop-down-content"
                }
              >
                <p
                  onClick={() => {
                    setSelectedOption("Digital Goods Shop");
                    setIsDropDownClick(false);
                  }}
                >
                  Digital Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption("Physical Goods Shop");
                    setIsDropDownClick(false);
                  }}
                >
                  Physical Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption("Website");
                    setIsDropDownClick(false);
                  }}
                >
                  Website
                </p>
                <p
                  onClick={() => {
                    setSelectedOption("Charity");
                    setIsDropDownClick(false);
                  }}
                >
                  Charity
                </p>
                <p
                  onClick={() => {
                    setSelectedOption("ART NFT");
                    setIsDropDownClick(false);
                  }}
                >
                  ART NFT
                </p>
                <p
                  onClick={() => {
                    setSelectedOption("Unattached Domain Name");
                    setIsDropDownClick(false);
                  }}
                >
                  Unattached Domain Name
                </p>
              </div>
            </div>
          </div>
          <div className="box-2">
            <div className="box-left">
              <p className="title">Connect to:</p>
              <div className="content-container">
                <div className="content-title">
                  <div className="left">
                    <div className="circle active"></div>
                    <p className="title">New Domain Name:</p>
                  </div>
                  <div className="left">
                    <div className="circle"></div>
                    <p className="title">Existing Domain Name:</p>
                  </div>
                </div>
                <div className="content-input">
                  <div className="right">
                    <input placeholder="shoesboutique" />
                    <div className="custom-select-box">
                      .shib
                      <IoMdArrowDropdown className="arrow-icon" />
                    </div>
                  </div>
                  <div className="right-2">
                    <IoMdArrowDropdown className="arrow-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-3">
            <div className="box-left">
              <div className="content">
                <p className="title">Total PAW cost:</p>
                <input />
              </div>
            </div>
            <div className="box-right">
              <button>Create</button>
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default MintNftPage;
