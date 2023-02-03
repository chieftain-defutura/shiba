const getApp = () => {
  let host = window.location.host
  let arr: string[] = []
  console.log(host.split('.').slice(0, 2))
  if (process.env.NODE_ENV === 'development') {
    arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2)
  } else {
    arr = host.split('.').slice(0, 2)
  }

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
