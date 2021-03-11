// Externals
import { InfuraProvider } from '@ethersproject/providers'

// Constants
import { INFURA_KEY, MEEMONIC } from './constants'

// Libs
// import { createAuction, createAuctionBid, getEasyAuctionContract } from './mesa'
import { createAuction, getEasyAuctionContract } from './mesa'
import { getWallets } from './wallet'

const NETOWRK = 'rinkeby'
const EASY_AUCTION_ADDRESS = '0xEb3Caa20ac5540834DDF2D32B8D741c3B32630a4'

;(async () => {
  const infuraProvider = new InfuraProvider(NETOWRK, INFURA_KEY)
  const wallets = getWallets(MEEMONIC, infuraProvider)

  // Extract wallets:
  // One auction creator
  // Nine investors
  const [auctionCreator] = wallets

  const easyAuction = getEasyAuctionContract(EASY_AUCTION_ADDRESS, auctionCreator)

  console.log(`Creating new auction by ${auctionCreator.address}`)
  const createAuctionTx = await createAuction(easyAuction, {
    auctionId: 10,
    auctioningToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    biddingToken: '0x7090363b7dA6d97Ed575F17900AeeE949c2B7Cf9',
    orderCancellationEndDate: 9000,
    auctionEndDate: 9000,
    auctionedSellAmount: 10000,
    minBuyAmount: 10,
    minimumBiddingAmountPerOrder: 150,
    minFundingThreshold: 9999999999,
  })

  const createAuctionTxRecipt = await createAuctionTx.wait(1)

  console.log(createAuctionTxRecipt.events)
  // Create 20 random bids - WIP
})()
