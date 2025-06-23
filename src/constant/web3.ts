import { AbiItem } from "web3-utils";
import { TokenType } from "@/interfaces/web3.interface";

// const ZeroAddress = "0x0000000000000000000000000000000000000000";

type PoolAddressType = {
  [key: string]: string;
};

// enum CCIPChainNames {
//   AVALANCHE = 43114, // Chain ID for Avalanche
//   ETHEREUM = 1, // Chain ID for Ethereum
//   BASE = 8453, // Chain ID for Base
//   OPTIMISM = 10, // Chain ID for Optimism
//   ARBITRUM = 42161, // Chain ID for Arbitrum
// }

// type CCIPAddressType = {
//   [key in CCIPChainNames]?: string;
// };

export const PoolAddress: PoolAddressType = {
  polygon: "0x926e410c6380D2915aC2e4a2FEa245274c570Af8",
};
export const AggregatorAddress: PoolAddressType = {
  polygon: "0xF7c9131A4992147c96Cfe52e70Aeec5a3c76014A",
};

// const CCIPSenderAddresses: CCIPAddressType[] = [
//   { [CCIPChainNames.AVALANCHE]: "0x9b8D1238b548601d5FbA940B341cB322e5CC67FF" },
//   { [CCIPChainNames.ETHEREUM]: ZeroAddress },
//   { [CCIPChainNames.BASE]: ZeroAddress },
//   { [CCIPChainNames.OPTIMISM]: ZeroAddress },
//   { [CCIPChainNames.ARBITRUM]: ZeroAddress },
// ];

type TokenAddressType = {
  [key: string]: TokenType;
};

export const USDCAddress: TokenAddressType = {
  polygon: {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
  },
};

export const PoolABI: AbiItem[] = [
  {
    inputs: [
      { internalType: "address", name: "_usdc", type: "address" },
      { internalType: "address", name: "_proxyWallet", type: "address" },
      { internalType: "address", name: "_operator", type: "address" },
      { internalType: "address", name: "_treasury", type: "address" },
      { internalType: "uint256", name: "_fee", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "orderId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "CollectFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "orderId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "side",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "changeWithdrawBalance",
        type: "bool",
      },
    ],
    name: "PlaceOrder",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betDecimal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coreDecimal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "orderId", type: "string" },
      { internalType: "string", name: "tokenId", type: "string" },
      { internalType: "address", name: "wallet", type: "address" },
      { internalType: "uint256", name: "size", type: "uint256" },
      { internalType: "uint256", name: "side", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "bool", name: "changeWithdrawBalance", type: "bool" },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxyWallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_proxyWallet", type: "address" },
    ],
    name: "setProxyWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "wallet", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "setWithdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "tokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "withdrawBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
export const ERC20ABI: AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const AggregatorABI: AbiItem[] = [
  {
    inputs: [
      { internalType: "address[]", name: "to", type: "address[]" },
      { internalType: "bytes[]", name: "calls", type: "bytes[]" },
    ],
    name: "aggregate",
    outputs: [{ internalType: "bytes[]", name: "returnData", type: "bytes[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
