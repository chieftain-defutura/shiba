export const domainPageQuery = `
  query {
    domainTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
        id
        domainName
        owner {
          id
        }
    }
  }
`

export const websitePageQuery = `
  query {
    websiteTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
        id
        domainName
        owner {
          id
        }
    }
  }
`

export const charitiesPageQuery = `
  query {
    charityTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
        id
        domainName
        owner {
          id
        }
    }
  }
`

export const fullOnBlockchainPageQuery = `
  query {
    fullOnBlockchainArtTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
        id
        domainName
        owner {
          id
        }
    }
  }
`

export const physicalItemQuery = `
query($id: String!){
  physicalItem(id:$id){
    id
    metadata
    shopDetails{
      id
      domainId
      domainName
    }
		price
    owner {
      id
    }
    erc20Token {
      id
      symbol
      decimals
    }
    subcategory
    category
  }
}
`

export const DigitalItemQuery = `
query($id: String!){
  digitalItem(id:$id){
    id
    metadata
    shopDetails{
      id
      domainId
      domainName
    }
		price
    owner {
      id
    }
    erc20Token {
      id
      symbol
      decimals
    }
    subcategory
    category
  }
}
`

export const fixedSaleQuery = `
query {
  fixedSales(where:{status:ACTIVE}){
  id
  auctionId
  tokenId
  owner
  price
  erc20Token{
    id
    symbol
    decimals
  }
  erc721TokenAddress
  status
}
}`

export const goodsDigitalItemsQuery = `
query{
  digitalItems(where:{status:ACTIVE}){
    id
    metadata
    shopDetails{
      id
    }
    price
    erc20Token {
      id
      symbol
      decimals
    }
    subcategory
    category
  }}`

export const goodsPhysicalItemsQuery = `
query{
  physicalItems(where:{status:ACTIVE}){
    id
    quantity
    shopDetails{
      id
    }
    price
    erc20Token {
      id
      symbol
      decimals
    }
    subcategory
    category
  }}`

export const haveToSendQuery = `
  query($owner: String!){
    shipments(where:{owner:$owner,status:"PREPARING"}){
      id
      owner
      status
      quantity
      deliveryHash
    }
  }
  `

export const awaitingDeliveryQuery = `
  query($buyer: String!){
    shipments(where:{buyer:$buyer}){
      id
      owner
      buyer
      status
      quantity
      deliveryHash
    }
  }
  `

export const myItems = `
  query($category:String!){
    digitalItems(where:{status:PURCHASED, category:$category}){
      id
      shopId
      price
      owner
      erc20Token {
        id
        symbol
        decimals
      }
      subcategory
      category
      }
    }
  `
export const userCollectionsQuery = `
  query($user: String!){
    userCollections(where:{user:$user},orderBy:category,orderDirection:asc){
      id
      user
      totalItems
      category
    }
  }
`
export const userDigitalItemsPageQuery = `
query($owner: String!,$category: String!){
  digitalItems(where:{owner:$owner,category:$category}){
    id
    fullproduct
    metadata
    category
    owner {
      id
    }
  }
}
`
export const auctionPageQuery = `
query{
  auctions(where:{status:ACTIVE}){
    id
    tokenId
    auctionId
    owner
    highestBid
    price
    endTime
    erc20Token{
      id
      symbol
      decimals
    }
    erc721TokenAddress
    status
  }
}
`
export const searchDomainNameQuery = `
query($name: String!){
  domainTokens(where:{domainName:$name}){
    owner {
      id
    }
  }
  digitalShopTokens(where:{domainName:$name}){
    owner {
      id
    }
  }
  physicalShopTokens(where:{domainName:$name}){
    owner {
      id
    }
  }
}
`
