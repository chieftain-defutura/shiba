import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import "./ShopSettingsOne.css";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import SideBar from "../../components/SideBar/SideBar";
import cardImgOne from "../../assets/img/card-4.png";
import cardImgTwo from "../../assets/img/card-5.png";
import cardImgThree from "../../assets/img/card-6.png";
import cardImgFour from "../../assets/img/card-7.png";
import cardImgFive from "../../assets/img/card-8.png";
import cardImgSix from "../../assets/img/card-9.png";
import cardImgSeven from "../../assets/img/card-10.png";
import cardImgEighth from "../../assets/img/card-11.png";
import cardImgNine from "../../assets/img/card-12.png";
import cardImgTen from "../../assets/img/card-13.png";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import cardImg from "../../assets/img/card-3.png";

const ShopSettingsOne = () => {
  const [clickCard, setClickCard] = useState(null);
  const [clickAddItem, setClickAddItem] = useState(null);
  const [clickRemoveItem, setClickRemoveItem] = useState(null);
  const [onMarketPlace, setOnMarketPlace] = useState(null);
  const [onAction, setOnAction] = useState(null);
  const [dropDown, setDropDown] = useState(null);
  const [selectedDropDown, setSelectedDropDown] = useState("Select Currency");
  const [slide, setSlide] = useState(1);

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1);
    }
  };

  const handleSlideNext = () => {
    setSlide(slide + 1);
  };

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="shop-setting-one-container">
        <div className="shop-setting-one-container-left">
          <SideBar />
        </div>
        <div className="shop-setting-one-container-right">
          <h2 className="heading">shoesboutique.shib</h2>
          {!clickCard && (
            <div className="cards-container">
              <div
                className="card"
                onClick={() => setClickCard("stock management")}
              >
                <img src={cardImgOne} alt="card" className="card-img-1" />
                <p>Stock Management</p>
              </div>
              <div
                className="card"
                onClick={() => setClickCard("appearance settings")}
              >
                <img src={cardImgTwo} alt="card" className="card-img-2" />
                <p>Appearance Settings</p>
              </div>
              <div className="card" onClick={() => setClickCard("residual")}>
                <img src={cardImgThree} alt="card" className="card-img-3" />
                <p>Residual</p>
              </div>
              <div className="card" onClick={() => setClickCard("transfer")}>
                <img src={cardImgFour} alt="card" className="card-img-4" />
                <p>Transfer</p>
              </div>
              <div className="card" onClick={() => setClickCard("put on sale")}>
                <img src={cardImgFive} alt="card" className="card-img-5" />
                <p>Sell</p>
              </div>
              <div className="card">
                <img src={cardImgSix} alt="card" className="card-img-6" />
                <p>Finalize Token</p>
              </div>
            </div>
          )}

          {clickCard === "stock management" && !clickRemoveItem ? (
            <div className="stock-management-container">
              {!clickAddItem ? (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                />
              ) : (
                <div className="arrow-icon-container">
                  <IoIosArrowBack
                    className="prev-arrow-icon"
                    onClick={handleSlidePrev}
                  />

                  <IoIosArrowForward
                    className="next-arrow-icon"
                    onClick={handleSlideNext}
                  />
                </div>
              )}
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>
              {!clickAddItem && (
                <div className="stock-management-cards">
                  <div className="stock-management-card">
                    <img src={cardImgSeven} alt="card" />
                    <div className="card-content">
                      <p className="title">Add new item in shop</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button
                        onClick={() => setClickAddItem("Add New Item in Shop")}
                      >
                        Demo
                      </button>
                    </div>
                  </div>
                  <div className="stock-management-card">
                    <img src={cardImgEighth} alt="card" />
                    <div className="card-content">
                      <p className="title">Remove Item From Shop</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button onClick={() => setClickRemoveItem(true)}>
                        Demo
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {clickAddItem === "Add New Item in Shop" && slide === 1 && (
                <div className="photo-sub-menu-container sub-menu-container">
                  <p className="title">Photos</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Logo:</p>
                      <p>Main Photo:</p>
                      <p>Photo:</p>
                      <p>Photo:</p>
                      <p>Photo:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Metadata Link 350*350" />
                      <input placeholder="Metadata Link 600*400" />
                      <input placeholder="Metadata Link" />
                      <input placeholder="Metadata Link" />
                      <input placeholder="Metadata Link" />
                    </div>
                  </div>
                </div>
              )}
              {clickAddItem === "Add New Item in Shop" && slide === 2 && (
                <div className="item-info-sub-menu-container sub-menu-container">
                  <p className="title">Item Info</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Item Name:</p>
                      <p>Category:</p>
                      <p>Size:</p>
                      <p>Colour:</p>
                      <p>Fabric Type:</p>
                      <p>Item Condition:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Item Name" />
                      {/* <div className="dropdown-cont">
                        <div
                          className="header"
                          onClick={() => handleDropDown(1)}
                        >
                          <p>
                            {!selectedDropDown
                              ? "Select a Category from List"
                              : selectedDropDown}
                          </p>
                          <IoMdArrowDropdown className="arrow-icon-2" />
                        </div>
                        {dropDown === 1 && (
                          <div className="drop-down-body">
                            <p onClick={() => setSelectedDropDown("Demo 1")}>
                              Demo 1
                            </p>
                            <p onClick={() => setSelectedDropDown("Demo 2")}>
                              Demo 2
                            </p>
                            <p onClick={() => setSelectedDropDown("Demo 3")}>
                              Demo 3
                            </p>
                            <p onClick={() => setSelectedDropDown("Demo 4")}>
                              Demo 4
                            </p>
                            <p onClick={() => setSelectedDropDown("Demo 5")}>
                              Demo 5
                            </p>
                            <p onClick={() => setSelectedDropDown("Demo 6")}>
                              Demo 6
                            </p>
                          </div>
                        )}
                      </div> */}
                      <select>
                        <option>Select a Category from List</option>
                      </select>
                      <input placeholder="Available Size List(Ex. 30, 32, 35, 44)" />
                      <input placeholder="Fabric Type Details" />
                      {/* <div className="dropdown-cont">
                        <div
                          className="header"
                          onClick={() => handleDropDown(2)}
                        >
                          <p>
                            {!selectedDropDown2 ? "New" : selectedDropDown2}
                          </p>
                          <IoMdArrowDropdown className="arrow-icon-2" />
                        </div>
                        {dropDown === 2 && (
                          <div className="drop-down-body">
                            <p onClick={() => setSelectedDropDown2("Demo 1")}>
                              Demo 1
                            </p>
                            <p onClick={() => setSelectedDropDown2("Demo 2")}>
                              Demo 2
                            </p>
                            <p onClick={() => setSelectedDropDown2("Demo 3")}>
                              Demo 3
                            </p>
                            <p onClick={() => setSelectedDropDown2("Demo 4")}>
                              Demo 4
                            </p>
                            <p onClick={() => setSelectedDropDown2("Demo 5")}>
                              Demo 5
                            </p>
                            <p onClick={() => setSelectedDropDown2("Demo 6")}>
                              Demo 6
                            </p>
                          </div>
                        )}
                      </div> */}
                      <select>
                        <option>New</option>
                      </select>
                      <input placeholder="Used" />
                    </div>
                  </div>
                </div>
              )}
              {clickAddItem === "Add New Item in Shop" && slide === 3 && (
                <div className="description-sub-menu-container sub-menu-container">
                  <p className="title">Description</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Product Description:</p>
                      <p>Product Details:</p>
                      <p>Manufacturer:</p>
                      <p>Brand:</p>
                      <p>Refund Possible:</p>
                      <p>Department:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Product Description" />
                      <input placeholder="Product Details" />
                      <input placeholder="Manufacturer" />
                      <input placeholder="Brand" />
                      <select>
                        <option>Yes / No</option>
                        <option>Yes</option>
                        <option>Yes</option>
                      </select>
                      <select>
                        <option>Menu / Women / Kids</option>
                        <option>Menu</option>
                        <option>Women</option>
                        <option>Kids</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {clickAddItem === "Add New Item in Shop" && slide === 4 && (
                <div className="quantity-price-shipment-sub-menu-container sub-menu-container">
                  <p className="title">Quantity, Price and Shipment</p>
                  <div className="content">
                    <div className="content-left">
                      <p>Quantity:</p>
                      <p>Price:</p>
                      <p>Currency:</p>
                      <p>Shipment Area:</p>
                      <p>Shipment Fee:</p>
                      <p>Delivered In:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Quantity" />
                      <input placeholder="Price" />
                      <select>
                        <option>
                          Select Currency (SHI or LEASH or SHIB or BONE or PAW)
                        </option>
                      </select>
                      <input placeholder="Insert Shipment Areas (Ex. USA, Germany, Asia or Worldwide)" />
                      <input placeholder="Shipment Fee" />
                      <input placeholder="Ex. 10-20 Working days" />
                    </div>
                  </div>
                  <div className="btn-cont">
                    <button>Submit Listing and Put on Sale</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            clickRemoveItem && (
              <div className="stock-management-remove-item-container">
                <div className="remove-item-cards-container">
                  <div>
                    <div className="remove-item-card">
                      <div className="card-top">
                        <img src={cardImg} alt="card" />
                      </div>
                      <div className="card-center">
                        <h3 className="title">The Holy Grail</h3>
                        <h4 className="sub-title">Pixart Motion</h4>
                      </div>
                      <div className="card-bottom">
                        <p>Fixed price</p>
                        <button>0.001 ETH</button>
                      </div>
                      <div className="card-overlay">
                        <button>Details</button>
                        <button>Remove Shop</button>
                      </div>
                    </div>
                    <div className="remove-card-bottom">
                      <p>Name: shoes winter</p>
                      <p>Quantity: 100</p>
                      <p>Total Sell: 44</p>
                    </div>
                  </div>
                  <div>
                    <div className="remove-item-card">
                      <div className="card-top">
                        <img src={cardImg} alt="card" />
                      </div>
                      <div className="card-center">
                        <h3 className="title">The Holy Grail</h3>
                        <h4 className="sub-title">Pixart Motion</h4>
                      </div>
                      <div className="card-bottom">
                        <p>Fixed price</p>
                        <button>0.001 ETH</button>
                      </div>
                      <div className="card-overlay">
                        <button>Details</button>
                        <button>Remove Shop</button>
                      </div>
                    </div>
                    <div className="remove-card-bottom">
                      <p>Name: shoes summer</p>
                      <p>Quantity: 100</p>
                      <p>Total Sell: 10</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {clickCard === "appearance settings" && (
            <div
              className="appearance-settings-container"
              id="appearance-settings-container"
            >
              <div className="arrow-icon-container">
                <IoIosArrowBack
                  className="prev-arrow-icon"
                  onClick={handleSlidePrev}
                />
                <IoIosArrowForward
                  className="next-arrow-icon"
                  onClick={handleSlideNext}
                />
              </div>
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>

              {slide === 1 && (
                <div className="appearance-settings-sub-menu-container sub-menu-container">
                  <div className="content">
                    <div className="content-left">
                      <p>Logo:</p>
                      <p>Main Photo / Video:</p>
                      <p>Photo / Video1:</p>
                      <p>Photo / Video2:</p>
                      <p>Photo / Video3:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Metadata Link 350*350" />
                      <input placeholder="Metadata Link 600*400" />
                      <input placeholder="Metadata Link" />
                      <input placeholder="Metadata Link" />
                      <input placeholder="Metadata Link" />
                    </div>
                  </div>
                  <div className="btn-cont">
                    <button>Submit Changes</button>
                  </div>
                </div>
              )}
              {slide === 2 && (
                <div className="brief-description-sub-menu-container sub-menu-container">
                  <div className="content">
                    <div className="content-left">
                      <p>Brief Description:</p>
                      <p>Contracts:</p>
                    </div>
                    <div className="content-right">
                      <textarea rows={13}></textarea>
                      <input placeholder="" />
                    </div>
                  </div>
                  <div className="btn-cont">
                    <button>Submit Changes</button>
                  </div>
                </div>
              )}
              {slide === 3 && (
                <div className="social-links-sub-menu-container sub-menu-container">
                  <div className="content">
                    <div className="content-left">
                      <p>Website:</p>
                      <p>Twitter:</p>
                      <p>Instagram:</p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Link" />
                      <input placeholder="Link" />
                      <input placeholder="Link" />
                    </div>
                  </div>
                  <div className="btn-cont">
                    <button>Submit Changes</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {clickCard === "residual" && (
            <div className="residual-container">
              {!clickAddItem && (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                />
              )}
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>

              <div className="residual-container-sub-menu-container sub-menu-container">
                <div className="content">
                  <div className="content-left">
                    <p>Set Residual %</p>
                    <p>Residual Getters List and their Shares</p>
                    <p>Add Residual Getter</p>
                    <p>Remove Residual Getter</p>
                  </div>
                  <div className="content-right">
                    <input placeholder="Max 10" />
                    <select>
                      <option>Ex. 0x0000...001 50 Shares</option>
                    </select>
                    <div className="add-getter-cont">
                      <input className="address" placeholder="Address" />
                      <input className="share" placeholder="Share" />
                    </div>
                    <select>
                      <option>Select Address to Remove</option>
                    </select>
                  </div>
                </div>
                <div className="btn-cont">
                  <button>Submit Changes</button>
                </div>
              </div>
            </div>
          )}

          {clickCard === "transfer" && (
            <div className="residual-container">
              {!clickAddItem && (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                />
              )}
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>

              <div className="transfer-sub-menu-container sub-menu-container">
                <div className="content">
                  <input />
                </div>
                <div className="btn-cont">
                  <button>Submit Changes</button>
                </div>
              </div>
            </div>
          )}

          {clickCard === "put on sale" && (
            <div className="sell-container">
              {!clickAddItem && (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                />
              )}
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>

              {!onMarketPlace && !onAction && (
                <div className="put-on-sale-sub-menu-container">
                  <div className="card">
                    <div className="card-left">
                      <img src={cardImgNine} alt="card" />
                    </div>
                    <div className="card-right">
                      <p className="card-title">On MarketPlace</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button onClick={() => setOnMarketPlace(true)}>
                        Demo
                      </button>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-left">
                      <img src={cardImgTen} alt="card" />
                    </div>
                    <div className="card-right">
                      <p className="card-title">On Auction</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button onClick={() => setOnAction(true)}>Demo</button>
                    </div>
                  </div>
                </div>
              )}

              {onMarketPlace && (
                <div className="on-marketplace-container">
                  <p className="title">On Marketplace</p>
                  <div className="on-marketplace-sub-container">
                    <div className="content">
                      <div className="content-left">
                        <p>Select Charity Organisation From List</p>
                        <p>Price</p>
                      </div>
                      <div className="content-right">
                        <select></select>
                        <div className="price-select-container">
                          <div className="left">
                            <input />
                            <button>Put On Sale</button>
                          </div>
                          <div
                            className={!dropDown ? " right" : "right active"}
                          >
                            <div
                              className="header"
                              onClick={() => setDropDown(!dropDown)}
                            >
                              <p>{selectedDropDown}</p>
                              <IoIosArrowDown />
                            </div>
                            <div className={!dropDown ? "body" : "body active"}>
                              <p onClick={() => setSelectedDropDown("SHI")}>
                                SHI
                              </p>
                              <p onClick={() => setSelectedDropDown("LEASH")}>
                                LEASH
                              </p>
                              <p onClick={() => setSelectedDropDown("SHIB")}>
                                SHIB
                              </p>
                              <p onClick={() => setSelectedDropDown("BONE")}>
                                BONE
                              </p>
                              <p onClick={() => setSelectedDropDown("PAW")}>
                                PAW
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {onAction && (
                <div className="on-marketplace-container">
                  <p className="title">On Auction</p>
                  <div className="on-marketplace-sub-container">
                    <div className="content">
                      <div className="content-left">
                        <p>Select Charity Organisation From List</p>
                        <p>Reserve Price</p>
                      </div>
                      <div className="content-right">
                        <select></select>
                        <div className="price-select-container">
                          <div className="left">
                            <input />
                            <button>Put On Sale</button>
                          </div>
                          <div
                            className={!dropDown ? " right" : "right active"}
                          >
                            <div
                              className="header"
                              onClick={() => setDropDown(!dropDown)}
                            >
                              <p>{selectedDropDown}</p>
                              <IoIosArrowDown />
                            </div>
                            <div className={!dropDown ? "body" : "body active"}>
                              <p onClick={() => setSelectedDropDown("SHI")}>
                                SHI
                              </p>
                              <p onClick={() => setSelectedDropDown("LEASH")}>
                                LEASH
                              </p>
                              <p onClick={() => setSelectedDropDown("SHIB")}>
                                SHIB
                              </p>
                              <p onClick={() => setSelectedDropDown("BONE")}>
                                BONE
                              </p>
                              <p onClick={() => setSelectedDropDown("PAW")}>
                                PAW
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default ShopSettingsOne;
