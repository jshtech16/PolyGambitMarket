type ChainInfoType = {
  [key: string]: {
    rpc: string[],
    chainId: number
  }
}

export const chains: ChainInfoType = {
  polygon: {
    rpc: [
      'https://polygon.llamarpc.com',
      'https://polygon-mainnet.public.blastapi.io',
      'https://rpc.ankr.com/polygon',
      'https://polygon.drpc.org',
      'https://1rpc.io/matic',
      'https://polygon-rpc.com'
    ],
    chainId: 137
  }
}

export const id2chain = {
  137: 'polygon'
}