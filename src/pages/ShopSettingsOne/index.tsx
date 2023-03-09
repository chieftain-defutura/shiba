import React, { useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { create } from 'zustand'

import HomeLayout from 'Layout/HomeLayout'
import FooterBottom from 'components/FooterBottom/index'
import Residual from 'components/Settings/Residual'
import AddItem from 'components/Settings/StockManagement/AddItem/DigitalForm'
import AppearanceSetting from 'components/Settings/AppearanceSetting'
import Transfer from 'components/Settings/Transfer'
import FinalizeToken from 'components/Settings/FinalizeToken'
import { IContractData } from 'constants/contract'
import PhysicalShopForm from 'components/Settings/StockManagement/AddItem/PhysicalForm'
import PhysicalRemoveItem from 'components/Settings/StockManagement/RemoveItem/PhysicalCard/RemoveItem'
import DigitalRemoveItem from 'components/Settings/StockManagement/RemoveItem/DigitalCard/RemoveItem'
import Sell from 'components/Settings/Sell'
import Loading from 'components/Loading'
import { IoIosArrowBack } from 'react-icons/io'
import { IHaveToSend } from 'constants/types'
import { haveToSendQuery } from 'constants/query'

import fileImg from 'assets/img/file.png'
import cardImgOne from 'assets/img/card-4.png'
import cardImgTwo from 'assets/img/card-5.png'
import cardImgThree from 'assets/img/card-6.png'
import cardImgFour from 'assets/img/card-7.png'
import cardImgFive from 'assets/img/card-8.png'
import cardImgSeven from 'assets/img/card-10.png'
import cardImgEighth from 'assets/img/card-11.png'
import './ShopSetting.css'
import File from 'components/Settings/File'
import Modal from 'components/Model'
import FileCategory from 'components/Settings/FileCategory'
import Folder from 'assets/icon/folder.png'
import SelectTemplate from 'pages/Template/SelectTemplate'

type IShopSetting = {
  setShopSetting: React.Dispatch<boolean>
  contractData: IContractData
}

export const useToStore = create((set) => ({
  storeData: 0,
}))

const ShopSettingsOne: React.FC<IShopSetting> = ({ contractData }) => {
  const { id } = useParams()
  const { address } = useAccount()

  const [result] = useQuery({
    query: contractData.query,
    variables: { id: id },
  })
  const { data, fetching, error } = result

  return (
    <div>
      <HomeLayout>
        <div className="shop-setting-one-container">
          <div className="shop-setting-one-container-right">
            {fetching ? (
              <div className="loading">
                <Loading />
              </div>
            ) : error ? (
              <div className="error-msg">
                <p>Something went wrong</p>
              </div>
            ) : data[Object.keys(data)[0]] === null ? (
              <div>
                <h3 style={{ color: 'red' }}>Access your Token </h3>
              </div>
            ) : data[Object.keys(data)[0]].owner.id.toLowerCase() !==
              address?.toLowerCase() ? (
              <div>
                <h3 style={{ color: 'red' }}>Access your Token </h3>
              </div>
            ) : (
              <Settings
                contractData={contractData}
                tokenData={data[Object.keys(data)[0]]}
              />
            )}
          </div>
        </div>
      </HomeLayout>
      <FooterBottom />
    </div>
  )
}

const Settings: React.FC<{ contractData: IContractData; tokenData: any }> = ({
  contractData,
  tokenData,
}) => {
  const [clickCard, setClickCard] = useState<any>(null)
  const [clickAddItem, setClickAddItem] = useState(false)
  const [clickRemoveItem, setClickRemoveItem] = useState(false)
  // const [isModalOpen, setModalState] = React.useState(false)

  // const toggleModal = () => setModalState(!isModalOpen)

  // const handleClick = () => {
  //   const letter = ['template modal']
  //   console.log(letter)
  // }

  return (
    <>
      {/* <h2 className="heading">{tokenData.domainName}</h2> */}
      {!clickCard && (
        <div>
          <h2 className="heading">{tokenData.domainName}</h2>

          <div className="cards-container">
            {contractData.file === true && (
              <div>
                <div
                  className="card"
                  onClick={() => setClickCard('file Details')}
                >
                  <img src={fileImg} alt="card" className="card-img-1" />
                  <p>File</p>
                </div>
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

            {contractData.fileCategory === true && (
              <div
                className="card"
                onClick={() => setClickCard('file_category')}
              >
                <p>
                  WWW/
                  <br />
                  File/
                  <br />
                  Art/
                  <br />
                  Other
                </p>
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

            <SellBox
              contractData={contractData}
              setClickCard={() => setClickCard('put on sale')}
            />

            {contractData.finalizeToken === true && (
              <div className="card">
                <FinalizeToken />
              </div>
            )}
          </div>
        </div>
      )}

      {clickCard === 'stock management' && !clickRemoveItem && (
        <>
          <h2 className="heading">{tokenData.domainName}</h2>

          <div className="stock-management-container">
            {clickAddItem ? (
              <IoIosArrowBack
                className="arrow-icon"
                onClick={() => setClickAddItem(false)}
              />
            ) : clickRemoveItem ? (
              <BsArrowLeftCircle
                className="arrow-icon"
                onClick={() => setClickRemoveItem(false)}
              />
            ) : (
              <BsArrowLeftCircle
                className="arrow-icon"
                onClick={() => setClickCard(null)}
              />
            )}

            {!clickRemoveItem && <h2 className="title">{clickCard}</h2>}

            {clickCard === 'stock management' &&
              !clickAddItem &&
              !clickRemoveItem && (
                <>
                  <div className="stock-management-cards">
                    <div className="stock-management-card">
                      <img src={cardImgSeven} alt="card" />
                      <div
                        className="card-content"
                        style={{ padding: '0 10px' }}
                      >
                        <p className="title">Add new item in shop</p>
                        <p className="desc">
                          Lorem Ipsum has been the industry standard dummy text
                          ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type
                          specimen book.
                        </p>
                        <button onClick={() => setClickAddItem(true)}>
                          Demo
                        </button>
                      </div>
                    </div>
                    <div className="stock-management-card">
                      <img src={cardImgEighth} alt="card" />
                      <div
                        className="card-content"
                        style={{ padding: '0 10px' }}
                      >
                        <p className="title">Remove Item From Shop</p>
                        <p className="desc">
                          Lorem Ipsum has been the industry standard dummy text
                          ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type
                          specimen book.
                        </p>
                        <button onClick={() => setClickRemoveItem(true)}>
                          Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

            {clickCard === 'stock management' && clickAddItem && (
              <div>
                {contractData.pathName === 'my-digital-shop' ? (
                  <AddItem
                    setAddItem={setClickAddItem}
                    setClickCard={setClickCard}
                  />
                ) : (
                  <PhysicalShopForm setClickCard={setClickAddItem} />
                )}
              </div>
            )}
          </div>
        </>
      )}

      {clickCard === 'stock management' && clickRemoveItem && (
        <>
          <div className="removeItem">
            <BsArrowLeftCircle
              className="arrow-icon"
              style={{
                fontSize: '30px',
                cursor: 'pointer',
              }}
              onClick={() => setClickRemoveItem(false)}
            />
            <h2 className="heading">{tokenData.domainName}</h2>
          </div>
          {contractData.pathName === 'my-goods-shop' ? (
            <PhysicalRemoveItem />
          ) : (
            <DigitalRemoveItem />
          )}
        </>
      )}

      {clickCard === 'file Details' && (
        <div className="fileDetailsContent">
          <h2 className="heading">{tokenData.domainName}</h2>
          <h4>File</h4>
          <div className="arrowIcon">
            <BsArrowLeftCircle
              className="arrow-icon"
              style={{
                position: 'absolute',
                top: '40px',
                fontSize: '28px',
                cursor: 'pointer',
              }}
              onClick={() => setClickCard(null)}
            />
          </div>
          <div className="fileContainer">
            <div
              onClick={() => setClickCard('Shipment Address and Details')}
              className="selectFileBox"
            >
              <label htmlFor="file">
                <div className="image">
                  <img src={Folder} alt="" />
                </div>

                <h2 style={{ fontSize: '23px', marginTop: '8px' }}>
                  Select File
                </h2>
              </label>
            </div>

            <div
              className="selectFileBox"
              onClick={() => setClickCard('Select Template')}
            >
              <label htmlFor="file">
                <div className="image">
                  <img src={Folder} alt="" />
                </div>

                <h2 style={{ fontSize: '23px', marginTop: '8px' }}>
                  Select Template
                </h2>
              </label>
            </div>
          </div>
        </div>
      )}

      {clickCard === 'Select Template' && (
        <SelectTemplate tokenData={tokenData} setClickCard={setClickCard} />
      )}

      {clickCard === 'Shipment Address and Details' && (
        <div>
          <h2 className="heading">{tokenData.domainName}</h2>

          <div
            className="appearance-settings-container"
            id="appearance-settings-container"
            style={{ marginTop: '40px' }}
          >
            <h2 className="title">File</h2>
            <File
              contractData={contractData}
              setClickCard={setClickCard}
              contractAddress={contractData.address}
              domainName={tokenData.domainName}
              link={tokenData.link}
            />
          </div>
        </div>
      )}
      {clickCard === 'appearance settings' && (
        <div>
          <h2 className="heading">{tokenData.domainName}</h2>

          <div
            className="appearance-settings-container"
            id="appearance-settings-container"
            style={{ marginTop: '40px' }}
          >
            <h2 className="title">
              {(!clickAddItem && clickCard) || (clickAddItem && clickAddItem)}
            </h2>
            <AppearanceSetting
              setClickCard={setClickCard}
              contractAddress={contractData.address}
            />
          </div>
        </div>
      )}

      {clickCard === 'residual' && (
        <div className="residual-head">
          <div>
            <h2 className="heading">{tokenData.domainName}</h2>
          </div>

          <div>
            <Residual
              setClickCard={setClickCard}
              contractAddress={contractData.address}
            />
          </div>
        </div>
      )}

      {clickCard === 'transfer' && (
        <div>
          <h2 className="heading">{tokenData.domainName}</h2>
          <div className="residual-container">
            <Transfer setClickCard={setClickCard} />
          </div>
        </div>
      )}

      {clickCard === 'put on sale' && (
        <div>
          <h2 className="heading">{tokenData.domainName}</h2>
          <Sell
            contractAddress={contractData.address}
            setClickCard={setClickCard}
          />
        </div>
      )}

      {clickCard === 'file_category' && (
        <FileCategory
          tokenData={tokenData}
          contractAddress={contractData.address}
          setClickCard={setClickCard}
        />
      )}
    </>
  )
}

export default ShopSettingsOne

interface ISell {
  setClickCard: any
  contractData: any
}
const SellBox: React.FC<ISell> = ({ setClickCard, contractData }) => {
  const { address } = useAccount()
  const [haveTo, setHaveTo] = useState(false)

  const [result] = useQuery<{
    shipments: IHaveToSend[]
  }>({
    query: haveToSendQuery,
    variables: {
      owner: address?.toLowerCase(),
    },
    pause: !address || contractData.pathName !== 'my-goods-shop',
  })
  const { data } = result
  console.log(data?.shipments)

  return (
    <>
      {!data?.shipments.length ? (
        <div className="card" onClick={() => setClickCard('put on sale')}>
          <img src={cardImgFive} alt="card" className="card-img-5" />
          <p>Sell</p>
        </div>
      ) : (
        <div className="card" onClick={() => setHaveTo(true)}>
          <img src={cardImgFive} alt="card" className="card-img-5" />
          <p>Sell</p>
        </div>
      )}
      {haveTo && (
        <Modal isOpen={true} handleClose={() => setHaveTo(false)}>
          <p
            style={{
              fontSize: '20px',
              color: 'red',
              textAlign: 'center',
              marginTop: '100px',
            }}
          >
            Please send your pending shipment order to sell your NFT
          </p>
        </Modal>
      )}
    </>
  )
}
