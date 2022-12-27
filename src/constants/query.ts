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
    status
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

export const goodsItemsQuery = `
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
  }
  physicalItems(where:{status:ACTIVE}){
    id
    itemName
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
  }
}`

// export const goodsPhysicalItemsQuery = `
// query{
//   physicalItems(where:{status:ACTIVE}){
//     id
//     quantity
//     shopDetails{
//       id
//     }
//     price
//     erc20Token {
//       id
//       symbol
//       decimals
//     }
//     subcategory
//     category
//   }}`

export const haveToSendQuery = `
  query($owner: String!){
    shipments(where:{owner:$owner,status:"PREPARING"}){
      id
      itemId
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
    itemName
    fullproduct
    metadata
    category
    owner {
      id
    }
    shopDetails {
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
export const physicalShopTokenByIdQuery = `
query($id: String!){
  physicalShopToken(id:$id){
    id
    domainName
    tokenUri
    upVote
    downVote
    owner {
      id
    }    
  }
}
`

export const digitalShopTokenByIdQuery = `
query($id: String!){
  digitalShopToken(id:$id){
    id
    domainName
    tokenUri
    upVote
    downVote
    owner {
      id
    }    
  }
}
`

export const digitalShopTokensQuery = `
query{
  digitalShopTokens{
    id
    domainName
    tokenUri
    owner {
      id
    }    
  }
}
`

export const physicalShopTokensQuery = `
query{
  physicalShopTokens{
    id
    domainName
    tokenUri
    owner {
      id
    }    
  }
}
`

export const shopPageQuery = `
query{
  physicalShopTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
    id
    domainName
    tokenUri
    owner {
      id
    }    
  }
  digitalShopTokens(where:{owner_not:"0x0000000000000000000000000000000000000000"}){
    id
    domainName
    tokenUri
    owner {
      id
    }    
  }
}
`
export const recentlyListedQuery = `
query{
  physicalItems(orderBy:listedAt,orderDirection:desc,first:10){
    id
    itemName
    category
    metadata
    listedAt
    price
    shopDetails{
       id
       owner {
        id
      } 
    }
    erc20Token{
      id
      decimals
      symbol
    }
  }
}
`
