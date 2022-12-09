import React, { useState, useCallback, useEffect } from "react"
import {
  useAccount,
  useSigner,
  usePrepareContractWrite,
  useContractWrite,
  erc721ABI,
  useContractRead,
} from "wagmi"
// import {
//   DIGITAL_GOOD_SHOP,
//   PHYSICAL_GOODS_SHOP,
//   WEBSITE,
//   CHARITY,
//   UNATTACHED_DOMAIN_NAME,
//   NFT_ART,
// } from "../../constants/mintPageConstatnts"
import { useParams } from "react-router-dom"
import { ethers } from "ethers"
import { useTransactionModal } from "../../context/TransactionContext"
import { IoIosArrowDown } from "react-icons/io"
import {
  AUCTION_MARKETPLACE_ADDRESS,
  // DOMAIN_NFT_CONTRACT_ADDRESS,
  BONE_TOKEN_ADDRESS,
  DIGITAL_GOODS_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
  // SHOP_NFT_CONTRACT_ADDRESS,
} from "../../utils/contractAddress"
import auctionMarketplaceABI from "../../utils/abi/auctionMarketplaceABI.json"
import { getUserMarketPlaceAllowance } from "../../utils/methods"
import { parseUnits } from "ethers/lib/utils.js"

// interface IContractData {
//   title: string
//   contractAddress: string
//   tokenAddress?: string
//   allowance?: number
// }

interface ITokenData {
  title: string
  address: string
  allowance: number
  decimal: string
}

// const ContractData = [
//   {
//     title: UNATTACHED_DOMAIN_NAME,
//     contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
//     // tokenAddress: PAW_TOKEN_ADDRESS,
//     // allowance: 0,
//   },
//   {
//     title: DIGITAL_GOOD_SHOP,
//     contractAddress: DIGITAL_GOODS_ADDRESS,
//     // tokenAddress: SHIB_TOKEN_ADDRESS,
//     // allowance: 0,
//   },
//   {
//     title: PHYSICAL_GOODS_SHOP,
//     contractAddress: SHOP_NFT_CONTRACT_ADDRESS,
//     // tokenAddress: LEASH_TOKEN_ADDRESS,
//     // allowance: 0,
//   },
//   {
//     title: WEBSITE,
//     contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
//   },
//   {
//     title: CHARITY,
//     contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
//   },
//   {
//     title: NFT_ART,
//     contractAddress: DOMAIN_NFT_CONTRACT_ADDRESS,
//   },
// ]

const TokensList = [
  {
    title: "Shi",
    address: SHI_TOKEN_ADDRESS,
    allowance: 0,
    decimal: "18",
  },
  {
    title: "Shib",
    address: SHIB_TOKEN_ADDRESS,
    allowance: 0,
    decimal: "18",
  },
  {
    title: "Leash",
    address: LEASH_TOKEN_ADDRESS,
    allowance: 0,
    decimal: "18",
  },
  {
    title: "Bone",
    address: BONE_TOKEN_ADDRESS,
    allowance: 0,
    decimal: "18",
  },
  {
    title: "Paw",
    address: PAW_TOKEN_ADDRESS,
    allowance: 0,
    decimal: "18",
  },
]

const MarketPlace = () => {
  const { id } = useParams()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState<any>(null)
  const [tokenData, setTokenData] = useState<ITokenData[]>(TokensList)
  const [selectedDropDown, setSelectedDropDown] = useState<ITokenData>()
  const [price, setPrice] = useState("")

  const { data: readData } = useContractRead({
    address: DIGITAL_GOODS_ADDRESS,
    abi: erc721ABI,
    functionName: "isApprovedForAll",
    args: [address as any, AUCTION_MARKETPLACE_ADDRESS],
  })

  const { config: tokenApprove } = usePrepareContractWrite({
    address: DIGITAL_GOODS_ADDRESS,
    abi: erc721ABI,
    functionName: "setApprovalForAll",
    args: [AUCTION_MARKETPLACE_ADDRESS, true],
  })
  const tokenContract = useContractWrite(tokenApprove)

  const handleGetUserAllowance = useCallback(async () => {
    try {
      if (!address || !data) return

      const result = await Promise.all(
        TokensList.map(async (token) => {
          const allowance = await getUserMarketPlaceAllowance(
            token.address,
            data,
            address,
          )
          return {
            ...token,
            allowance,
          }
        }),
      )

      setTokenData([...result])
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }, [address, data])
  useEffect(() => {
    handleGetUserAllowance()
  }, [handleGetUserAllowance])

  const handleApproveToken = async () => {
    try {
      setTransaction({ loading: true, status: "pending" })
      const data = await tokenContract.writeAsync?.()
      await data?.wait()
      setTransaction({ loading: true, status: "success" })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: "error" })
    }
  }

  const handlePutOnSale = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: "pending" })
      const contract = new ethers.Contract(
        AUCTION_MARKETPLACE_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.fixedSale(
        id,
        parseUnits(price, selectedDropDown?.decimal).toString(),
        selectedDropDown?.address,
        DIGITAL_GOODS_ADDRESS,
      )
      await tx.wait()
      console.log("added")
      setTransaction({ loading: true, status: "success" })
    } catch (error) {
      console.log("Error sending File to IPFS:")
      console.log(error)
      setTransaction({ loading: true, status: "error" })
    }
  }

  return (
    <div className="on-marketplace-container">
      <p className="title">On Marketplace</p>
      <div className="on-marketplace-sub-container">
        <div className="content">
          <div className="content-left">
            <p>Select Charity Organisation From List</p>
            <p>Price</p>
          </div>
          <div className="content-right">
            <select></select>
            <div className="price-select-container">
              <div className="left">
                <input
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {!readData ? (
                  <button onClick={() => handleApproveToken()}>Approve</button>
                ) : (
                  <button onClick={handlePutOnSale}>Put On Sale</button>
                )}
              </div>
              <div className={!dropDown ? " right" : "right active"}>
                <div className="header" onClick={() => setDropDown(!dropDown)}>
                  <p>{selectedDropDown?.title}</p>
                  <IoIosArrowDown />
                </div>
                <div className={!dropDown ? "body" : "body active"}>
                  {tokenData.map((f, index) => {
                    return (
                      <p key={index} onClick={() => setSelectedDropDown(f)}>
                        {f.title}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPlace
