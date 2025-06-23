import { cookieStorage, createStorage } from "wagmi";
import {
  avalanche,
  polygon,
  mainnet,
  optimism,
  arbitrum,
  base,
  bsc,
} from "wagmi/chains";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "dc0340d16cbb819091dee701c3f77788";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "GambitMarket",
  description: "GambitMarket",
  url: "https://gambitmarket.io", // origin must match your domain & subdomain
  icons: ["https://sportsgambit.io/wallet-icon.png"],
};

// Create wagmiConfig
const chains = [
  polygon,
  avalanche,
  mainnet,
  optimism,
  arbitrum,
  base,
  bsc,
] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // ...wagmiOptions // Optional - Override createConfig parameters
});
