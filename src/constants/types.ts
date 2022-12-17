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
