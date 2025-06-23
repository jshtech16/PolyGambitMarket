import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { AbiItem } from "web3-utils";
import { CBBooleanType } from "@/interfaces/web3.interface";
import { config } from "@/components/CustomWagmiProvider/config";

import Web3 from "web3";
import {
  CBNumberType,
  CBNumberArrayType,
  TokenType,
} from "@/interfaces/web3.interface";
import { chains } from "@/constant/rpcs";
import { fTimeout } from "@/util/timeout";
import { convertDecimal } from "@/util/decimal";
import {
  PoolABI,
  PoolAddress,
  AggregatorABI,
  AggregatorAddress,
} from "@/constant/web3";
import BigNumber from "bignumber.js";
import axios from "axios";
BigNumber.config({ EXPONENTIAL_AT: 70 });

// Define the structure for token items
interface TokenItem {
  contract_name: string;
  contract_ticker_symbol: string;
  balance: string;
  contract_decimals: number;
}

// Define the structure for the non-zero balance result
interface NonZeroToken {
  name: string;
  symbol: string;
  balance: number;
}

export const simulateAndWriteContract = async (
  address: string,
  abi: AbiItem[] | AbiItem,
  functionName: string,
  args: (string | number)[]
): Promise<CBBooleanType> => {
  try {
    const { request } = await simulateContract(config, {
      address: address as `0x${string}`,
      abi: abi as unknown[],
      functionName,
      args,
    });

    const hash = await writeContract(config, request);

    const { status } = await waitForTransactionReceipt(config, {
      hash,
    });

    return {
      state: "ok",
      data: status == "success" ? true : false,
    };
  } catch (err) {
    return {
      state: "err",
      code: err as string,
    };
  }
};

export const getUserBalance = async (
  chain: string,
  token: TokenType,
  wallet: string
): Promise<CBNumberType> => {
  try {
    if (PoolAddress[chain] == undefined) {
      return {
        state: "err",
        code: "Wrong Chain",
      };
    }
    for (const rpcindex in chains[chain].rpc) {
      const web3 = new Web3(chains[chain].rpc[rpcindex]);
      const poolContract = new web3.eth.Contract(PoolABI, PoolAddress[chain]);
      const cb = await fTimeout(
        poolContract.methods.balance(wallet).call(),
        1000
      );
      if (cb.timeout == false) {
        const data = cb.result;
        const allowanceBN = new BigNumber(data).toString();
        const allowance = convertDecimal(allowanceBN, token.decimals, "toNum");
        return {
          state: "ok",
          data: Number(allowance),
        };
      }
    }
    return {
      state: "err",
      code: "RPC is not replying",
    };
  } catch (error) {
    return {
      state: "err",
      code: error as string,
    };
  }
};

export const getUserPolyTokenBalance = async (
  chain: string,
  tokens: string[],
  wallet: string
): Promise<CBNumberArrayType> => {
  try {
    const run = async (rpc: string): Promise<CBNumberArrayType> => {
      const web3 = new Web3(rpc);
      const poolContract = new web3.eth.Contract(PoolABI, PoolAddress[chain]);
      const addresses: string[] = [];
      const params: string[] = [];
      for (const x in tokens) {
        const byte = poolContract.methods
          .tokenBalance(tokens[x], wallet)
          .encodeABI();
        params.push(byte);
        addresses.push(PoolAddress[chain]);
      }

      const aggContract = new web3.eth.Contract(
        AggregatorABI,
        AggregatorAddress[chain]
      );
      const cb = await fTimeout(
        aggContract.methods.aggregate(addresses, params).call()
      );
      if (cb.timeout == false) {
        const data = cb.result;
        const ret: number[] = [];
        for (const x in data) {
          const tmp = data[x].substr(2);
          const tokenBalBN = new BigNumber(tmp, 16).toString();
          const tokenBal = convertDecimal(tokenBalBN, 6, "toNum");
          ret.push(tokenBal as number);
        }
        return {
          state: "ok",
          data: ret,
        };
      } else {
        return {
          state: "err",
          code: cb.error as string,
        };
      }
    };

    for (const rpcindex in chains[chain].rpc) {
      const ret = await run(chains[chain].rpc[rpcindex]);
      if (ret.state == "ok") {
        return ret;
      }
    }
    return {
      state: "err",
      code: "RPC is not replying",
    };
  } catch (error) {
    return {
      state: "err",
      code: error as string,
    };
  }
};

export const fetchCovalentBalances = async (
  address: string,
  chainId: number
): Promise<NonZeroToken[]> => {
  const API_KEY: string = "cqt_rQ3TpM9wfcWB7DyBJJRqXdpTkcFj";

  try {
    // API call to Covalent
    const response = await axios.get<{
      data: { items: TokenItem[] };
    }>(
      `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/`,
      {
        params: {
          key: API_KEY,
        },
      }
    );

    // Extract items from the API response
    const items: TokenItem[] = response.data.data.items;

    // Filter and map non-zero balances
    const nonZeroBalances: NonZeroToken[] = items
      .filter((token) => BigInt(token.balance) > 0)
      .map((token) => ({
        name: token.contract_name,
        symbol: token.contract_ticker_symbol,
        balance: Number(token.balance) / 10 ** token.contract_decimals,
      }));

    return nonZeroBalances;
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw new Error("Failed to fetch token balances.");
  }
};
