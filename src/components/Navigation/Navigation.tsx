import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link, NavLink } from 'react-router-dom'

import { Connector } from '../Connect'
import Modal from '../Model'
import logo from '../../assets/img/logo.png'
import searchIcon from '../../assets/img/search-icon.png'
import './Navigation.css'
import useDebounce from '../../hooks/useDebounce'
import { useQuery } from 'urql'
import { searchDomainHeaderQuery } from '../../constants/query'
import Skeleton from 'react-loading-skeleton'
import { formatAddress } from '../../constants/variants'

const Navigation: React.FC = () => {
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebounce(searchInput, 1000)
  const [result] = useQuery({
    query: searchDomainHeaderQuery,
    variables: { name: debouncedSearchInput },
    pause: !debouncedSearchInput,
  })
  const { fetching, data } = result

  return (
    <div className="navigation-container">
      <div className="container">
        <div className="container-left">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shops</NavLink>
              </li>
              <li>
                <NavLink to="/websites">Websites</NavLink>
              </li>
              <li>
                <NavLink to="/domain-names">Domain Names</NavLink>
              </li>
              <li>
                <NavLink to="/full-on-blockChain-nft">
                  Full On Blockchain NFT
                </NavLink>
              </li>
              <li>
                <NavLink to="/charities">Charities</NavLink>
              </li>
              <li>
                <NavLink to="/marketplace">MarketPlace</NavLink>
              </li>
              <li>
                <NavLink to="/auction">Auction</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container-right">
          <div className="search-box-wrapper">
            <div className="search-box-container">
              <img src={searchIcon} alt="search icon" />
              <input
                type={'search'}
                placeholder="Search by Domain"
                value={searchInput}
                onChange={({ target }) => setSearchInput(target.value)}
              />
            </div>
            {debouncedSearchInput && (
              <div className="search-box-block">
                {fetching ? (
                  <div style={{ padding: '10px' }}>
                    <Skeleton count={3} />
                  </div>
                ) : !data ||
                  Object.keys(data).every((key) => data[key].length === 0) ? (
                  <div style={{ padding: '10px' }}>
                    <p style={{ textAlign: 'center', lineHeight: '100px' }}>
                      No result found
                    </p>
                  </div>
                ) : (
                  <div>
                    {Object.keys(data).map((key) => {
                      return data[key].map((val: any, index: number) => (
                        <div key={index.toString()} className="search-list">
                          <p style={{ color: 'var(--textColorTwo)' }}>
                            {val?.domainName}
                          </p>
                          <p style={{ fontSize: '14px' }}>
                            {formatAddress(val?.owner.id)}
                          </p>
                          {val?.__typename === 'PhysicalShopToken' ? (
                            <Link
                              to={`/shop/goods/${val?.id}`}
                              style={{ fontSize: '12px' }}
                            >
                              {val?.__typename} #{val?.id}
                            </Link>
                          ) : val?.__typename === 'DigitalShopToken' ? (
                            <Link
                              to={`/shop/digital/${val?.id}`}
                              style={{ fontSize: '12px' }}
                            >
                              {val?.__typename} #{val?.id}
                            </Link>
                          ) : (
                            <p style={{ fontSize: '12px' }}>
                              {val?.__typename} #{val?.id}
                            </p>
                          )}
                        </div>
                      ))
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {!address ? (
            <>
              <button className="login-btn" onClick={() => setOpen(true)}>
                Login
              </button>
              <Modal isOpen={open} handleClose={() => setOpen(false)}>
                <Connector />
              </Modal>
            </>
          ) : (
            <div className="address">
              {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
