import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import axios from 'axios'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
import { IoIosArrowDown } from 'react-icons/io'
import './MarketPlacePage.css'
import { formatEther } from 'ethers/lib/utils.js'
import FixedSaleCard from '../../components/FixedSaleCard'

const API_URL = 'https://api.thegraph.com/subgraphs/name/arunram2000/dapplink'

const MarketPlacePage = () => {
  const { address } = useAccount()
  const [isAccordionActive, setIsAccordionActive] = useState<number | null>(1)
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

  const handleAccordionActive = (idx: any) => {
    if (isAccordionActive === idx) {
      return setIsAccordionActive(null)
    }
    setIsAccordionActive(idx)
  }

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address) return
      const { data } = await axios.post(
        API_URL,
        {
          query: `
          query {
            fixedSales(where:{status:"ACTIVE"}){
            id
            auctionId
            tokenId
            price
            erc20TokenAddress
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
      setMintData(data.data.fixedSales)
      console.log(data.data.fixedSales)
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
      <div className="marketplace-container">
        <div className="marketplace-container-left">
          <h2 className="heading">MarketPlace</h2>
          <div className="accordion-container">
            <div
              className="accordion-header"
              onClick={() => handleAccordionActive(1)}
            >
              <h3 className="title">Goods Marketplace</h3>
              <div className="circle">
                {isAccordionActive === 1 && <span></span>}
              </div>
            </div>
            {accordionData.map((item, idx) => (
              <div
                key={idx}
                className={
                  isAccordionActive === 1
                    ? 'drop-down-container '
                    : 'drop-down-container active'
                }
              >
                <div
                  className={
                    clickDropDown === idx
                      ? 'drop-down-header active'
                      : 'drop-down-header'
                  }
                  onClick={() => isAccordionActive === 1 && handleDropDown(idx)}
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
          <div className="accordion-container">
            <div
              className="accordion-header"
              onClick={() => handleAccordionActive(2)}
            >
              <h3 className="title">Corporate Marketplace</h3>
              <div className="circle">
                {isAccordionActive === 2 && <span></span>}
              </div>
            </div>
            <div
              className={
                isAccordionActive === 2
                  ? 'drop-down-container'
                  : 'drop-down-container active'
              }
            >
              <div
                className={
                  clickDropDown === 6
                    ? 'drop-down-header active'
                    : 'drop-down-header'
                }
                onClick={() => isAccordionActive === 2 && handleDropDown(6)}
              >
                <p>Physical Goods Shop</p>
                <IoIosArrowDown className="arrow-icon" />
              </div>
              {clickDropDown === 6 && (
                <div
                  className={
                    clickDropDown === 6
                      ? 'drop-down-body active'
                      : 'drop-down-body'
                  }
                >
                  <div className="check-box-container">
                    <div className="checkbox-content">
                      <label htmlFor="Human Rights">Human Rights</label>
                      <input id="Human Rights" type="checkbox" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                isAccordionActive === 2
                  ? 'drop-down-container'
                  : 'drop-down-container active'
              }
            >
              <div
                className={
                  clickDropDown === 7
                    ? 'drop-down-header active'
                    : 'drop-down-header'
                }
                onClick={() => isAccordionActive === 2 && handleDropDown(7)}
              >
                <p>Digital Goods Shop</p>
                <IoIosArrowDown className="arrow-icon" />
              </div>
              {clickDropDown === 7 && (
                <div
                  className={
                    clickDropDown === 7
                      ? 'drop-down-body active'
                      : 'drop-down-body'
                  }
                >
                  <div className="check-box-container">
                    <div className="checkbox-content">
                      <label htmlFor="Human Rights">Human Rights</label>
                      <input id="Human Rights" type="checkbox" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                isAccordionActive === 2
                  ? 'drop-down-container'
                  : 'drop-down-container active'
              }
            >
              <div
                className={
                  clickDropDown === 8
                    ? 'drop-down-header active'
                    : 'drop-down-header'
                }
                onClick={() => isAccordionActive === 2 && handleDropDown(8)}
              >
                <p>Charity Organisation</p>
                <IoIosArrowDown className="arrow-icon" />
              </div>
              {clickDropDown === 8 && (
                <div
                  className={
                    clickDropDown === 8
                      ? 'drop-down-body active'
                      : 'drop-down-body'
                  }
                >
                  <div className="check-box-container">
                    <div className="checkbox-content">
                      <label htmlFor="Human Rights">Human Rights</label>
                      <input id="Human Rights" type="checkbox" />
                    </div>
                  </div>
                </div>
              )}
            </div>
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
        </div>
        <div className="marketplace-container-right">
          <div className="marketplace-container-right-content">
            {mintData.map((f, idx) => (
              <div key={idx}>
                <FixedSaleCard {...f} />
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

export default MarketPlacePage

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
    title: 'Digital Goods',
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
    title: 'Physical Goods',
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
    title: 'Websites',
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
    title: 'Charites',
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
]