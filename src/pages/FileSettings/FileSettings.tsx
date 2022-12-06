import React, { useState } from "react"
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io"
import { BsArrowLeftCircle } from "react-icons/bs"
import Navigation from "../../components/Navigation/Navigation"
import FooterBottom from "../../components/FooterBottom/FooterBottom"
import HeaderNav from "../../components/HeaderNav/HeaderNav"
import SideBar from "../../components/SideBar/SideBar"
import fileImg from "../../assets/img/file.png"
import cardImgTwo from "../../assets/img/card-5.png"
import cardImgThree from "../../assets/img/card-6.png"
import cardImgFour from "../../assets/img/card-7.png"
import cardImgFive from "../../assets/img/card-8.png"
import cardImgSix from "../../assets/img/card-9.png"
// import cardImgSeven from "../../assets/img/card-10.png"
// import cardImgEighth from "../../assets/img/card-11.png"
import cardImgNine from "../../assets/img/card-12.png"
import cardImgTen from "../../assets/img/card-13.png"
import "./FileSettings.css"
import Residual from "../ShopSettingsOne/components/Residual"
// import { useParams } from "react-router-dom";
import RemoveItem from "../../components/RemoveItem"
import AddItem from "../../components/AddItem"
import AppearanceSetting from "../../components/AppearanceSetting"
import Transfer from "../../components/Transfer"
import SelectFileImg from "../../assets/img/selectFile.png"
import UploadImg from "../../assets/img/upload.png"
import LinkImg from "../../assets/img/link.png"
import Unlink from "../../assets/img/unlink.png"

const ShopSettingsOne: React.FC = () => {
  // const { id } = useParams();
  const [clickCard, setClickCard] = useState<any>(null)
  // eslint-disable-next-line  no-unused-vars
  const [clickAddItem, setClickAddItem] = useState<any>(null)
  // eslint-disable-next-line  no-unused-vars
  const [clickRemoveItem, setClickRemoveItem] = useState<any>(null)
  const [onMarketPlace, setOnMarketPlace] = useState<any>(null)
  const [onAction, setOnAction] = useState<any>(null)
  const [dropDown, setDropDown] = useState<any>(null)
  const [selectedDropDown, setSelectedDropDown] = useState("Select Currency")
  const [slide, setSlide] = useState(1)

  const handleSlidePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1)
    }
  }

  const handleSlideNext = () => {
    setSlide(slide + 1)
  }

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
                onClick={() => setClickCard("Shipment Address and Details")}
              >
                <img src={fileImg} alt="card" className="card-img-1" />
                <p>File</p>
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

          {clickCard === "Shipment Address and Details" && !clickRemoveItem ? (
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

              {/* {!clickAddItem && (
                <div className="stock-management-cards">
                  <div className="stock-management-card">
                    <img src={cardImgSeven} alt="card" />
                    <div className="card-content">
                      <p className="title">Add new item in shop</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry standard dummy text
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
                        Lorem Ipsum has been the industry standard dummy text
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
              )} */}
              <div>
                <div>
                  {clickAddItem === "Add New Item in Shop" && slide === 1 && (
                    <AddItem />
                  )}
                </div>
              </div>

              <div className="selectFileContainer">
                <div className="files">
                  <img src={SelectFileImg} alt="file" />
                  <h5>Select File</h5>
                </div>
                <div className="files">
                  <img src={UploadImg} alt="upload" />
                  <h5>Upload</h5>
                </div>
                <div className="files">
                  <img src={LinkImg} alt="link" />
                  <h5>Link</h5>
                </div>
                <div className="files">
                  <img src={Unlink} alt="" />
                  <h5>Unlink</h5>
                </div>
              </div>
              {/* {clickAddItem === "Add New Item in Shop" && slide === 2 && (
                <div className="item-info-sub-menu-container sub-menu-container"> */}
              {/* <p className="title">Item Info</p> */}
              {/* <div className="content"> */}
              {/* <div className="content-left">
                      <p>Item Name:</p>
                      <p>Category:</p>
                      <p>Size:</p>
                      <p>Colour:</p>
                      <p>Fabric Type:</p>
                      <p>Item Condition:</p>
                    </div> */}
              {/* <div className="content-right"> */}
              {/* <input placeholder="Item Name" /> */}
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
              {/* <select>
                        <option>Select a Category from List</option>
                      </select>
                      <input placeholder="Available Size List(Ex. 30, 32, 35, 44)" />
                      <input placeholder="Fabric Type Details" /> */}
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
              {/* <select>
                        <option>New</option>
                      </select>
                      <input placeholder="Used" /> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
              {/* )} */}
              {/* {clickAddItem === "Add New Item in Shop" && slide === 3 && (
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
              )} */}
              {/* {clickAddItem === "Add New Item in Shop" && slide === 4 && (
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
              )} */}
            </div>
          ) : (
            clickRemoveItem && <RemoveItem />
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
              <AppearanceSetting setClickCard={undefined} />
            </div>
          )}

          {clickCard === "residual" && <Residual setClickCard={setClickCard} />}

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

              <Transfer />
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
                        Lorem Ipsum has been the industry standard dummy text
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
                        Lorem Ipsum has been the industry standard dummy text
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
  )
}

export default ShopSettingsOne
