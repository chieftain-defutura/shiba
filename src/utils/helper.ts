const getApp = () => {
  let host = window.location.host
  const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2)
  if (arr.length > 0) {
    host =
      window.location.protocol +
      '//' +
      'domainName' +
      '.' +
      window.location.host
  }
  return arr
}

export { getApp }
