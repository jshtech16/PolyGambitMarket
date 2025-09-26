import axios from "axios";

export enum ExchangeNetwork {
  Ethereum = 1,
  Optimism = 10,
  BNB = 56,
  Arbitrum = 42161,
  Base = 8453,
}

export interface Token {
  address: string;
  decimals: number;
  eip2612: boolean;
  logoURI: string;
  name: string;
  symbol: string;
}

const baseUrl = "https://api.dln.trade/v1.0";

const check = (data: any) => {
  if (typeof data !== "object") {
    throw new Error("Wrong result due to wrong network!");
  }
};

export const getTokenList = async (network: ExchangeNetwork) => {
  const { data } = await axios.get(`${baseUrl}/token-list?chainId=${network}`);
  check(data);
  return data;
};
