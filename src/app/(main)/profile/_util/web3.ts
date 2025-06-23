import Web3 from "web3";
import { CBNumberType, TokenType } from "@/interfaces/web3.interface";
import { chains } from "@/constant/rpcs";
import { fTimeout } from "@/util/timeout";
import { convertDecimal } from "@/util/decimal";
import { ERC20ABI, PoolABI, PoolAddress } from "@/constant/web3";
import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 70 });

export const getTokenBalance = async(chain: string, token: TokenType, wallet: string): Promise<CBNumberType> => {
  try {
    for (const rpcindex in chains[chain].rpc) {
      const web3 = new Web3(chains[chain].rpc[rpcindex]);
      const tokenContract = new web3.eth.Contract(ERC20ABI, token.address);
      const cb = await fTimeout(tokenContract.methods.balanceOf(wallet).call(), 1000);
      if (cb.timeout == false) {
        const data = cb.result;
        const allowanceBN = new BigNumber(data).toString();
        const allowance = convertDecimal(allowanceBN, token.decimals, 'toNum');
        return {
          state: 'ok',
          data: Number(allowance)
        }
      }
    }
    return {
      state: 'err',
      code: 'RPC is not replying'
    }
  } catch (error) {
    return {
      state: 'err',
      code: error as string
    }
  }
}

export const getTokenAllowance = async(chain: string, token: TokenType, spender: string, wallet: string): Promise<CBNumberType> => {
  try {
    for (const rpcindex in chains[chain].rpc) {
      const web3 = new Web3(chains[chain].rpc[rpcindex]);
      const tokenContract = new web3.eth.Contract(ERC20ABI, token.address);
      const cb = await fTimeout(tokenContract.methods.allowance(wallet, spender).call(), 1000);
      if (cb.timeout == false) {
        const data = cb.result;
        const allowanceBN = new BigNumber(data).toString();
        const allowance = convertDecimal(allowanceBN, token.decimals, 'toNum');
        return {
          state: 'ok',
          data: Number(allowance)
        }
      }
    }
    return {
      state: 'err',
      code: 'RPC is not replying'
    }
  } catch (error) {
    return {
      state: 'err',
      code: error as string
    }
  }
}

export const getUserCash = async(chain: string, token: TokenType, wallet: string): Promise<CBNumberType> => {
  try {
    if (PoolAddress[chain] == undefined) {
      return {
        state: 'err',
        code: 'Wrong Chain'
      }
    }
    for (const rpcindex in chains[chain].rpc) {
      const web3 = new Web3(chains[chain].rpc[rpcindex]);
      const poolContract = new web3.eth.Contract(PoolABI, PoolAddress[chain]);
      const cb = await fTimeout(poolContract.methods.withdrawBalance(wallet).call(), 1000);
      if (cb.timeout == false) {
        const data = cb.result;
        const allowanceBN = new BigNumber(data).toString();
        const allowance = convertDecimal(allowanceBN, token.decimals, 'toNum');
        return {
          state: 'ok',
          data: Number(allowance)
        }
      }
    }
    return {
      state: 'err',
      code: 'RPC is not replying'
    }
  } catch (error) {
    return {
      state: 'err',
      code: error as string
    }
  }
}
