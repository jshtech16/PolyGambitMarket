import axios from "axios";

export enum ExchangeNetwork {
  Ethereum = 1,
  Optimism = 10,
  BNB = 56,
  Arbitrum = 42161,
  Base = 8453,
}

export const apiURL = {
  polymarketAPI: "https://polymarket.com",
  clobAPI: "https://clob.polymarket.com",
  eventAPI: "https://gamma-api.polymarket.com/events",
};

export async function axiosData(api: string) {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("error");
  }
}

export async function fetchData(api: string) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
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
