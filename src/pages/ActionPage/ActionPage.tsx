import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { IoIosArrowDown } from 'react-icons/io'
import './ActionPage.css'
import AuctionSaleCard from '../../components/AuctionSaleCard'
import HeaderNav from '../../components/HeaderNav/HeaderNav'

const API_URL = 'https://api.thegraph.com/subgraphs/name/arunram2000/dapplink'

const ActionPage = () => {
  const { address } = useAccount()
  const [clickDropDown, setClickDropDown] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('Select Currency')
  const [mintData, setMintData] = useState<any[]>([])
  console.log(mintData)
  const handleDropDown = (idx: any) => {
    if (clickDropDown === idx) {
      return setClickDropDown(null)
    }
    setClickDropDown(idx)
  }

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        API_URL,
        {
          query: `
          query{
            auctions(where:{status:"ACTIVE"}){
              id
              tokenId
              auctionId
              owner
              highestBid
              price
              erc20Token{
                id
                symbol
                decimals
              }
              erc721TokenAddress
              status
            }
          }
        `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(data)
      setMintData(data.data.auctions)
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="action-container">
        <div className="action-container-left">
          <h2 className="heading">Auction</h2>
          <div className="accordion-container">
            {accordionData.map((item, idx) => (
              <div key={idx} className="drop-down-container ">
                <div
                  className={
                    clickDropDown === idx
                      ? 'drop-down-header active'
                      : 'drop-down-header'
                  }
                  onClick={() => handleDropDown(idx)}
                >
                  <p>{item?.title}</p>
                  <IoIosArrowDown className="arrow-icon" />
                </div>
                {clickDropDown === idx && (
                  <div
                    className={
                      clickDropDown === idx
                        ? 'drop-down-body active'
                        : 'drop-down-body'
                    }
                  >
                    <div className="check-box-container">
                      {item.labels.map((label, index) => (
                        <div className="checkbox-content" key={index}>
                          <label htmlFor="Human Rights">{label.label}</label>
                          <input id="Human Rights" type="checkbox" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="price-container">
            <p className="title">Price</p>
            <div className="price-content">
              <div className="price-select-cont">
                <IoIosArrowDown className="arrow-icon" />
              </div>
              <div className="check-box-container">
                <label htmlFor="min">MIN</label>
                <input id="min" type="checkbox" />
              </div>
              <div className="check-box-container">
                <label htmlFor="max">Max</label>
                <input id="max" type="checkbox" />
              </div>
            </div>
          </div>
          <div className="currency-container">
            <p className="title">Currency</p>
            <div className="currency-content">
              <div className="currency-select-cont">
                <IoIosArrowDown className="arrow-icon" />
              </div>
            </div>
          </div>
          <div className="sort-container">
            <p className="title">Sort By</p>
            <div className="sort-content">
              <div className="radio-btn-cont">
                <label htmlFor="high-to-low">High To Low</label>
                <input id="high-to-low" name="high-to-low" type="radio" />
                <span></span>
              </div>
              <div className="radio-btn-cont">
                <label htmlFor="Recently-listed">Recently listed</label>
                <input id="Recently-listed" type="radio" />
                <span></span>
              </div>
              <div className="radio-btn-cont">
                <label htmlFor="Ending-soon">Ending soon</label>
                <input id="Ending-soon" type="radio" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="marketplace-container-right">
          <div className="marketplace-container-right-content">
            {mintData.map((f, idx) => (
              <div key={idx}>
                <AuctionSaleCard {...f} />
              </div>
            ))}
          </div>
          <div className="currency-select-container">
            <div className="header">
              <p>{selectedCurrency}</p>
              <IoIosArrowDown className="arrow-icon" />
            </div>
            <div className="body">
              <p onClick={() => setSelectedCurrency('SHI')}>SHI</p>
              <p onClick={() => setSelectedCurrency('LEASH')}>LEASH</p>
              <p onClick={() => setSelectedCurrency('SHIB')}>SHIB</p>
              <p onClick={() => setSelectedCurrency('BONE')}>BONE</p>
              <p onClick={() => setSelectedCurrency('PAW')}>PAW</p>
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ActionPage

const accordionData = [
  {
    title: 'Domain Names',
    labels: [
      { label: 'Human Rights' },
      { label: 'Education' },
      { label: 'Religion' },
      { label: 'Animals' },
      { label: 'Enviorment' },
      { label: 'Health' },
      { label: 'Sport' },
    ],
  },
  {
    title: 'Physical Goods Shop',
    labels: [
      { label: 'Human Rights' },
      { label: 'Education' },
      { label: 'Religion' },
      { label: 'Animals' },
      { label: 'Enviorment' },
      { label: 'Health' },
      { label: 'Sport' },
    ],
  },
  {
    title: 'Digital Goods Shop',
    labels: [
      { label: 'Human Rights' },
      { label: 'Education' },
      { label: 'Religion' },
      { label: 'Animals' },
      { label: 'Enviorment' },
      { label: 'Health' },
      { label: 'Sport' },
    ],
  },
  {
    title: 'Charity Organisation',
    labels: [
      { label: 'Human Rights' },
      { label: 'Education' },
      { label: 'Religion' },
      { label: 'Animals' },
      { label: 'Enviorment' },
      { label: 'Health' },
      { label: 'Sport' },
    ],
  },
  {
    title: 'auctions',
    labels: [
      { label: 'Human Rights' },
      { label: 'Education' },
      { label: 'Religion' },
      { label: 'Animals' },
      { label: 'Enviorment' },
      { label: 'Health' },
      { label: 'Sport' },
    ],
  },
  {
    title: 'Full On Blockchain NFT',
    labels: [{ label: 'ART' }, { label: 'File' }, { label: 'Other' }],
  },
]
