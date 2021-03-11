// Externals
import { Provider } from '@ethersproject/abstract-provider'
import { BigNumberish, Signer } from 'ethers'

// EasyAuction Contracts
import { EasyAuction__factory, EasyAuction } from '../contracts'

interface CreateAuctionProps {
  auctionId: BigNumberish
  auctioningToken: string
  biddingToken: string
  orderCancellationEndDate: BigNumberish
  auctionEndDate: BigNumberish
  auctionedSellAmount: BigNumberish
  minBuyAmount: BigNumberish
  minimumBiddingAmountPerOrder: BigNumberish
  minFundingThreshold: BigNumberish
}

export function getEasyAuctionContract(contractAddress: string, signerOrProvider: Signer | Provider) {
  return EasyAuction__factory.connect(contractAddress, signerOrProvider)
}

/**
 *
 * @param easyAuctionContract the EasyAuction contract instance (with signer)
 * @param option
 * @param overrides
 * @returns
 */
export async function createAuction(
  easyAuctionContract: EasyAuction,
  {
    auctionId,
    auctioningToken,
    biddingToken,
    orderCancellationEndDate,
    auctionEndDate,
    auctionedSellAmount,
    minBuyAmount,
    minimumBiddingAmountPerOrder,
    minFundingThreshold,
  }: CreateAuctionProps
) {
  return await easyAuctionContract.emitNewAuction(
    auctionId,
    auctioningToken,
    biddingToken,
    orderCancellationEndDate,
    auctionEndDate,
    auctionedSellAmount,
    minBuyAmount,
    minimumBiddingAmountPerOrder,
    minFundingThreshold
  )
}

interface CreateAuctionBidProps {
  auctionId: BigNumberish
  userId: BigNumberish
  buyAmount: BigNumberish
  sellAmount: BigNumberish
}

export async function createAuctionBid(
  easyAuctionContract: EasyAuction,
  { auctionId, userId, buyAmount, sellAmount }: CreateAuctionBidProps
) {
  return easyAuctionContract.emitNewSellOrder(auctionId, userId, buyAmount, sellAmount)
}
