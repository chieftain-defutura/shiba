import React, { useState, ChangeEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import CorporateMarketplace from '../../components/CorporateMarketplace'
import GoodsMaretPlace from '../../components/GoodsMarketplace'
import { ArrElement } from '../../constants/types'
import { tokensList } from '../../constants/contract'
import { useQuery } from 'urql'
import './MarketPlacePage.css'
import { parseUnits } from 'ethers/lib/utils.js'
import useDebounce from '../../hooks/useDebounce'
import {
  BONE_TOKEN_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from '../../utils/contractAddress'

const getGoodsDigitalQuery = `query($category: [String!], $price:String!,$erc20Token:[String!]){
  digitalItems( where:{status:ACTIVE, category_in:$category ,price_gte:$price, erc20Token_in:$erc20Token}){
    id
    category
    shopDetails {
      id
    }
    subcategory
    metadata
    price
    status
    erc20Token{
      id
      symbol
      decimals
    }
  
  }
}`

const getGoodsPhysicalQuery = `query($category: [String!]!, $price:String!,$erc20Token:[String!]){
  physicalItems( where:{status:ACTIVE, category_in:$category, price_gte:$price, erc20Token_in:$erc20Token}){
    id
    category
    shopDetails {
      id
    }
    subcategory
    metadata
    quantity
    price
    status
    erc20Token{
      id
      symbol
      decimals
    }
  
  }
}`

const MarketPlacePage: React.FC = () => {
  const [isAccordionActive, setIsAccordionActive] = useState<number | null>(1)
  const [clickDropDown, setClickDropDown] = useState<string | null>(null)
  const [goodsCheckboxs, setGoodsCheckBox] = useState<string[]>([])
  const [corporateCheckboxs, setCorporateCheckBox] = useState<string[]>([])
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')
  const debouncedDomainName = useDebounce(minValue, 1000)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  const [open, setOpen] = useState(false)
  console.log(goodsCheckboxs)
  console.log(setCorporateCheckBox)
  const [goodsDigitalResult] = useQuery({
    query: getGoodsDigitalQuery,
    variables: {
      category: goodsCheckboxs,
      price: parseUnits(
        !debouncedDomainName ? '0' : debouncedDomainName,
        '18',
      ).toString(),
      erc20Token: selectedDropDown?.address.toLowerCase()
        ? [selectedDropDown.address.toLowerCase()]
        : [
            SHIB_TOKEN_ADDRESS.toLowerCase(),
            SHI_TOKEN_ADDRESS.toLowerCase(),
            LEASH_TOKEN_ADDRESS.toLowerCase(),
            PAW_TOKEN_ADDRESS.toLowerCase(),
            BONE_TOKEN_ADDRESS.toLowerCase(),
          ],
    },
    pause: !goodsCheckboxs.length,
  })
  const { data: goodsDigitalData } = goodsDigitalResult

  const [goodsPhysicalResult] = useQuery({
    query: getGoodsPhysicalQuery,
    variables: {
      category: goodsCheckboxs,
      price:
        parseUnits(
          !debouncedDomainName ? '0' : debouncedDomainName,
          '18',
        ).toString() || !debouncedDomainName,
      erc20Token: selectedDropDown?.address.toLowerCase()
        ? [selectedDropDown.address.toLowerCase()]
        : [
            SHIB_TOKEN_ADDRESS.toLowerCase(),
            SHI_TOKEN_ADDRESS.toLowerCase(),
            LEASH_TOKEN_ADDRESS.toLowerCase(),
            PAW_TOKEN_ADDRESS.toLowerCase(),
            BONE_TOKEN_ADDRESS.toLowerCase(),
          ],
    },
    pause: !goodsCheckboxs.length,
  })
  const { data: goodsPhysicalData } = goodsPhysicalResult

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (goodsCheckboxs.includes(value.toLowerCase())) {
      setGoodsCheckBox((f) =>
        f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
      )
    } else {
      setGoodsCheckBox((f) => f.concat(value.toLowerCase()))
    }
  }

  // const handleCorporateChange = ({
  //   target: { value },
  // }: ChangeEvent<HTMLInputElement>) => {
  //   if (corporateCheckboxs.includes(value.toLowerCase())) {
  //     setCorporateCheckBox((f) =>
  //       f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
  //     )
  //   } else {
  //     setCorporateCheckBox((f) => f.concat(value.toLowerCase()))
  //   }
  // }

  console.log(corporateCheckboxs)

  const handleDropDown = (item: any) => {
    if (clickDropDown === item.title) {
      return setClickDropDown(null)
    }
    setGoodsCheckBox([])
    setClickDropDown(item.title)
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
                    clickDropDown === item.title
                      ? 'drop-down-header active'
                      : 'drop-down-header'
                  }
                  onClick={() =>
                    isAccordionActive === 1 && handleDropDown(item)
                  }
                >
                  <p>{item?.title}</p>
                  <IoIosArrowDown className="arrow-icon" />
                </div>
                {clickDropDown === item.title && (
                  <div
                    className={
                      clickDropDown === item.title
                        ? 'drop-down-body active'
                        : 'drop-down-body'
                    }
                  >
                    <div className="check-box-container">
                      {item.labels.map((label, index) => (
                        <div className="checkbox-content" key={index}>
                          <label htmlFor="Human Rights">{label.label}</label>
                          <input
                            id="Human Rights"
                            type="checkbox"
                            value={label.label}
                            onChange={handleChange}
                          />
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
              {corpoteAccordionData.map((item, idx) => (
                <div
                  key={idx}
                  className={
                    clickDropDown === item.title
                      ? 'drop-down-header active'
                      : 'drop-down-header'
                  }
                  onClick={() =>
                    isAccordionActive === 2 && handleDropDown(item)
                  }
                >
                  <p>{item.title}</p>
                  <div
                    className="check-box-container"
                    style={{ width: 0, margin: 0 }}
                  >
                    <input
                      id="Human Rights"
                      type="checkbox"
                      value={item.address}
                      onChange={handleCorporateChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="price-container">
            <div className="price-title">
              <p className="title">Price</p>
              <div className="price-select-cont">
                <IoIosArrowDown className="arrow-icon" />
              </div>
            </div>

            <div className="price-content">
              <div className="check-boxs-container">
                <div>
                  <label htmlFor="min">MIN</label>
                </div>
                <div>
                  <input
                    id="min"
                    type="text"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="check-boxs-container">
                <div>
                  <label htmlFor="max">Max</label>
                </div>
                <div>
                  <input
                    id="max"
                    type="text"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="currency-container">
            <div className="price-title">
              <p className="title">Currency</p>
              <div className="currency-content">
                <div
                  className="currency-select-cont"
                  onClick={() => setOpen(!open)}
                >
                  <IoIosArrowDown className="arrow-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="marketplace-container-right">
          {isAccordionActive === 1 ? (
            <GoodsMaretPlace
              digitalData={goodsDigitalData}
              physicalData={goodsPhysicalData}
              clickDropDown={clickDropDown}
              goodsCheckBox={goodsCheckboxs}
              debouncedDomainName={debouncedDomainName}
              selectedDropDown={selectedDropDown?.address.toLowerCase()}
            />
          ) : (
            <CorporateMarketplace
              goodsCheckBox={corporateCheckboxs}
              selectedDropDown={selectedDropDown}
              debouncedDomainName={debouncedDomainName}
            />
          )}
          {open && (
            <div className="currency-select-container">
              <div className="header">
                <p>{selectedDropDown?.title}</p>
                <IoIosArrowDown className="arrow-icon" />
              </div>
              <div className="body">
                {tokensList.map((f, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedDropDown(f)
                      }}
                    >
                      {f.title}
                    </p>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default MarketPlacePage

const accordionData = [
  // {
  //   title: 'Domain Names',
  //   labels: [{ label: '.shib' }],
  // },
  {
    title: 'Physical Goods',
    labels: [
      { label: 'Accessories' },
      { label: 'Clothing' },
      { label: 'Food' },
    ],
  },
  {
    title: 'Digital Goods',
    labels: [
      { label: 'Movies' },
      { label: 'Courses' },
      { label: 'Books' },
      { label: 'Music' },
    ],
  },
  // {
  //   title: 'Websites',
  //   labels: [
  //     { label: 'Human Rights' },
  //     { label: 'Education' },
  //     { label: 'Religion' },
  //     { label: 'Animals' },
  //     { label: 'Enviorment' },
  //     { label: 'Health' },
  //     { label: 'Sport' },
  //   ],
  // },
  // {
  //   title: 'Full On Blockchain NFT',
  //   labels: [
  //     { label: 'Human Rights' },
  //     { label: 'Education' },
  //     { label: 'Religion' },
  //     { label: 'Animals' },
  //     { label: 'Enviorment' },
  //     { label: 'Health' },
  //     { label: 'Sport' },
  //   ],
  // },
  // {
  //   title: 'Charites',
  //   labels: [
  //     { label: 'Human Rights' },
  //     { label: 'Education' },
  //     { label: 'Religion' },
  //     { label: 'Animals' },
  //     { label: 'Enviorment' },
  //     { label: 'Health' },
  //     { label: 'Sport' },
  //   ],
  // },
]

const corpoteAccordionData = [
  {
    title: 'Physical Goods Shop',
    address: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  },
  {
    title: 'Digital Goods Shop',
    address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  },
  // {
  //   title: 'Charity Organisation',
  //   address: CHARITIES_NFT_CONTRACT_ADDRESS,
  // },
]
