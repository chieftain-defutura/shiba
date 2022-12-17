export type IDomainNft = {
  id: string
  domainName: string
  owner: {
    id: string
  }
}

<<<<<<< HEAD
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
=======
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
>>>>>>> c9f1dedaa8002a693b265251e92ecb2d3b922e9b
}
