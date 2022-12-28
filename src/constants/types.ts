export type ISaleStauts =
  | 'ACTIVE'
  | 'PURCHASED'
  | 'REMOVED'
  | 'DISPATCHED'
  | 'CANCELLED'
  | 'COMPLETED'

export type IDomainNft = {
  id: string
  domainName: string
  owner: {
    id: string
  }
}

export type ICharityToken = {
  id: string
  domainName: string
  owner: {
    id: string
  }
}

export type IWebsiteToken = {
  id: string
  domainName: string
  owner: {
    id: string
  }
}

export type IFullOnBlockchainArtToken = {
  id: string
  domainName: string
  owner: {
    id: string
  }
}

export type IPhysicalItem = {
  id: string
  itemName: string
  quantity: string
  metadata: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  shopDetails: {
    id: string
    domainId: string
    domainName: string
    owner: {
      id: string
    }
  }
  price: string
  owner: {
    id: string
  }
  subcategory: string
  category: string
}

export type IDigitalItem = {
  id: string
  metadata: string
  status: ISaleStauts
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  shopDetails: {
    id: string
    domainId: string
    domainName: string
  }
  price: string
  owner: {
    id: string
  } | null
  subcategory: string
  category: string
}

export type IFixedSale = {
  id: string
  auctionId: string
  tokenId: string
  owner: string
  price: string
  erc20Token: {
    id: string
    decimals: string
    symbol: string
  }
  erc721TokenAddress: string
  status: string
}

export type IGoodsDigitalItem = {
  id: string
  itemName: string
  metadata: string
  shopDetails: {
    id: string
  }
  price: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  subcategory: string
  category: string
}

export type IGoodsPhysicalItem = {
  id: string
  price: string
  itemName: string
  quantity: string
  metadata: string
  shopDetails: {
    id: string
  }
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  subcategory: string
  category: string
}

export type IHaveToSend = {
  id: string
  owner: string
  status: string
  quantity: string
  deliveryHash: string
  itemId: {
    id: string
    itemName: string
  }
}

export type IAwaitingDelivery = {
  id: string
  owner: string
  status: string
  buyer: string
  quantity: string
  deliveryHash: string
  itemId: {
    id: string
    itemName: string
    shopDetails: {
      id: string
    }
  }
}

export type IMyItems = {
  id: string
  shopId: string
  price: string
  owner: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  subcategory: string
  category: string
}

export type IUserCollection = {
  id: string
  user: string
  category: string
  totalItems: string
}

export type IUserDigitalItem = {
  id: string
  itemName: string
  fullproduct: string
  metadata: string
  category: string
  owner: {
    id: string
  }
  shopDetails: {
    id: string
  }
}

export type IdigitalItemSearch = {
  id: string
  category: string
}

export type IAuctionNft = {
  id: string
  tokenId: string
  auctionId: string
  owner: string
  highestBid: string
  price: string
  startTime: string
  endTime: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  erc721TokenAddress: string
  status: string
}

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never

export type IIpfsShipmentDetails = {
  name: string
  phone: number
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export type IRemovePhysicalItem = {
  id: string
  itemName: string
  metadata: string
  category: string
  quantity: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  shopDetails: {
    id: string
    domainId: string
    domainName: string
  }
  price: string
  owner: {
    id: string
  }
}

export type IRemoveDigitalItem = {
  id: string
  itemName: string
  metadata: string
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
  shopDetails: {
    id: string
    domainId: string
    domainName: string
  }
  price: string
  owner: {
    id: string
  }
}

export type IReviewOfShop = {
  id: string
  user: string
  itemId: {
    id: string
    shopDetails: {
      id: string
    }
  }
  review: string
  status: string
}
