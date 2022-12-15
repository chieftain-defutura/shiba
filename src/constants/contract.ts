import {
  CHARITIES_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
} from '../utils/contractAddress'

export interface IContractData {
  address: string
  pathName: string
  stockManagement: boolean
  file: boolean
  appearanceSetting: boolean
  residual: boolean
  sell: boolean
  finalizeToken: boolean
  transfer: boolean
}

export interface IContractDetails {
  [key: string]: IContractData
}

export const ContractDetails: IContractDetails = {
  'my-digital-shop': {
    address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    pathName: 'my-digital-shop',
    stockManagement: true,
    file: false,
    appearanceSetting: true,
    residual: true,
    sell: true,
    finalizeToken: true,
    transfer: true,
  },
  'my-goods-shop': {
    address: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
    pathName: 'my-goods-shop',
    stockManagement: true,
    file: false,
    appearanceSetting: true,
    residual: true,
    sell: true,
    finalizeToken: true,
    transfer: true,
  },
  'my-domains': {
    address: DOMAIN_NFT_CONTRACT_ADDRESS,
    pathName: 'my-domains',
    stockManagement: false,
    file: false,
    appearanceSetting: false,
    residual: false,
    sell: false,
    finalizeToken: true,
    transfer: true,
  },
  'my-charities': {
    address: CHARITIES_NFT_CONTRACT_ADDRESS,
    pathName: 'my-charities',
    stockManagement: false,
    file: true,
    appearanceSetting: true,
    residual: true,
    sell: true,
    finalizeToken: true,
    transfer: true,
  },
  'my-websites': {
    address: WEBSITE_NFT_CONTRACT_ADDRESS,
    pathName: 'my-websites',
    stockManagement: false,
    file: true,
    appearanceSetting: true,
    residual: true,
    sell: true,
    finalizeToken: true,
    transfer: true,
  },
}
