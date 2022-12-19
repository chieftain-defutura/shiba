import React, { useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { IoIosArrowDown } from 'react-icons/io'
import './MarketPlacePage.css'
import CorporateMarketplace from '../../components/CorporateMarketplace'
import GoodsMaretPlace from '../../components/GoodsMarketplace'

const MarketPlacePage: React.FC = () => {
  const [isAccordionActive, setIsAccordionActive] = useState<number | null>(1)
  const [clickDropDown, setClickDropDown] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('Select Currency')

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
          {isAccordionActive === 1 ? (
            <GoodsMaretPlace />
          ) : (
            <CorporateMarketplace />
          )}
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
