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
