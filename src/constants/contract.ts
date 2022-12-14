import {
  CHARITIES_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
} from '../utils/contractAddress'

export const ContractDetails: {
  [key: string]: { address: string; transfer: boolean }
} = {
  'my-digital-shop': {
    address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    transfer: true,
  },
  'my-goods-shop': {
    address: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
    transfer: true,
  },
  'my-domains': {
    address: DOMAIN_NFT_CONTRACT_ADDRESS,
    transfer: true,
  },
  'my-charities': {
    address: CHARITIES_NFT_CONTRACT_ADDRESS,
    transfer: false,
  },
  'my-websites': {
    address: WEBSITE_NFT_CONTRACT_ADDRESS,
    transfer: false,
  },
}
