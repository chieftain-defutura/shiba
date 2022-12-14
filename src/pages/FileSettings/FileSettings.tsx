import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import fileImg from '../../assets/img/file.png'
import cardImgTwo from '../../assets/img/card-5.png'
import cardImgThree from '../../assets/img/card-6.png'
import cardImgFour from '../../assets/img/card-7.png'
import cardImgFive from '../../assets/img/card-8.png'
import cardImgSix from '../../assets/img/card-9.png'
// import cardImgSeven from "../../assets/img/card-10.png"
// import cardImgEighth from "../../assets/img/card-11.png"
import cardImgNine from '../../assets/img/card-12.png'
import cardImgTen from '../../assets/img/card-13.png'
import './FileSettings.css'
import Residual from '../ShopSettingsOne/components/Residual'
// import { useParams } from "react-router-dom";
import RemoveItem from '../../components/RemoveItem'
import AddItem from '../../components/AddItem'
import AppearanceSetting from '../../components/AppearanceSetting'
import Transfer from '../../components/Transfer'
import SelectFileImg from '../../assets/img/selectFile.png'
import UploadImg from '../../assets/img/upload.png'
import LinkImg from '../../assets/img/link.png'
import Unlink from '../../assets/img/unlink.png'
import MarketPlace from '../../components/MarketPlace'
import Auction from '../../components/Auction'

const ShopSettingsOne: React.FC = () => {
  // const { id } = useParams();
  const [clickCard, setClickCard] = useState<any>(null)
  // eslint-disable-next-line  no-unused-vars
  const [clickAddItem, setClickAddItem] = useState<any>(null)
  // eslint-disable-next-line  no-unused-vars
  const [clickRemoveItem, setClickRemoveItem] = useState<any>(null)
  const [onMarketPlace, setOnMarketPlace] = useState<any>(null)
  const [onAction, setOnAction] = useState<any>(null)
  // const [dropDown, setDropDown] = useState<any>(null)
  // const [selectedDropDown, setSelectedDropDown] = useState("Select Currency")
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
                onClick={() => setClickCard('Shipment Address and Details')}
              >
                <img src={fileImg} alt="card" className="card-img-1" />
                <p>File</p>
              </div>
              <div
                className="card"
                onClick={() => setClickCard('appearance settings')}
              >
                <img src={cardImgTwo} alt="card" className="card-img-2" />
                <p>Appearance Settings</p>
              </div>
              <div className="card" onClick={() => setClickCard('residual')}>
                <img src={cardImgThree} alt="card" className="card-img-3" />
                <p>Residual</p>
              </div>
              <div className="card" onClick={() => setClickCard('transfer')}>
                <img src={cardImgFour} alt="card" className="card-img-4" />
                <p>Transfer</p>
              </div>
              <div className="card" onClick={() => setClickCard('put on sale')}>
                <img src={cardImgFive} alt="card" className="card-img-5" />
                <p>Sell</p>
              </div>
              <div className="card">
                <img src={cardImgSix} alt="card" className="card-img-6" />
                <p>Finalize Token</p>
              </div>
            </div>
          )}

          {clickCard === 'Shipment Address and Details' && !clickRemoveItem ? (
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
                  {clickAddItem === 'Add New Item in Shop' && slide === 1 && (
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

              {clickAddItem === 'Add New Item in Shop' && slide === 3 && (
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
              {clickAddItem === 'Add New Item in Shop' && slide === 4 && (
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
            clickRemoveItem && <RemoveItem />
          )}

          {clickCard === 'appearance settings' && (
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

          {clickCard === 'residual' && <Residual setClickCard={setClickCard} />}

          {clickCard === 'transfer' && (
            <div className="residual-container">
              {!clickAddItem && (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard('put on sale')}
                />
              )}
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>

              <Transfer />
            </div>
          )}

          {clickCard === 'put on sale' && (
            <div className="sell-container">
              {!clickAddItem && (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard('put on sale')}
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

              {onMarketPlace && <MarketPlace />}

              {onAction && <Auction />}
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ShopSettingsOne
