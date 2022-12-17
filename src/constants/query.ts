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
