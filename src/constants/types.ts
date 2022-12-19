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
  subcategory: string
  category: string
}

export type IDigitalItem = {
  id: string
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
  quantity: string
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

export type IAwaitingDelivery = {
  id: string
  owner: string
  status: string
  quantity: string
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
  fullproduct: string
  metadata: string
  category: string
  owner: {
    id: string
  }
}

export type IAuctionNft = {
  id: string
  tokenId: string
  auctionId: string
  owner: string
  highestBid: string
  price: string
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
