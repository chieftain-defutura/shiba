import CryptoJs from 'crypto-js'
import { formatUnits, parseUnits } from 'ethers/lib/utils.js'

const CIPHER_SECRET_KEY = process.env.REACT_APP_CIPHER_SECRET_KEY

export const getEncryptedData = (data: string, ref: string[]) => {
  if (!CIPHER_SECRET_KEY) throw new Error('Invalid Secret Key')

  return CryptoJs.AES.encrypt(
    data,
    CIPHER_SECRET_KEY.concat(ref.join('')),
  ).toString()
}

export const getDecryptedData = (data: string, ref: string[]) => {
  if (!CIPHER_SECRET_KEY) throw new Error('Invalid Secret Key')

  const bytes = CryptoJs.AES.decrypt(
    data,
    CIPHER_SECRET_KEY.concat(ref.join('')),
  )
  const decryptedData = bytes.toString(CryptoJs.enc.Utf8)

  if (!decryptedData) return 'INVALID CIPHER TEXT'
  return decryptedData
}

export const formatTokenUnits = (value: string | number, decimals: string) =>
  formatUnits(value, decimals)

export const parseTokenUnits = (value: string, decimals: string) =>
  parseUnits(value, decimals)

export const restoredChunks = (chunks: string[]) => {
  const restoredChunks = chunks.map((chunkString) => {
    const decodedString = atob(chunkString)
    const restoredChunk = new Uint8Array(decodedString.length)
    for (let i = 0; i < decodedString.length; i++) {
      restoredChunk[i] = decodedString.charCodeAt(i)
    }
    return restoredChunk
  })

  const restoredImage = new Blob(restoredChunks, { type: 'image/jpeg' })
  const restoredImageURL = URL.createObjectURL(restoredImage)
  return restoredImageURL
}
