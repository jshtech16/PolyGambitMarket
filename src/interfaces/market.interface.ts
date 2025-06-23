import { HistoryPriceChildInterface } from "./history-prices.interface";

export interface MarketInterface {
  id: string;
  groupItemTitle: string;
  percentage: number;
  lastTradePrice: number;
  automaticallyResolved: boolean;
  groupItemThreshold: string;
  clobTokenIds: string;
  outcomes: string;
  outcomePrices: string;
  volumeNum: number;
  description: string;
  archived: boolean;
  image: string;
  bestAsk: number;
  historyPrices: HistoryPriceChildInterface[];
  bestBid: number;
  volume: number;
  question: string;
  oneDayPriceChange: number;
}

export interface EventInterface {
  id: string;
  title: string;
  image: string;
  commentCount: number;
  volume: number;
  negRisk: boolean;
  sortBy: string;
  slug: string;
  endDate: string;
  showAllOutcomes: boolean;
  featured: boolean;
  markets: MarketInterface[];
  startTime: string;
  startDay: number;
  startMonth: string;
  startDayOfWeek: string;
  startHour: string;
  countryName: string;
  electionType: string;
  tags: {
    id: string;
    label: string;
    slug: string;
    forceShow: false;
    publishedAt: string;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    _sync: boolean;
    forceHide: boolean;
  }[];
}
