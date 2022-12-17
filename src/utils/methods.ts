import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'
import DigitalShopABI from '../utils/abi/digitalShopABI.json'

import erc20ABI from '../utils/abi/erc20ABI.json'
import nftABI from '../utils/abi/websiteABI.json'
import domainNftABI from '../utils/abi/domainABI.json'
import {
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
} from './contractAddress'

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

export const mintNft = async (
  domainTokenId: string,
  erc721Address: string,
  data: any,
) => {
  const nftContract = new ethers.Contract(erc721Address, nftABI, data)
  const tx = await nftContract.mintNft(domainTokenId)
  await tx.wait()
}

export const mintDomainNft = async (
  domainName: string,
  tld: string,
  data: any,
) => {
  const nftContract = new ethers.Contract(
    DOMAIN_NFT_CONTRACT_ADDRESS,
    domainNftABI,
    data,
  )
  const tx = await nftContract.mintNft(domainName.trim(), tld)
  await tx.wait()
}

export const getDigitalShopCategory = async (data: any) => {
  const contract = new ethers.Contract(
    DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    DigitalShopABI,
    data,
  )

  const categoryList = await contract.getCategory()

  const result = await Promise.all(
    categoryList.map(async (category: string) => {
      const subCategory = await contract.getSubCategory(category)

      return {
        name: category,
        subCategory: subCategory,
      }
    }),
  )

  return result
}
