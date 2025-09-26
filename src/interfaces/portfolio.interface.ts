export interface PortfolioInterface {
  proxyWallet: string,
  asset: string,
  conditionId: string,
  size: number,
  sizeUser?: number,
  avgPrice: number,
  initialValue: number,
  currentValue: number,
  cashPnl: number,
  percentPnl: number,
  totalBought: number,
  realizedPnl: number,
  percentRealizedPnl: number,
  curPrice: number,
  redeemable: boolean,
  mergeable: boolean,
  title: string,
  slug: string,
  icon: string,
  eventSlug: string,
  outcome: string,
  outcomeIndex: number,
  oppositeOutcome: string,
  oppositeAsset: string,
  endDate: string,
  negativeRisk: boolean,
}

export interface PendingOrderType {
  id: string,
  status: string,
  owner: string,
  maker_address: string,
  market: string,
  asset_id: string,
  side: string,
  original_size: number,
  size_matched: number,
  price: number,
  outcome: string,
  expiration: number,
  order_type: string,
  created_at: number
}

export interface PendingOrderExtType extends PendingOrderType {
  question: string,
  image: string
}

export interface HistoryType {
  chain: string,
  txhash: string,
  orderId: string,
  tokenId: string,
  wallet: string,
  size: number,
  side: string,
  price: number,
  timestamp: number,
}

export interface HistoryExtType extends HistoryType {
  question: string,
  image: string
}