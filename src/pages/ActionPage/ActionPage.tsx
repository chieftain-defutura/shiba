import React, { useMemo, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from 'urql'

import { ArrElement } from '../../constants/types'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import AuctionSaleCard from '../../components/AuctionSaleCard'
import { auctionPageQuery } from '../../constants/query'
import { IAuctionNft } from '../../constants/types'
import Loading from '../../components/Loading/Loading'
import { tokensList } from '../../constants/contract'
import './ActionPage.css'
import { parseUnits } from 'ethers/lib/utils.js'

const getQuery = (orderBy: string, orderDirection: string) => {
  return `query{
    auctions(orderBy:${orderBy},orderDirection:${orderDirection}, where:{status:ACTIVE}){
      id
      tokenId
      auctionId
      owner
      highestBid
      price
      endTime
      erc20Token{
        id
        symbol
        decimals
      }
      erc721TokenAddress
      status
    }
  }
  `
}

const getCurrencyQuery = (erc20Token: string) => {
  return `query{
    auctions(where:{status:ACTIVE,erc20Token:"${erc20Token}"}){
      id
      tokenId
      auctionId
      owner
      highestBid
      price
      endTime
      erc20Token{
        id
        symbol
        decimals
      }
      erc721TokenAddress
      status
    }
  }`
}

const getPriceQuery = (price: string) => {
  return `query{
    auctions(where:{status:ACTIVE,price_gte:"${price}"}){
      id
      tokenId
      auctionId
      owner
      highestBid
      price
      endTime
      erc20Token{
        id
        symbol
        decimals
      }
      erc721TokenAddress
      status
    }
  }`
}

const ActionPage: React.FC = () => {
  const [clickDropDown, setClickDropDown] = useState(null)
  const [isValue, setIsValue] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const [graphQuery, setGraphQuery] = useState(auctionPageQuery)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [open, setOpen] = useState(false)
  const [priceDropDown, setPriceDropDown] = useState(false)
  console.log(maxPrice)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  console.log(dropDown)
  useMemo(() => {
    if (isValue === 'high-to-low')
      return setGraphQuery(getQuery('price', 'desc'))
    if (isValue === 'recently-listed')
      return setGraphQuery(getQuery('startTime', 'desc'))
    if (isValue === 'recently-listed')
      return setGraphQuery(getQuery('endTime', 'desc'))
    return auctionPageQuery
  }, [isValue])

  useMemo(() => {
    if (!selectedDropDown?.address) return auctionPageQuery
    return setGraphQuery(
      getCurrencyQuery(selectedDropDown?.address.toLowerCase()),
    )
  }, [selectedDropDown?.address])

  useMemo(() => {
    if (!minPrice) return auctionPageQuery
    return setGraphQuery(getPriceQuery(parseUnits(minPrice, '18').toString()))
  }, [minPrice])

  const [result] = useQuery<{ auctions: IAuctionNft[] }>({
    query: graphQuery,
  })
  const { data, fetching, error } = result
  console.log(data)

  const handleDropDown = (idx: any) => {
    if (clickDropDown === idx) {
      return setClickDropDown(null)
    }
    setClickDropDown(idx)
  }

  return (
    <div>
      <Navigation />
      <div className="action-container">
        <div className="action-container-left">
          <h2 className="heading">Auction</h2>
          <div className="accordion-container">
            {accordionData.map((item, idx) => (
              <div key={idx} className="drop-down-container">
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
            <div className="price-title" style={{ marginBottom: '20px' }}>
              <p className="title">Price</p>
              <div
                className="price-select-cont"
                onClick={() => setPriceDropDown(!priceDropDown)}
              >
                <IoIosArrowDown className="arrow-icon" />
              </div>
            </div>
            {priceDropDown && (
              <div className="price-content">
                <div className="check-boxs-container">
                  <label htmlFor="min">Min</label>
                  <input
                    id="min"
                    type="number"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div className="check-boxs-container">
                  <label htmlFor="max">Max</label>
                  <input
                    id="max"
                    type="number"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
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

          <div className="sort-container">
            <p className="title" style={{ marginBottom: '15px' }}>
              Sort By
            </p>
            <div className="sort-content">
              <div className="radio-btn-cont">
                <label htmlFor="high-to-low">
                  High To Low
                  <input
                    id="high-to-low"
                    name="sort"
                    type="radio"
                    value="high-to-low"
                    onChange={(e) => setIsValue(e.target.value)}
                  />
                  <span></span>
                </label>

                <label htmlFor="Recently-listed">
                  Recently listed
                  <input
                    id="Recently-listed"
                    name="sort"
                    type="radio"
                    value="recently-listed"
                    onChange={(e) => setIsValue(e.target.value)}
                  />
                  <span></span>
                </label>

                <label htmlFor="Ending-soon">
                  Ending soon
                  <input
                    id="Ending-soon"
                    name="sort"
                    type="radio"
                    value="ending-soon"
                    onChange={(e) => setIsValue(e.target.value)}
                  />
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="marketplace-container-right">
          <div>
            {fetching ? (
              <div className="loading">
                <Loading />
              </div>
            ) : error ? (
              <div className="error-msg">
                <p>something went wrong</p>
              </div>
            ) : !data?.auctions.length ? (
              <div className="error-msg">
                <p>No Result</p>
              </div>
            ) : (
              <div className="marketplace-container-right-content">
                {data?.auctions.map((f, idx) => (
                  <div key={idx}>
                    <AuctionSaleCard {...f} />
                  </div>
                ))}
              </div>
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
                          setDropDown(false)
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
      </div>
      <FooterBottom />
    </div>
  )
}

export default ActionPage

const accordionData = [
  {
    title: 'Domain Names',
    labels: [{ label: '.shib' }],
  },
  {
    title: 'Physical Goods Shop',
    labels: [
      { label: 'Accessories' },
      { label: 'Clothing ' },
      { label: 'Food' },
    ],
  },
  {
    title: 'Digital Goods Shop',
    labels: [
      { label: 'Movies' },
      { label: 'Courses' },
      { label: 'Books' },
      { label: 'Music' },
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
