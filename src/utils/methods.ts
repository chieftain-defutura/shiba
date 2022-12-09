import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'
import erc20ABI from '../utils/abi/erc20ABI.json'
import { MARKETPLACE_CONTRACT_ADDRESS } from './contractAddress'

export const getUserMarketPlaceAllowance = async (
  tokenAddress: string,
  signer: any,
  address: string,
) => {
  const contract = new ethers.Contract(tokenAddress, erc20ABI, signer)
  const allowance = await contract.allowance(
    address,
    MARKETPLACE_CONTRACT_ADDRESS,
  )
  return Number(formatEther(allowance?.toString()))
}
