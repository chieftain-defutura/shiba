import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useContractReads, erc20ABI, useAccount, useSigner } from 'wagmi'

import HeaderNav from '../../components/HeaderNav/HeaderNav'
import Navigation from '../../components/Navigation/Navigation'
import {
  DIGITAL_GOOD_SHOP,
  PHYSICAL_GOODS_SHOP,
  WEBSITE,
  CHARITY,
  UNATTACHED_DOMAIN_NAME,
  NFT_ART,
} from '../../constants/mintPageConstatnts'
import './MintNftPage.css'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
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
} from '../../utils/contractAddress'
import domainABI from '../../utils/abi/domainABI.json'
import { useTransactionModal } from '../../context/TransactionContext'
import SideBar from '../../components/SideBar/SideBar'
import { mintDomainNft, mintNft } from '../../utils/methods'

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
  // const provider = useProvider({ chainId: 5 });
  const [isDropDownClick, setIsDropDownClick] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedNftType, setSelectedNftType] = useState<
    IContractData | undefined
  >()
  const [selected, setSelected] = useState('')
  const [isInValid, setIsInvalid] = useState(false)
  const [NftContractData, setIsNftContractData] =
    useState<IContractData[]>(ContractData)
  const [inputData, setInputData] = useState('')
  console.log(inputData)

  const [selectDomain, setSelectDomain] = useState('')
  const [userDomainNfts, setUserDomainNfts] = useState<
    { tokenId: string; name: string }[]
  >([])

  // const { chain } = useNetwork();

  const pawAmount = useMemo(() => {
    if (!inputData.length) return 0
    const strlength = inputData.length
    if (strlength >= 2 && strlength <= 3) return 1000000
    if (strlength >= 4 && strlength <= 5) return 100000
    if (strlength >= 6 && strlength <= 7) return 10 ** 21 / 10 ** 18
    if (strlength >= 8 && strlength <= 10) return 10 ** 20 / 10 ** 18
    if (strlength >= 11 && strlength <= 14) return (5 * 10 ** 19) / 10 ** 18
    if (strlength >= 15 && strlength <= 17) return (2 * 10 ** 19) / 10 ** 18
    if (strlength >= 18 && strlength <= 20) return 10 ** 18 / 10 ** 18
    if (strlength >= 21 && strlength <= 25) return 10 ** 17 / 10 ** 18
    return 10 ** 16 / 10 ** 18
  }, [inputData])

  const domainError = useMemo(() => {
    const regex = new RegExp(
      '^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:.[a-zA-Z]{2,})+$',
    )
    const isValid = regex.test(inputData.concat(selected))
    console.log(isValid)
    return isValid ? null : 'Invalid domain name'
  }, [inputData, selected])

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
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [selectedOption])

  const canShowCreateButton = useMemo(() => {
    if (!selectedNftType) {
      setIsInvalid(true)
      return true
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!selectedNftType.hasOwnProperty('tokenAddress')) {
      setIsInvalid(false)
      return true
    }
    setIsInvalid(false)

    if (selectedNftType?.allowance === 0) return false
    return true
  }, [selectedNftType])

  const errorMessage = useMemo(() => {
    if (!selectedNftType) return

    if (selectedNftType.title === UNATTACHED_DOMAIN_NAME) {
      if (!inputData) return 'error please enter domain name'

      return undefined
    }

    if (!selectDomain) return 'error please select a domain'

    return undefined
  }, [selectedNftType, selectDomain, inputData])

  const handleApproveToken = async () => {
    try {
      if (!selectedNftType?.tokenAddress || !signerData) return

      setTransaction({ loading: true, status: 'pending' })
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

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const mintButton = async () => {
    try {
      if (!selectedNftType) return
      console.log(selectedNftType)

      if (selectedNftType?.title === UNATTACHED_DOMAIN_NAME) {
        setTransaction({ loading: true, status: 'pending' })
        await mintDomainNft(inputData, selected, signerData)
        setTransaction({ loading: true, status: 'success' })
        return
      }

      setTransaction({ loading: true, status: 'pending' })
      await mintNft(selectDomain, selectedNftType.contractAddress, signerData)
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="mint-nft-container">
        <div className="mint-nft-container-right">
          <SideBar />
        </div>
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
                <p
                  onClick={() => {
                    setSelectedOption(DIGITAL_GOOD_SHOP)
                    setIsDropDownClick(false)
                  }}
                >
                  Digital Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(PHYSICAL_GOODS_SHOP)
                    setIsDropDownClick(false)
                  }}
                >
                  Physical Goods Shop
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(WEBSITE)
                    setIsDropDownClick(false)
                  }}
                >
                  Website
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(CHARITY)
                    setIsDropDownClick(false)
                  }}
                >
                  Charity
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(NFT_ART)
                    setIsDropDownClick(false)
                  }}
                >
                  ART NFT
                </p>
                <p
                  onClick={() => {
                    setSelectedOption(UNATTACHED_DOMAIN_NAME)
                    setIsDropDownClick(false)
                  }}
                >
                  Unattached Domain Name
                </p>
              </div>
            </div>
          </div>
          <div className="box-2">
            <div className="box-left">
              <p className="title">Connect to:</p>
              <div className="content-container">
                <div className="content-title">
                  <div className="left">
                    <div className="circle active"></div>
                    <p className="title">New Domain Name:</p>
                  </div>
                  <div className="left">
                    <div className="circle"></div>
                    <p className="title">Existing Domain Name:</p>
                  </div>
                </div>
                <div className="content-input">
                  <div className="right">
                    <input
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="shoesboutique"
                      value={inputData}
                    />
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {domainData.map((f, index) => {
                        return (
                          <option key={index} value={f}>
                            {f}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  {selectedOption === UNATTACHED_DOMAIN_NAME && domainError && (
                    <p style={{ color: 'red', fontSize: '16px' }}>
                      {domainError}
                    </p>
                  )}

                  <div className="right-2">
                    <select
                      className="custom-select-box"
                      onChange={(e) => setSelectDomain(e.target.value)}
                      style={{ width: '100%' }}
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
          <div className="box-3">
            <div className="box-left">
              <div className="content">
                <p className="title">Total PAW cost:</p>
                <input value={pawAmount} readOnly />
              </div>
            </div>

            <div className="box-right">
              {errorMessage ? <div>{errorMessage}</div> : ''}
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
      <FooterBottom />
    </div>
  )
}

export default MintNftPage
