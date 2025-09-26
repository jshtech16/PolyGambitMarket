interface NetworkInterface {
  [key: string]: any;
}

export interface Token {
  address: string;
  decimals: number;
  eip2612: boolean;
  logoURI: string;
  name: string;
  symbol: string;
}

export const Network: NetworkInterface = {
  "137": "Polygon",
  "10": "Optimism",
  "42161": "Arbitrum",
  "8453": "Base",
  "56": "BSC",
};

export type Target = "From" | "To";

export const CHAINS = [137, 10, 42161, 8453, 1];
export const CHAIN_IDS = [
  {
    id: 137,
    geckoId: "polygon_pos",
    weth: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  },
  {
    id: 10,
    geckoId: "optimism",
    weth: "0x4200000000000000000000000000000000000006",
  },
  {
    id: 42161,
    geckoId: "arbitrum",
    weth: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  },
  {
    id: 8453,
    geckoId: "base",
    weth: "0x4200000000000000000000000000000000000006",
  },
  {
    id: 1,
    geckoId: "eth",
    weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
];

interface SupportedChains {
  [index: number]: string;
}

export const SUPPORTED_CHAINS: SupportedChains = {
  "137": "https://icons.llamao.fi/icons/chains/rsz_polygon.jpg",
  "10": "https://res.coinpaper.com/coinpaper/optimism_logo_6eba6a0c5c.png",
  "42161": "https://res.coinpaper.com/coinpaper/arb_fba92b25bc.png",
  "8453": "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
  "1": "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
};
