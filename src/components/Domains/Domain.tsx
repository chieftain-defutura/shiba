import React, { useState } from 'react'
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
} from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import cardImgFour from '../../assets/img/card-7.png'
import cardImgFive from '../../assets/img/card-8.png'
import cardImgSeven from '../../assets/img/card-10.png'
import cardImgEighth from '../../assets/img/card-11.png'
import cardImgNine from '../../assets/img/card-12.png'
import cardImgTen from '../../assets/img/card-13.png'
import Residual from '../../pages/ShopSettingsOne/components/Residual'
import RemoveItem from '../RemoveItem/DigitalRemoveCard'
import AppearanceSetting from '../../components/AppearanceSetting'
import Transfer from '../../components/Transfer'
import { Formik, Form, Field } from 'formik'
import { TokenData } from '../../constants/tokenData'
import Auction from '../Auction'

const ShopSettingsOne: React.FC = () => {
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
              <div className="card" onClick={() => setClickCard('transfer')}>
                <img src={cardImgFour} alt="card" className="card-img-4" />
                <p>Transfer</p>
              </div>
              <div className="card" onClick={() => setClickCard('put on sale')}>
                <img src={cardImgFive} alt="card" className="card-img-5" />
                <p>Sell</p>
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
                <Formik
                  initialValues={{
                    itemName: '',
                    category: '',
                    size: '',
                    colour: '',
                    fabricType: '',
                    itemCondition: '',
                    productDescription: '',
                    productDetails: '',
                    manufacturer: '',
                    brand: '',
                    refundPossible: '',
                    department: '',
                    quantity: '',
                    price: '',
                    currency: '',
                    shipmentArea: '',
                    shipmentFee: '',
                    deliveredIn: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values)
                  }}
                >
                  {() => (
                    <Form>
                      {clickAddItem === 'Add New Item in Shop' &&
                        slide === 1 && (
                          <div className="item-info-sub-menu-container sub-menu-container">
                            <BsArrowLeftCircle
                              className="arrow-icon"
                              onClick={() => setClickCard(null)}
                            />
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
                                <Field
                                  placeholder="Item Name"
                                  name="itemName"
                                  type="text"
                                />
                                <Field as="select" name="category">
                                  <option value="">Select a Currency</option>
                                  {TokenData.map((f, index) => {
                                    return (
                                      <>
                                        <option
                                          value={f.tokenAddress}
                                          key={index}
                                        >
                                          {f.tokenName}
                                        </option>
                                      </>
                                    )
                                  })}
                                </Field>

                                <Field as="select" name="size">
                                  <option>Select a Category from List</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </Field>
                                <Field
                                  name="colour"
                                  placeholder="Available Size List(Ex. 30, 32, 35, 44)"
                                />

                                <Field
                                  name="fabricType"
                                  placeholder="Fabric Type Details"
                                />

                                <Field
                                  name="itemCondition"
                                  placeholder="Used"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      {clickAddItem === 'Add New Item in Shop' &&
                        slide === 2 && (
                          <div className="description-sub-menu-container sub-menu-container">
                            <IoIosArrowBack
                              className="prev-arrow-icon"
                              onClick={handleSlidePrev}
                            />
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
                                <Field
                                  name="productDescription"
                                  placeholder="Product Description"
                                />
                                <Field
                                  name="productDetails"
                                  placeholder="Product Details"
                                />
                                <Field
                                  name="manufacturer"
                                  placeholder="Manufacturer"
                                />
                                <Field name="brand" placeholder="Brand" />
                                <Field as="select" name="refundPossible">
                                  <option>Yes / No</option>
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </Field>
                                <Field as="select" name="department">
                                  <option>Menu / Women / Kids</option>
                                  <option value="menu">Menu</option>
                                  <option value="women">Women</option>
                                  <option value="kids">Kids</option>
                                </Field>
                              </div>
                            </div>
                          </div>
                        )}
                      {clickAddItem === 'Add New Item in Shop' &&
                        slide === 3 && (
                          <div className="quantity-price-shipment-sub-menu-container sub-menu-container">
                            <p className="title">
                              Quantity, Price and Shipment
                            </p>
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
                                <Field name="quantity" placeholder="Quantity" />
                                <Field name="price" placeholder="Price" />
                                <Field as="select" name="currency">
                                  <option>
                                    Select Currency (SHI or LEASH or SHIB or
                                    BONE or PAW)
                                  </option>
                                  <option value="shi">SHI</option>
                                  <option value="leash">LEASH</option>
                                  <option value="shib">SHIB</option>
                                  <option value="bone">BONE</option>
                                  <option value="paw">PAW</option>
                                </Field>
                                <Field
                                  name="shipmentArea"
                                  placeholder="Insert Shipment Areas (Ex. USA, Germany, Asia or Worldwide)"
                                />
                                <Field
                                  name="shipmentFee"
                                  placeholder="Shipment Fee"
                                />
                                <Field
                                  name="deliveredIn"
                                  placeholder="Ex. 10-20 Working days"
                                />
                              </div>
                            </div>
                            <div className="btn-cont">
                              <button>Submit Listing and Put on Sale</button>
                            </div>
                          </div>
                        )}
                    </Form>
                  )}
                </Formik>
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
                            className={!dropDown ? ' right' : 'right active'}
                          >
                            <div
                              className="header"
                              onClick={() => setDropDown(!dropDown)}
                            >
                              <p>{selectedDropDown}</p>
                              <IoIosArrowDown />
                            </div>
                            <div className={!dropDown ? 'body' : 'body active'}>
                              <p onClick={() => setSelectedDropDown('SHI')}>
                                SHI
                              </p>
                              <p onClick={() => setSelectedDropDown('LEASH')}>
                                LEASH
                              </p>
                              <p onClick={() => setSelectedDropDown('SHIB')}>
                                SHIB
                              </p>
                              <p onClick={() => setSelectedDropDown('BONE')}>
                                BONE
                              </p>
                              <p onClick={() => setSelectedDropDown('PAW')}>
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

              {/* {onAction && <Auction />} */}
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ShopSettingsOne
