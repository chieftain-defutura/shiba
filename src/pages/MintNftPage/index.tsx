import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useContractReads, erc20ABI, useAccount, useSigner } from 'wagmi'
import { useAppSelector } from '../../store/store'

import {
  DIGITAL_GOOD_SHOP,
  PHYSICAL_GOODS_SHOP,
  WEBSITE,
  CHARITY,
  UNATTACHED_DOMAIN_NAME,
  NFT_ART,
} from '../../constants'
import './MintNftPage.css'
import {
  DOMAIN_NFT_CONTRACT_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
  CHARITIES_NFT_CONTRACT_ADDRESS,
  ART_NFT_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import domainABI from 'utils/abi/domainABI.json'
import { useTransactionModal } from 'context/TransactionContext'
import { mintDomainNft, mintNft } from 'utils/methods'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from 'utils/messaging'
import { domainRegex, getDomainNamePrice } from 'lib/helpers'

interface IContractData {
  title: string
  contractAddress: string
  tokenAddress?: string
  allowance?: number
}

const ContractData = [
  {
    title: UNATTACHED_DOMAIN_NAME,
    contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
    tokenAddress: PAW_TOKEN_ADDRESS,
    allowance: 0,
  },
  {
    title: DIGITAL_GOOD_SHOP,
    contractAddress: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    tokenAddress: SHIB_TOKEN_ADDRESS,
    allowance: 0,
  },
  {
    title: PHYSICAL_GOODS_SHOP,
    contractAddress: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
    tokenAddress: LEASH_TOKEN_ADDRESS,
    allowance: 0,
  },
  {
    title: WEBSITE,
    contractAddress: WEBSITE_NFT_CONTRACT_ADDRESS,
  },
  {
    title: CHARITY,
    contractAddress: CHARITIES_NFT_CONTRACT_ADDRESS,
  },
  {
    title: NFT_ART,
    contractAddress: ART_NFT_CONTRACT_ADDRESS,
  },
]

const GetTld = {
  address: DOMAIN_NFT_CONTRACT_ADDRESS,
  abi: domainABI,
}
const pawAllownaceData = {
  address: PAW_TOKEN_ADDRESS,
  abi: erc20ABI,
}
const shibAllownaceData = {
  address: SHIB_TOKEN_ADDRESS,
  abi: erc20ABI,
}
const leashAllownaceData = {
  address: LEASH_TOKEN_ADDRESS,
  abi: erc20ABI,
}

const MintNftPage: React.FC = () => {
  const { setTransaction, loading } = useTransactionModal()
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const [isDropDownClick, setIsDropDownClick] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedNftType, setSelectedNftType] = useState<
    IContractData | undefined
  >()
  const [selected, setSelected] = useState('')
  const [NftContractData, setIsNftContractData] =
    useState<IContractData[]>(ContractData)
  const [domainName, setDomainName] = useState('')
  const [connectToExistingDomain, setConnectExistingDomain] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [selectDomain, setSelectDomain] = useState('')
  const user = useAppSelector((store) => store.user)
  const [userDomainNfts, setUserDomainNfts] = useState<
    { tokenId: string; name: string }[]
  >([])

  const pawAmount = useMemo(() => {
    if (!domainName.length) return 0
    return getDomainNamePrice(domainName)
  }, [domainName])

  const domainError = useMemo(() => {
    const isValid = domainRegex().test(domainName.concat(selected))
    return isValid ? null : 'Invalid domain name'
  }, [domainName, selected])

  const { data } = useContractReads({
    contracts: [
      {
        ...GetTld,
        functionName: 'getTld',
      },
      {
        ...pawAllownaceData,
        functionName: 'allowance',
        args: [address as any, DOMAIN_NFT_CONTRACT_ADDRESS],
      },
      {
        ...shibAllownaceData,
        functionName: 'allowance',
        args: [address as any, DIGITAL_GOODS_NFT_CONTRACT_ADDRESS],
      },
      {
        ...leashAllownaceData,
        functionName: 'allowance',
        args: [address as any, PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS],
      },
    ],
  })

  const domainData: string[] = useMemo(() => {
    return (data?.[0] as string[]) ?? []
  }, [data])

  useEffect(() => {
    if (domainData.length) setSelected(domainData[0])
  }, [domainData])

  const handleGetUserNft = useCallback(async () => {
    try {
      if (!address || !signerData) return
      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=0x5&token_addresses=${DOMAIN_NFT_CONTRACT_ADDRESS}`,
        {
          headers: {
            'X-API-KEY': process.env.REACT_APP_MORALIS_API_KEY,
          },
        },
      )

      const result = await Promise.all(
        data.result.map(async (r: any) => {
          const contract = new ethers.Contract(
            DOMAIN_NFT_CONTRACT_ADDRESS,
            domainABI,
            signerData,
          )
          return {
            tokenId: r.token_id,
            name: await contract.getDomainName(r.token_id),
          }
        }),
      )
      setUserDomainNfts(result)
    } catch (error) {
      console.log(error)
    }
  }, [address, signerData])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])

  useEffect(() => {
    if (!data) return
    const NewNftContractData = [...NftContractData]
    NewNftContractData[0].allowance = Number(data[1]?.toString())
    NewNftContractData[1].allowance = Number(data[2]?.toString())
    NewNftContractData[2].allowance = Number(data[3]?.toString())
    setIsNftContractData(NewNftContractData)
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [data])

  useMemo(() => {
    if (!selectedOption) return

    const contractdata = NftContractData.find((f) => f.title === selectedOption)
    setSelectedNftType(contractdata)

    if (selectedOption === UNATTACHED_DOMAIN_NAME)
      setConnectExistingDomain(false)

    if (selectedOption !== UNATTACHED_DOMAIN_NAME)
      setConnectExistingDomain(true)
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [selectedOption])

  useMemo(() => {
    if (!selectedNftType) return
    if (selectedNftType?.title === UNATTACHED_DOMAIN_NAME)
      return setPrice(Number(pawAmount))
    if (selectedNftType?.title === PHYSICAL_GOODS_SHOP)
      return setPrice(Number('1000000'.toString()))
    if (selectedNftType?.title === DIGITAL_GOOD_SHOP)
      return setPrice(Number('0.02'.toString()))
  }, [selectedNftType])
  const canShowCreateButton = useMemo(() => {
    if (!selectedNftType) {
      return true
    }

    console.log(price)

    // eslint-disable-next-line no-prototype-builtins
    if (!selectedNftType.hasOwnProperty('tokenAddress')) {
      return true
    }

    if (selectedNftType?.allowance === 0) return false
    return true
  }, [selectedNftType])

  const errorMessage = useMemo(() => {
    if (!selectedNftType) return

    if (selectedNftType.title === UNATTACHED_DOMAIN_NAME) {
      if (!domainName) return 'please enter a domain name'

      return undefined
    }

    if (!selectDomain) return 'please select a existing domain'

    return undefined
  }, [selectedNftType, selectDomain, domainName])

  const handleApproveToken = async () => {
    try {
      if (!selectedNftType?.tokenAddress || !signerData) return

      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const nftContract = new ethers.Contract(
        selectedNftType.tokenAddress,
        erc20ABI,
        signerData,
      )
      const tx = await nftContract.approve(
        selectedNftType.contractAddress,
        ethers.constants.MaxUint256,
      )
      await tx.wait()

      setSelectedNftType((d) =>
        d
          ? { ...d, allowance: Number(ethers.constants.MaxUint256.toString()) }
          : undefined,
      )

      setTransaction({
        loading: true,
        status: 'success',
        message: SUCCESS_MESSAGE,
      })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const mintButton = async () => {
    try {
      if (!selectedNftType) return
      console.log(selectedNftType)

      if (
        selectedNftType.tokenAddress &&
        user[selectedNftType.tokenAddress.toLowerCase()] < price
      )
        return setTransaction({
          loading: true,
          status: 'error',
          message: 'Insufficient balance',
        })

      if (selectedNftType?.title === UNATTACHED_DOMAIN_NAME) {
        setTransaction({ loading: true, status: 'pending' })
        await mintDomainNft(domainName, selected, signerData)
        setTransaction({ loading: true, status: 'success' })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        return
      }

      setTransaction({ loading: true, status: 'pending' })
      await mintNft(selectDomain, selectedNftType.contractAddress, signerData)
      setTransaction({ loading: true, status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error: any) {
      console.log(error.reason)
      setTransaction({ loading: true, status: 'error', message: error.reason })
    }
  }

  return (
    <div>
      <div className="mint-nft-container">
        <div className="mint-nft-container-right">
          <h2 className="heading">Mint NFT</h2>
          <div className="box-1">
            <div className="box-left">
              <p className="title">Please Select NFT token type:</p>
              <div className="content-container">
                <div className="content-title">
                  <p className="title">Total LEASH cost:</p>
                  <p className="title">Total SHIB cost:</p>
                </div>
                <div className="content-input">
                  <input readOnly value={0.02} />
                  <input readOnly value={1000000} />
                </div>
              </div>
            </div>
            <div className="box-right">
              <div
                className="custom-drop-down"
                onClick={() => setIsDropDownClick(!isDropDownClick)}
              >
                {selectedOption}
                <MdKeyboardArrowDown className="arrow-icon" />
              </div>
              <div
                className={
                  isDropDownClick
                    ? 'drop-down-content active'
                    : 'drop-down-content'
                }
              >
                {ContractData.map((list, index) => (
                  <p
                    key={index.toString()}
                    onClick={() => {
                      setSelectedOption(list.title)
                      setIsDropDownClick(false)
                    }}
                  >
                    {list.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="box-2" style={{ marginLeft: '65px' }}>
            <div className="box-left">
              <p className="title">Connect to:</p>
              <div className="content-container">
                <div className="content-title">
                  <div
                    className="left"
                    onClick={() => setConnectExistingDomain(false)}
                    style={{
                      pointerEvents:
                        selectedOption &&
                        selectedOption !== UNATTACHED_DOMAIN_NAME
                          ? 'none'
                          : 'initial',
                      opacity:
                        selectedOption &&
                        selectedOption !== UNATTACHED_DOMAIN_NAME
                          ? '0.8'
                          : '1',
                    }}
                  >
                    <div
                      className={
                        connectToExistingDomain ? 'circle' : 'circle active'
                      }
                    ></div>
                    <p className="title">New Domain Name:</p>
                  </div>
                  <div
                    className="left"
                    onClick={() => setConnectExistingDomain(true)}
                    style={{
                      pointerEvents:
                        selectedOption === UNATTACHED_DOMAIN_NAME
                          ? 'none'
                          : 'initial',
                      opacity:
                        selectedOption === UNATTACHED_DOMAIN_NAME ? '0.8' : '1',
                    }}
                  >
                    <div
                      className={
                        connectToExistingDomain ? 'circle active' : 'circle'
                      }
                    ></div>
                    <p className="title">Existing Domain Name:</p>
                  </div>
                </div>
                <div className="content-input">
                  <div className="right">
                    <input
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder="shoesboutique"
                      value={domainName}
                      style={{
                        pointerEvents: connectToExistingDomain
                          ? 'none'
                          : 'initial',
                        opacity: connectToExistingDomain ? '0.8' : '1',
                        color: 'white',
                      }}
                    />
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelected(e.target.value)}
                      style={{
                        pointerEvents: connectToExistingDomain
                          ? 'none'
                          : 'initial',
                        opacity: connectToExistingDomain ? '0.8' : '1',
                      }}
                    >
                      {domainData.map((f, index) => {
                        return (
                          <option key={index} value={f}>
                            {f}
                          </option>
                        )
                      })}
                    </select>
                    {selectedOption &&
                      (selectedOption === UNATTACHED_DOMAIN_NAME ||
                        (selectedOption !== UNATTACHED_DOMAIN_NAME &&
                          !connectToExistingDomain)) &&
                      domainError && (
                        <p style={{ color: 'red', fontSize: '16px' }}>
                          {domainError}
                        </p>
                      )}
                  </div>

                  <div className="right-2">
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelectDomain(e.target.value)}
                      style={{
                        width: '100%',
                        pointerEvents:
                          selectedOption === UNATTACHED_DOMAIN_NAME ||
                          !connectToExistingDomain
                            ? 'none'
                            : 'initial',
                        opacity:
                          selectedOption === UNATTACHED_DOMAIN_NAME ||
                          !connectToExistingDomain
                            ? '0.8'
                            : '1',
                      }}
                    >
                      <option value="">please select</option>
                      {userDomainNfts.map((f, index) => {
                        return (
                          <option key={index} value={f.tokenId}>
                            {f.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="domain-error">
            {errorMessage ? (
              <div style={{ color: 'red' }}>{errorMessage}</div>
            ) : (
              ''
            )}
          </div>
          <div className="box-3">
            <div className="box-left">
              <div className="content">
                <p className="title">Total PAW cost:</p>
                <input value={pawAmount} readOnly />
              </div>
            </div>

            <div className="box-right">
              {!canShowCreateButton ? (
                <button onClick={() => handleApproveToken()}>Approve</button>
              ) : (
                <button
                  className="btn-mint"
                  onClick={() => {
                    mintButton()
                  }}
                  disabled={loading || !!errorMessage}
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintNftPage
