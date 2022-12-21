import React, { useMemo, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { parseUnits } from 'ethers/lib/utils.js'
import { useQuery } from 'urql'

import upVoteIcon from '../../assets/img/up-vote-icon.png'
import downVoteIcon from '../../assets/img/down-vote-icon.png'
import HomeLayout from '../../Layout/HomeLayout'
import { tokensList } from '../../constants/contract'
import { ArrElement } from '../../constants/types'
import { useTransactionModal } from '../../context/TransactionContext'
import { getTokenDecimals } from '../../utils/methods'
import useDebounce from '../../hooks/useDebounce'
import { searchDomainNameQuery } from '../../constants/query'
import { formatAddress } from '../../constants/variants'
import { domainRegex } from '../../lib/helpers'
import './SendCryptoPage.css'

type IOwner = {
  id: string
}

type ITokens = {
  owner: IOwner
}

interface ISearchResult {
  digitalShopTokens: ITokens[]
  domainTokens: ITokens[]
  physicalShopTokens: ITokens[]
}

const SendCryptoPage: React.FC = () => {
  const [dropDown, setDropDown] = useState(false)
  const [amount, setAmount] = useState('')
  const [searchDomain, setSearchDomain] = useState('')
  const { setTransaction } = useTransactionModal()
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const debouncedDomainName = useDebounce(searchDomain, 1000)
  const [toAddressDetails, setToAddressDetails] = useState<{
    address: string
    domainUsedFor: string
    reputation: { good: number; bad: number }
  }>()
  const [selectedToken, setSelectedToken] =
    useState<ArrElement<typeof tokensList>>()
  const [result] = useQuery<ISearchResult>({
    query: searchDomainNameQuery,
    variables: { name: debouncedDomainName },
    pause: !debouncedDomainName || !domainRegex().test(debouncedDomainName),
  })

  const { fetching, data } = result

  useMemo(() => {
    if (!data) return

    if (data.domainTokens.length) {
      if (data.domainTokens[0].owner.id !== ethers.constants.AddressZero) {
        return setToAddressDetails({
          address: data.domainTokens[0].owner.id,
          domainUsedFor: 'Domain is not used yet',
          reputation: { good: 0, bad: 0 },
        })
      }
    }

    if (data.digitalShopTokens.length) {
      return setToAddressDetails({
        address: data.digitalShopTokens[0].owner.id,
        domainUsedFor: 'Digital Shop',
        reputation: { good: 0, bad: 0 },
      })
    }

    if (data.physicalShopTokens.length) {
      return setToAddressDetails({
        address: data.physicalShopTokens[0].owner.id,
        domainUsedFor: 'Physical Shop',
        reputation: { good: 0, bad: 0 },
      })
    }

    return setToAddressDetails(undefined)
  }, [data])

  const handleSend = async () => {
    if (!signerData || !address) return

    if (!selectedToken)
      return setTransaction({
        loading: true,
        status: 'error',
        message: 'Please select a Token',
      })
    if (!toAddressDetails) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const tokenContract = new ethers.Contract(
        selectedToken.address,
        erc20ABI,
        signerData,
      )
      const tx = await tokenContract.transfer(
        toAddressDetails.address,
        parseUnits(
          amount,
          await getTokenDecimals(selectedToken.address, signerData),
        ),
      )
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
        message: `${amount} ${selectedToken.title} Transferred Successfully.`,
      })
      setAmount('')
      setSearchDomain('')
    } catch (error) {
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div>
      <HomeLayout>
        <div className="send-crypto-container">
          <div className="send-crypto-container-right">
            <h2 className="title">Send Crypto</h2>
            <div className="send-container">
              <div className="input-cont">
                <input
                  placeholder="search a domain name..."
                  value={searchDomain}
                  onChange={(e) => setSearchDomain(e.target.value)}
                />
                <FaRegCopy className="copy-icon" />
              </div>
              <div className="select-currency-container">
                <div className="header" onClick={() => setDropDown((d) => !d)}>
                  <p>
                    {!selectedToken ? 'Select Currency' : selectedToken.title}
                  </p>
                  <IoIosArrowDown />
                </div>
                <div className={dropDown ? 'body active' : 'body'}>
                  {tokensList.map((list, index) => (
                    <p
                      key={index.toString()}
                      onClick={() => {
                        setSelectedToken(list)
                        setDropDown(false)
                      }}
                    >
                      {list.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {searchDomain && !domainRegex().test(searchDomain) && (
              <p style={{ color: 'red' }}>Invalid Domain name</p>
            )}
            <div className="send-container">
              <div className="input-cont">
                <input
                  placeholder="enter amount to send"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="send-container">
              <button
                className="send-btn"
                disabled={!toAddressDetails || !amount}
                onClick={() => handleSend()}
              >
                Send
              </button>
            </div>
            <div className="domain-details-cont">
              <div className="detail-left">
                <div>Domain is registered for : </div>
                <div>Domain owner : </div>
                <div>Domain Reputation: </div>
              </div>
              <div className="detail-right">
                <div>
                  {fetching
                    ? 'Loading...'
                    : !toAddressDetails
                    ? 'No matches Found'
                    : toAddressDetails.domainUsedFor}
                </div>
                <div>
                  {fetching
                    ? 'Loading...'
                    : !toAddressDetails
                    ? 'No matches Found'
                    : formatAddress(toAddressDetails.address)}
                </div>
                <div className="vote-cont">
                  <div>
                    {!toAddressDetails ? 0 : toAddressDetails.reputation.good}{' '}
                    <img src={upVoteIcon} alt="up vote" />
                  </div>
                  <div>
                    {!toAddressDetails ? 0 : toAddressDetails.reputation.good}{' '}
                    <img src={downVoteIcon} alt="down vote" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default SendCryptoPage
