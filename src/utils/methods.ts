import { ethers } from 'ethers'

import { formatEther } from 'ethers/lib/utils.js'
import erc20ABI from '../utils/abi/erc20ABI.json'
import nftABI from '../utils/abi/websiteABI.json'
import domainNftABI from '../utils/abi/domainABI.json'
import DigitalShopABI from '../utils/abi/digitalShopABI.json'
import PhysicalShopABI from '../utils/abi/physicalShopABI.json'
import CharityABI from '../utils/abi/charityABI.json'

import {
  CHARITY_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
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

export const getTokenDecimals = async (
  erc20TokenAddress: string,
  data: ethers.Signer,
) => {
  const tokenContract = new ethers.Contract(erc20TokenAddress, erc20ABI, data)
  return await tokenContract.decimals()
}

export const mintNft = async (
  domainTokenId: string,
  erc721Address: string,
  data: any,
) => {
  const nftContract = new ethers.Contract(erc721Address, nftABI, data)
  console.log(nftContract)
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

export const getDigitalShopCategory = async (data: ethers.Signer) => {
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

export const getPhysicalShopCategory = async (data: ethers.Signer) => {
  const contract = new ethers.Contract(
    PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
    PhysicalShopABI,
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

export const getCharityList: (
  data: ethers.Signer,
) => Promise<string[]> = async (data: ethers.Signer) => {
  const charityContract = new ethers.Contract(
    CHARITY_CONTRACT_ADDRESS,
    CharityABI,
    data,
  )
  return await charityContract.getCharityList()
}
