import {
  BONE_TOKEN_ADDRESS,
  CHARITIES_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
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
  query: string
}

export interface IContractDetails {
  [key: string]: IContractData
}

export interface IDigitalItemsCategory {
  path: string
  name: string
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
    query: `
      query($id:String!) {
        digitalShopToken(id:$id){
          id
          domainName
          owner {
            id
          }
        }
      }
    `,
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
    query: `
      query($id:String!) {
        physicalShopToken(id:$id){
          id
          domainName
          owner {
            id
          }
        }
      }
    `,
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
    query: `
      query($id:String!) {
        domainToken(id:$id){
          id
          domainName
          owner {
            id
          }
        }
      }
    `,
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
    query: `
      query($id:String!) {
        charityToken(id:$id){
          id
          domainName
          owner {
            id
          }
        }
      }
    `,
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
    query: `
      query($id:String!) {
        websiteToken(id:$id){
          id
          domainName
          owner {
            id
          }
        }
      }
    `,
  },
}

export const DigitalItemsCategory: IDigitalItemsCategory[] = [
  {
    path: 'my-movies',
    name: 'movies',
  },
  { path: 'my-music', name: 'music' },
  { path: 'my-books', name: 'books' },
  { path: 'my-courses', name: 'courses' },
]

export const tokensList = [
  {
    title: 'SHI',
    address: SHI_TOKEN_ADDRESS,
    decimal: '18',
  },
  {
    title: 'SHIB',
    address: SHIB_TOKEN_ADDRESS,
    decimal: '18',
  },
  {
    title: 'LEASH',
    address: LEASH_TOKEN_ADDRESS,
    decimal: '18',
  },
  {
    title: 'BONE',
    address: BONE_TOKEN_ADDRESS,
    decimal: '18',
  },
  {
    title: 'PAW',
    address: PAW_TOKEN_ADDRESS,
    decimal: '18',
  },
]
