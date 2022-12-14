import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import fileImg from '../../assets/img/file.png'
import SideBar from '../../components/SideBar/SideBar'
import cardImgOne from '../../assets/img/card-4.png'
import cardImgTwo from '../../assets/img/card-5.png'
import cardImgThree from '../../assets/img/card-6.png'
import cardImgFour from '../../assets/img/card-7.png'
import cardImgFive from '../../assets/img/card-8.png'
import cardImgSeven from '../../assets/img/card-10.png'
import cardImgEighth from '../../assets/img/card-11.png'
import cardImgNine from '../../assets/img/card-12.png'
import cardImgTen from '../../assets/img/card-13.png'
import './ShopSetting.css'
import Residual from './components/Residual'
import RemoveItem from '../../components/RemoveItem'
import AddItem from '../../components/AddItem'
import AppearanceSetting from '../../components/AppearanceSetting'
import Transfer from '../../components/Transfer'
import MarketPlace from '../../components/MarketPlace'
import Auction from '../../components/Auction'
import FinalizeToken from './components/FinalizeToken'

const ShopSettingsOne: React.FC<{ contractData: { transfer: boolean } }> = ({
  contractData,
}) => {
  const [clickCard, setClickCard] = useState<any>(null)
  const [clickAddItem, setClickAddItem] = useState<any>(null)
  const [clickRemoveItem, setClickRemoveItem] = useState<any>(null)
  const [onMarketPlace, setOnMarketPlace] = useState<any>(null)
  const [onAction, setOnAction] = useState<any>(null)
  const [dropDown, setDropDown] = useState<any>(null)
  const [selectedDropDown, setSelectedDropDown] = useState('Select Currency')
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
              {contractData ? (
                <div
                  className="card"
                  onClick={() => setClickCard('Shipment Address and Details')}
                >
                  <img src={fileImg} alt="card" className="card-img-1" />
                  <p>File</p>
                </div>
              ) : (
                <div
                  className="card"
                  onClick={() => setClickCard('stock management')}
                >
                  <img src={cardImgOne} alt="card" className="card-img-1" />
                  <p>Stock Management</p>
                </div>
              )}
              <div
                className="card"
                onClick={() => setClickCard('stock management')}
              >
                <img src={cardImgOne} alt="card" className="card-img-1" />
                <p>Stock Management</p>
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
                <FinalizeToken />
              </div>
            </div>
          )}

          {clickCard === 'stock management' && !clickRemoveItem ? (
            <div className="stock-management-container">
              {!clickAddItem ? (
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                />
              ) : (
                <div className="arrow-icon-container">
                  {/* <IoIosArrowBack
                    className="prev-arrow-icon"
                    onClick={handleSlidePrev}
                  /> */}

                  {/* <IoIosArrowForward
                    className="next-arrow-icon"
                    onClick={handleSlideNext}
                  /> */}
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
                        Lorem Ipsum has been the industry standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button
                        onClick={() => setClickAddItem('Add New Item in Shop')}
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
              )}
              <div>
                <div>
                  {clickAddItem === 'Add New Item in Shop' && slide === 1 && (
                    <AddItem />
                  )}
                </div>
              </div>
            </div>
          ) : (
            clickRemoveItem && <RemoveItem />
          )}

          {clickCard === 'appearance settings' && (
            <div
              className="appearance-settings-container"
              id="appearance-settings-container"
            >
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>
              <AppearanceSetting setClickCard={setClickCard} />
            </div>
          )}

          {clickCard === 'residual' && <Residual setClickCard={setClickCard} />}

          {clickCard === 'transfer' && (
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

          {clickCard === 'put on sale' && (
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
