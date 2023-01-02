import React, { useMemo, useState, ChangeEvent, useEffect, useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from 'urql'
import { AnimatePresence, motion } from 'framer-motion'
import autoAnimate from '@formkit/auto-animate'

import { ArrElement } from 'constants/types'
import FooterBottom from 'components/FooterBottom/index'
import AuctionSaleCard from 'components/AuctionSaleCard'
import { auctionPageQuery } from 'constants/query'
import { IAuctionNft } from 'constants/types'
import { tokensList } from 'constants/contract'
import { parseUnits } from 'ethers/lib/utils.js'
import { formatTokenUnits } from 'utils/formatters'
import {
  ART_NFT_CONTRACT_ADDRESS,
  CHARITIES_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import './AuctionPage.css'
import CardLoading from 'components/Loading/CardLoading'

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

const NftTokenQuery = `query($erc721TokenAddress:[String!]!){
    auctions(where:{status:ACTIVE,erc721TokenAddress_in:$erc721TokenAddress}){
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

const AuctionPage: React.FC = () => {
  const [isValue, setIsValue] = useState('')
  const [graphQuery, setGraphQuery] = useState(auctionPageQuery)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [filteredResult, setFilteredResult] = useState<IAuctionNft[]>([])
  const [rawResult, setRawResult] = useState<IAuctionNft[]>([])
  const [nftFilter, setNftFilter] = useState<string[]>([])
  const [priceDropDown, setPriceDropDown] = useState(false)
  const [currencyDropDown, setCurrencyDropDown] = useState(false)
  console.log(maxPrice)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  console.log(nftFilter)
  useMemo(() => {
    if (isValue === 'high-to-low')
      return setGraphQuery(getQuery('price', 'desc'))
    if (isValue === 'recently-listed')
      return setGraphQuery(getQuery('startTime', 'desc'))
    if (isValue === 'recently-listed')
      return setGraphQuery(getQuery('endTime', 'desc'))
    return auctionPageQuery
  }, [isValue])

  // currency
  useMemo(() => {
    if (!selectedDropDown?.address) return auctionPageQuery
    return setGraphQuery(
      getCurrencyQuery(selectedDropDown?.address.toLowerCase()),
    )
  }, [selectedDropDown?.address])

  //price
  useMemo(() => {
    if (!minPrice) return auctionPageQuery
    return setGraphQuery(getPriceQuery(parseUnits(minPrice, '18').toString()))
  }, [minPrice])

  const [result] = useQuery<{ auctions: IAuctionNft[] }>({
    query: graphQuery,
  })
  const { data, fetching, error } = result
  console.log(data)

  const [nftFilterResult] = useQuery<{ auctions: IAuctionNft[] }>({
    query: NftTokenQuery,
    variables: {
      erc721TokenAddress: nftFilter,
    },
    pause: !nftFilter.length,
  })
  const {
    data: nftFilteredData,
    fetching: nftFilterFetching,
    error: nftFilteredError,
  } = nftFilterResult
  console.log(rawResult)

  useMemo(() => {
    if (!data) return
    setFilteredResult(data.auctions)
    setRawResult(data.auctions)
  }, [data])

  useMemo(() => {
    if (!maxPrice) return

    setFilteredResult(
      rawResult.filter(
        (f) => Number(formatTokenUnits(f.price, '18')) <= Number(maxPrice),
      ),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice])

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (nftFilter.includes(value.toLowerCase())) {
      setNftFilter((f) =>
        f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
      )
    } else {
      setNftFilter((f) => f.concat(value.toLowerCase()))
    }
  }

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  //toggle dropDown

  const priceToggle = () => {
    setPriceDropDown((priceDropDown) => !priceDropDown)
  }
  const priceToggleClassCheck = priceDropDown ? 'active' : 'price-select-cont'

  const currencyToggle = () => {
    setCurrencyDropDown((currencyDropDown) => !currencyDropDown)
  }
  const currencyToggleClassCheck = currencyDropDown
    ? 'active'
    : 'currency-select-cont'

  return (
    <div>
      <div className="action-container">
        <div className="action-container-left">
          <h2 className="heading">Auction</h2>
          <div className="accordion-container">
            {accordionData.map((item, idx) => (
              <div key={idx} className="drop-down-container">
                <div className={'drop-down-header'}>
                  <div className="drop-down-title">
                    <p>{item?.title}</p>
                  </div>
                  <div
                    className="check-box-container"
                    style={{ width: 0, margin: 0 }}
                  >
                    <input
                      id="Human Rights"
                      type="checkbox"
                      value={item.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="price-container">
            <div
              className="price-title"
              onClick={() => setPriceDropDown(!priceDropDown)}
              style={{ marginBottom: '20px' }}
            >
              <p className="title">Price</p>
              <div
                className={`price-select-cont ${priceToggleClassCheck}`}
                onClick={priceToggle}
              >
                <IoIosArrowDown className="arrow-icon" />
              </div>
            </div>
            <div ref={parent}>
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
          </div>
          <div className="currency-container">
            <div
              className="price-title"
              onClick={() => setCurrencyDropDown(!currencyDropDown)}
            >
              <p className="title">Currency</p>

              <div
                className={`currency-select-cont ${currencyToggleClassCheck}`}
                onClick={currencyToggle}
              >
                <IoIosArrowDown className="arrow-icon" />
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
            {fetching || nftFilterFetching ? (
              <div>
                <CardLoading />
              </div>
            ) : error || nftFilteredError ? (
              <div className="error-msg">
                <p>something went wrong</p>
              </div>
            ) : !filteredResult.length ? (
              <div className="error-msg">
                <p>No Result Found</p>
              </div>
            ) : (
              <>
                {nftFilter.length <= 0 ? (
                  <div className="marketplace-container-right-content">
                    {filteredResult.map((f, idx) => (
                      <div key={idx}>
                        <AuctionSaleCard {...f} />
                      </div>
                    ))}
                  </div>
                ) : !nftFilteredData?.auctions.length ? (
                  <div className="error-msg">
                    <p>No Result Found</p>
                  </div>
                ) : (
                  <div className="marketplace-container-right-content">
                    {nftFilteredData?.auctions.map((f, idx) => (
                      <div key={idx}>
                        <AuctionSaleCard {...f} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            <AnimatePresence>
              {currencyDropDown && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default AuctionPage

const accordionData = [
  {
    title: 'Domain Names',
    address: DOMAIN_NFT_CONTRACT_ADDRESS,
    labels: [{ label: '.shib' }],
  },
  {
    title: 'Physical Goods Shop',
    address: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
    labels: [
      { label: 'Accessories' },
      { label: 'Clothing ' },
      { label: 'Food' },
    ],
  },
  {
    title: 'Digital Goods Shop',
    address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    labels: [
      { label: 'Movies' },
      { label: 'Courses' },
      { label: 'Books' },
      { label: 'Music' },
    ],
  },
  {
    title: 'Charity Organisation',
    address: CHARITIES_NFT_CONTRACT_ADDRESS,
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
    address: MARKETPLACE_CONTRACT_ADDRESS,
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
    address: ART_NFT_CONTRACT_ADDRESS,
    labels: [{ label: 'ART' }, { label: 'File' }, { label: 'Other' }],
  },
]
