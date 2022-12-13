import CryptoJs from 'crypto-js'

const CIPHER_SECRET_KEY = process.env.REACT_APP_CIPHER_SECRET_KEY

export const getEncryptedData = (data: string) => {
  if (!CIPHER_SECRET_KEY) throw new Error('Invalid Secret Key')

  return CryptoJs.AES.encrypt(data, CIPHER_SECRET_KEY).toString()
}

export const getDecryptedData = (data: string) => {
  if (!CIPHER_SECRET_KEY) throw new Error('Invalid Secret Key')

  const bytes = CryptoJs.AES.decrypt(data, CIPHER_SECRET_KEY)
  const decryptedData = bytes.toString(CryptoJs.enc.Utf8)

  if (!decryptedData) return 'INVALID CIPHER TEXT'
  return decryptedData
}
