// Externals
import { InfuraProvider } from '@ethersproject/providers'
import { resolve } from 'path'
import dayjs from 'dayjs'

// Constants
import { INFURA_KEY, MEEMONIC } from './constants'

// Libs
// import { createAuction, createAuctionBid, getEasyAuctionContract } from './mesa'
import { createAuction, getEasyAuctionContract } from './mesa'
import { getWallets } from './wallet'

import { parseAuctionData } from './auction-data'

// Auction data
import { daiATokenAddress, mesaTokenAddress, easyAuctionAddress, network } from '../data/auction-data.json'
;(async () => {
  console.info('Parsing realistic-bids.csv')
  const auctionBidsFromCSV = await parseAuctionData(resolve(__dirname, '../data/realistic-bids.csv'))
  console.info('Parsed realistic-bids.csv')

  console.log(auctionBidsFromCSV)

  const infuraProvider = new InfuraProvider(network, INFURA_KEY)
  const wallets = getWallets(MEEMONIC, infuraProvider)

  // Extract wallets:
  // One auction creator
  // Nine investors
  const [auctionCreator] = wallets

  const easyAuction = getEasyAuctionContract(easyAuctionAddress, auctionCreator)

  console.log(`Creating new auction by ${auctionCreator.address}`)
  const createAuctionTx = await createAuction(easyAuction, {
    auctionId: 11,
    auctioningToken: mesaTokenAddress,
    biddingToken: daiATokenAddress,
    orderCancellationEndDate: 9000,
    auctionEndDate: dayjs().add(10, 'hours').unix(),
    auctionedSellAmount: 10000,
    minBuyAmount: 10,
    minimumBiddingAmountPerOrder: 150,
    minFundingThreshold: 9999999999,
  })

  const createAuctionTxRecipt = await createAuctionTx.wait(1)

  console.log(createAuctionTxRecipt.events)
  // Create 20 random bids - WIP
})()
