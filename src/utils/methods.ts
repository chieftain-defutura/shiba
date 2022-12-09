import { ethers } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
import erc20ABI from "../utils/abi/erc20ABI.json"
import { AUCTION_MARKETPLACE_ADDRESS } from "./contractAddress"

export const getUserMarketPlaceAllowance = async (
  tokenAddress: string,
  signer: any,
  address: string,
) => {
  const contract = new ethers.Contract(tokenAddress, erc20ABI, signer)
  const allowance = await contract.allowance(
    address,
    AUCTION_MARKETPLACE_ADDRESS,
  )
  return Number(formatEther(allowance?.toString()))
}
