export const domainRegex = () =>
  new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)

export const getDomainNamePrice = (domainName: string) => {
  const strlength = domainName.length
  if (strlength >= 0 && strlength <= 1) return 1000000
  if (strlength >= 2 && strlength <= 3) return 1000000
  if (strlength >= 4 && strlength <= 5) return 100000
  if (strlength >= 6 && strlength <= 7) return 10 ** 21 / 10 ** 18
  if (strlength >= 8 && strlength <= 10) return 10 ** 20 / 10 ** 18
  if (strlength >= 11 && strlength <= 14) return (5 * 10 ** 19) / 10 ** 18
  if (strlength >= 15 && strlength <= 17) return (2 * 10 ** 19) / 10 ** 18
  if (strlength >= 18 && strlength <= 20) return 10 ** 18 / 10 ** 18
  if (strlength >= 21 && strlength <= 25) return 10 ** 17 / 10 ** 18
  return 10 ** 16 / 10 ** 18
}
