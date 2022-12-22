import React from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import cardImgSeven from '../../assets/img/card-10.png'
import cardImgEighth from '../../assets/img/card-11.png'
import AddItem from '../AddItem'
import PhysicalShopForm from '../PhysicalShopForm'
import DigitalRemoveItem from '../RemoveItem/DigitalRemoveCard'
import PhysicalRemoveItem from '../RemoveItem/PhysicalRemoveCard'
import { IContractData } from '../../constants/contract'

export type IStockManagement = {
  contractData: IContractData
  clickCard: string
  setClickCard: React.Dispatch<React.SetStateAction<string | null>>
  clickAddItem: boolean
  setClickAddItem: React.Dispatch<boolean>
  clickRemoveItem: boolean
  setClickRemoveItem: React.Dispatch<boolean>
}

const StockManagement: React.FC<IStockManagement> = ({
  contractData,
  clickCard,
  setClickCard,
  clickAddItem,
  setClickAddItem,
  clickRemoveItem,
  setClickRemoveItem,
}) => {
  return (
    <div>
      {contractData.stockManagement === true && (
        <div className="card" onClick={() => setClickCard('stock management')}>
          {/* <img src={cardImgOne} alt="card" className="card-img-1" /> */}
          <p>Stock Management</p>
        </div>
      )}

      {clickCard && (
        <>
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

            {!clickAddItem && !clickRemoveItem && (
              <>
                <div className="stock-management-cards">
                  <div className="stock-management-card">
                    <img src={cardImgSeven} alt="card" />
                    <div className="card-content" style={{ padding: '0 10px' }}>
                      <p className="title">Add new item in shop</p>
                      <p className="desc">
                        Lorem Ipsum has been the industry standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                      <button onClick={() => setClickAddItem(true)}>
                        Demo
                      </button>
                    </div>
                  </div>
                  <div className="stock-management-card">
                    <img src={cardImgEighth} alt="card" />
                    <div className="card-content" style={{ padding: '0 10px' }}>
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
              </>
            )}

            {clickAddItem && (
              <div>
                {contractData.pathName === 'my-digital-shop' ? (
                  <AddItem setAddItem={setClickAddItem} />
                ) : (
                  <PhysicalShopForm setClickCard={setClickAddItem} />
                )}
              </div>
            )}
          </div>
          {clickRemoveItem && (
            <>
              {contractData.pathName === 'my-goods-shop' ? (
                <PhysicalRemoveItem />
              ) : (
                <DigitalRemoveItem />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default StockManagement
