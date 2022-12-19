import React, { useState } from 'react'
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
import './ShopSetting.css'
import Residual from './components/Residual'
import AddItem from '../../components/AddItem'
import AppearanceSetting from '../../components/AppearanceSetting'
import Transfer from '../../components/Transfer'
import FinalizeToken from './components/FinalizeToken'
import { IContractData } from '../../constants/contract'
import PhysicalShopForm from '../../components/PhysicalShopForm'
import PhysicalRemoveItem from '../../components/RemoveItem/PhysicalRemoveCard'
import DigitalRemoveItem from '../../components/RemoveItem/DigitalRemoveCard'
import Sell from './components/Sell'

type IShopSetting = {
  setShopSetting: React.Dispatch<boolean>
  contractData: IContractData
}

const ShopSettingsOne: React.FC<IShopSetting> = ({
  setShopSetting,
  contractData,
}) => {
  const [clickCard, setClickCard] = useState<any>(null)
  const [clickAddItem, setClickAddItem] = useState<any>(null)
  const [clickRemoveItem, setClickRemoveItem] = useState<any>(null)
  const slide = 1

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
              {contractData.file === true && (
                <div
                  className="card"
                  onClick={() => setClickCard('Shipment Address and Details')}
                >
                  <img src={fileImg} alt="card" className="card-img-1" />
                  <p>File</p>
                </div>
              )}

              {contractData.stockManagement === true && (
                <div
                  className="card"
                  onClick={() => setClickCard('stock management')}
                >
                  <img src={cardImgOne} alt="card" className="card-img-1" />
                  <p>Stock Management</p>
                </div>
              )}

              {contractData.appearanceSetting === true && (
                <div
                  className="card"
                  onClick={() => setClickCard('appearance settings')}
                >
                  <img src={cardImgTwo} alt="card" className="card-img-2" />
                  <p>Appearance Settings</p>
                </div>
              )}

              {contractData.residual === true && (
                <div className="card" onClick={() => setClickCard('residual')}>
                  <img src={cardImgThree} alt="card" className="card-img-3" />
                  <p>Residual</p>
                </div>
              )}

              {contractData.transfer === true && (
                <div className="card" onClick={() => setClickCard('transfer')}>
                  <img src={cardImgFour} alt="card" className="card-img-4" />
                  <p>Transfer</p>
                </div>
              )}

              {contractData.sell === true && (
                <div
                  className="card"
                  onClick={() => setClickCard('put on sale')}
                >
                  <img src={cardImgFive} alt="card" className="card-img-5" />
                  <p>Sell</p>
                </div>
              )}

              {contractData.finalizeToken === true && (
                <div className="card">
                  <FinalizeToken />
                </div>
              )}
            </div>
          )}

          {clickCard === 'stock management' && !clickRemoveItem ? (
            <div className="stock-management-container">
              <div className="arrow-icon-container">
                <BsArrowLeftCircle
                  className="arrow-icon"
                  onClick={() => setClickCard(null)}
                  // onClick={() => setShopSetting(true)}
                />
              </div>

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
                    <>
                      {contractData.pathName === 'my-digital-shop' ? (
                        <AddItem setAddItem={setClickCard} />
                      ) : (
                        <PhysicalShopForm setClickCard={setClickCard} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {contractData.pathName === 'my-goods-shop'
                ? clickRemoveItem && <PhysicalRemoveItem />
                : clickRemoveItem && <DigitalRemoveItem />}
            </>
          )}

          {clickCard === 'appearance settings' && (
            <div
              className="appearance-settings-container"
              id="appearance-settings-container"
            >
              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>
              <AppearanceSetting
                setClickCard={setClickCard}
                contractAddress={contractData.address}
              />
            </div>
          )}

          {clickCard === 'residual' && (
            <Residual
              setClickCard={setClickCard}
              contractAddress={contractData.address}
            />
          )}

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
              <BsArrowLeftCircle
                className="arrow-icon"
                onClick={() => setClickCard(null)}
              />

              <h2 className="title">
                {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
              </h2>
              <Sell contractAddress={contractData.address} />
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ShopSettingsOne
