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
        link
        domainName
        owner {
          id
        }
    }
  }
`

export const subdomainNameSearch = `
  query($domainName:String!) {
    websiteTokens(where:{domainName:$domainName}){
        id
        link
        domainName
        owner {
          id
        }
    }
    fullOnBlockchainArtTokens(where:{domainName:$domainName}){
      id
      domainName
      link
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
        link
        domainName
        owner {
          id
        }
    }
  }
`

export const fullOnBlockchainTokens = `
  query($domainName:String!) {
    fullOnBlockchainArtTokens(where:{domainName:$domainName}){
        id
        domainName
        link
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
    quantity
    shopDetails{
      id
      domainId
      domainName
      owner{
        id
      }
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
      owner{
        id
      }

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
query ($price: String!,$erc20Token:[String!]){
  fixedSales(where:{status:ACTIVE, price_gte:$price, erc20Token_in:$erc20Token}){
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
query($price: String!,$erc20Token:[String!]){
  digitalItems(where:{status:ACTIVE, price_gte:$price, erc20Token_in:$erc20Token}){
    id
    metadata
    itemName
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
  physicalItems(where:{status:ACTIVE , price_gte:$price,erc20Token_in:$erc20Token}){
    id
    itemName
    quantity
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
      owner
      status
      quantity
      deliveryHash
      itemId{
        id
        itemName
      }
    }
  }
  `

export const awaitingDeliveryQuery = `
  query($buyer: String!){
    shipments(where:{buyer:$buyer,status_in:[PREPARING,DISPATCHED]}){
      id
      owner
      buyer
      status
      quantity
      deliveryHash
      itemId {
        id
        itemName
        shopDetails {
          id
        }
      }
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
    items(orderBy:id,orderDirection:desc,first:1){
      id
      itemName
      price
      metadata
      erc20Token{
        id
        symbol
        decimals
      }
    }
    lastSale {
      id
      itemId {
        id
        itemName
        metadata
        price
        erc20Token{
        id
        symbol
        decimals
      	}
      }
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
    items(orderBy:id,orderDirection:desc,first:1){
      id
      itemName
      price
      metadata
      erc20Token{
        id
        symbol
        decimals
      }
    }
    lastSale {
      id
      metadata
      category
      itemName
      price
      erc20Token{
        id
        symbol
        decimals
      }
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
query($category:[String!]){
  physicalItems(orderBy:listedAt,orderDirection:desc,first:10,where:{category_in:$category}){
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
export const removePhysicalItemQuery = `
query($id:String!){
  physicalItems(where:{ status: ACTIVE,shopDetails: $id}){
    id
    quantity
    metadata
    itemName
    shopDetails{
      id
    }
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

export const removeDigitalItemQuery = `
query($id:String!){
  digitalItems(where:{status:ACTIVE,shopDetails: $id}){
    id
    shopDetails{
      id
    }
		price
    owner
    metadata
    itemName
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

export const getReviewOfShopQuery = `
query($shopId:String!,$status:String!){
  reviews(where:{itemId_:{shopDetails:$shopId},status:$status}){
    id
    user
    itemId {
      id
      shopDetails {
        id
      }
    }
    review
    status
  }
}
`

export const searchDomainHeaderQuery = `
query($name:String!){
  digitalShopTokens(where:{domainName_starts_with:$name}){
    id
    owner {
      id
    }
  	domainName
	}
  physicalShopTokens(where:{domainName_starts_with:$name}){
    id
    owner {
      id
    }
  	domainName
	}
  domainTokens(where:{domainName_starts_with:$name,owner_not:"0x0000000000000000000000000000000000000000"}){
    id
    owner {
      id
    }
    domainName
  }
}
`
