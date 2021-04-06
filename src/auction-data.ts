import { isAbsolute } from 'path'
import csv from 'csvtojson'

interface AuctionBid {
  addressName: string
  addressIndex: number
  tokenInAmount: number
  tokenOutAmount: number
  price: number
}

export const fixFieldTypes = ({ addressIndex, addressName, price, tokenInAmount, tokenOutAmount}: AuctionBid): AuctionBid => ({
  addressName,
  price: parseFloat(price.toString()),
  tokenInAmount: parseFloat(tokenInAmount.toString()),
  tokenOutAmount: parseFloat(tokenInAmount.toString()) / parseFloat(price.toString()), // may introduce runding error
  addressIndex: parseFloat(addressIndex.toString()),
})

export async function parseAuctionData(csvFilePath: string) {
  console.log(csvFilePath)
  if (!isAbsolute(csvFilePath)) {
    throw new Error('CSV file path must be absolute')
  }

  const auctionBids = await csv().fromFile(csvFilePath)

  return auctionBids.map(fixFieldTypes)
}
