"use client";
import "./style.scss";
import axios from "axios";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { Address, zeroAddress } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

import { config } from "@/components/CustomWagmiProvider/config";
import { Avatar, Badge } from "@nextui-org/react";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/react";
import { getBalance } from "@wagmi/core";
import { switchChain } from "@wagmi/core";

import { SelectCrypto } from "./SelectCrypto";
import {
  CHAIN_IDS,
  Token,
  SUPPORTED_CHAINS,
  Network,
} from "@/constant/exchange";

interface DepositProps {
  depositHandler: () => void;
  setDepositAmount: (value: number) => void;
}

const Deposit = (props: DepositProps) => {
  console.log("waiting for deposit");
  const { setDepositAmount, depositHandler } = props;
  const polygonChainID = 137;
  const tokenOutRecipientAddress = "0xAa6d9193Ec8baB92dd078D6786A8db7c0DF8A762";
  const polygonUSDCEAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const { address, isConnected, chainId } = useAccount();
  const {
    sendTransaction,
    data: hash,
    isPending,
    isError,
    isSuccess,
    error,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const defaultToken: Token = {
    address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    decimals: 6,
    eip2612: true,
    logoURI:
      "https://tokens.debridge.finance/Logo/10/0x7f5c764cbc14f9669b88837ca1490cca17c31607/thumb/token-logo.png",
    name: "USDC",
    symbol: "USDC",
  };
  const [selectCrypto, setSelectCrypto] = useState(false);
  const [network, setNetwork] = useState(10);
  const [token, setToken] = useState<Token>(defaultToken);
  const [inAmount, setInAmount] = useState<string>();
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);

  useEffect(() => {
    const run = async () => {
      if (isSuccess && hash) {
        console.log("Transaction sent successfully:", hash);
        const ret = await axios.post(`${process.env.NEXT_PUBLIC_API}deposit`, {
          senderAddress: address,
        });
        const data = ret.data.status;
        console.log("deposit return", data);
        setLoading(false);
      }

      if (isError && error) {
        console.error("Error sending transaction:", error.message);
      }
    };
    run();
  }, [isSuccess, isError, hash, error]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        console.log(estimatedAmount);
        if (token) {
          console.log("error?");
          const result = await getBalance(config, {
            chainId: network,
            address: address ?? zeroAddress,
            ...(token && token.address !== zeroAddress
              ? { token: token.address as Address }
              : {}),
          });
          console.log("```", result);
          setTokenBalance(
            Math.round((Number(result.value) / 10 ** result.decimals) * 10000) /
              10000
          );
        }
      } catch (err) {
        console.error({ err });
      }
    };
    if (isConnected || isConfirmed) setTimeout(() => fetchBalance(), 1000);
  }, [network, isConnected, token, address, isConfirmed]);

  useEffect(() => {
    const fetchUSDPrice = async () => {
      if (network && token && inAmount) {
        const chainId = CHAIN_IDS.find(({ id }) => id === network);
        const priceRes = await axios.get(
          `https://api.geckoterminal.com/api/v2/simple/networks/${
            chainId?.geckoId
          }/token_price/${
            token.address === zeroAddress ? chainId?.weth : token.address
          }`
        );
        setUsdPrice(
          Math.round(
            Number(
              Object.values(priceRes.data.data.attributes.token_prices)[0]
            ) *
              Number(inAmount) *
              100
          ) / 100
        );
      } else {
        setUsdPrice(0);
      }
    };

    if (network && token && inAmount) fetchUSDPrice();
  }, [network, token, inAmount]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        console.log(network, "137---");
        if (network !== 137) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DLN_API}/dln/order/quote`,
            {
              params: {
                srcChainId: `${network}`,
                srcChainTokenIn: `${token?.address}`,
                srcChainTokenInAmount: `${
                  Number(inAmount) * 10 ** (token?.decimals ?? 0)
                }`,
                dstChainId: polygonChainID,
                dstChainTokenOut: polygonUSDCEAddress,
              },
            }
          );

          const estimatedAmount =
            res.data.estimation.dstChainTokenOut.recommendedAmount;
          console.log("estimated amount:", estimatedAmount / 10 ** 6);
          setEstimatedAmount(estimatedAmount / 10 ** 6);
        } else {
          console.log(
            network,
            token?.address,
            Number(inAmount) * 10 ** (token?.decimals ?? 0),
            polygonUSDCEAddress
          );
          if (token.address !== polygonUSDCEAddress) {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_DLN_FINANCE_API}/chain/estimation`,
              {
                params: {
                  chainId: `${network}`,
                  tokenIn: `${token?.address}`,
                  tokenInAmount: `${
                    Number(inAmount) * 10 ** (token?.decimals ?? 0)
                  }`,
                  tokenOut: polygonUSDCEAddress,
                  slippage: 0.05,
                  recommendedSlippage: 0.05,
                },
              }
            );
            const estimatedAmount = res.data.estimation.tokenOut.amount;
            console.log("estimated amount:", estimatedAmount / 10 ** 6);
            setEstimatedAmount(estimatedAmount / 10 ** 6);
          } else {
            setEstimatedAmount(Number(inAmount));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (token && inAmount) {
      setDisabled(false);
      fetchQuote();
    } else {
      setDisabled(true);
    }
    console.log(disabled)
  }, [token, inAmount, network]);

  useEffect(() => {
    let pendingToastId, confirmingToastId;
    if (isPending) {
      pendingToastId = toast.loading("The transaction is pending...");
    }
    if (isConfirming) {
      toast.dismiss(pendingToastId);
      confirmingToastId = toast.loading("The transaction is confirming...");
    }
    if (isConfirmed) {
      toast.dismiss(confirmingToastId);
      toast.success("The transaction is confirmed successfully!");
      setInAmount("");
    }
    if (isError) {
      toast.dismiss(pendingToastId);
      if ((error.name as string) === "EstimateGasExecutionError") {
        toast.error("You don't have enough gas fee.");
      }
    }
  }, [isConfirming, isConfirmed, isPending, isError, error]);

  const showSelectCrypto = () => {
    setSelectCrypto(false);
  };

  const selectTokenClicked = () => {
    setSelectCrypto(true);
  };
  const handleSelectToken = (token: Token, network: number) => {
    setToken(token);
    setNetwork(network);
  };

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    // debounce amount input
    let timer: NodeJS.Timeout | null = null;
    if (timer) {
      clearTimeout(timer); // Clear the previous timeout
    }
    timer = setTimeout(() => {
      setInAmount(e.target.value);
    }, 500);
  };

  const confirmDeposit = useCallback(async () => {
    try {
      if (chainId !== network) {
        await switchChain(config, { chainId: network });
      }
      console.log(network, token, inAmount);
      if (network && token && inAmount) {
        if (network !== 137) {
          console.log("hello");
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DLN_API}/dln/order/create-tx`,
            {
              params: {
                srcChainId: `${network}`,
                srcChainTokenIn: `${token.address}`,
                srcChainTokenInAmount: `${
                  Number(inAmount) * 10 ** token?.decimals
                }`,
                dstChainId: polygonChainID,
                dstChainTokenOut: polygonUSDCEAddress,
                srcChainOrderAuthorityAddress: address,
                dstChainTokenOutRecipient: tokenOutRecipientAddress,
                dstChainOrderAuthorityAddress: address,
              },
            }
          );
          const txData = res.data.tx;
          console.log(txData);
          await sendTransaction(txData);
          setLoading(true);
        } else {
          if (token.address !== polygonUSDCEAddress) {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_DLN_FINANCE_API}/chain/transaction`,
              {
                params: {
                  chainId: `${network}`,
                  tokenIn: `${token.address}`,
                  tokenInAmount: `${Number(inAmount) * 10 ** token?.decimals}`,
                  tokenOut: polygonUSDCEAddress,
                  tokenOutRecipient: tokenOutRecipientAddress,
                },
              }
            );
            const txData = res.data.tx;
            console.log(txData);
            await sendTransaction(txData);
            setLoading(true);
          } else {
            try {
              console.log("depsit------");
              setDepositAmount(Number(inAmount));
              depositHandler();
            } catch (error) {
              console.error("Error:", error);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [chainId, network, token, inAmount, address]);

  return (
    <div className="p-3">
      <div className="ml-auto mr-auto w-full max-w-96 h-full box-border flex flex-col space-y-5">
        {selectCrypto === false && (
          <>
            <p className="text-2xl font-bold text-white">Deposit</p>
            <div
              className="ml-auto mr-auto w-full h-full box-border flex flex-col border-white/50 border rounded-lg p-3 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              onClick={() => selectTokenClicked()}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Badge
                  isOneChar
                  content={
                    <Avatar
                      src={SUPPORTED_CHAINS[network]} // Replace with the yellow icon source
                      size="sm"
                      alt="Network"
                      imgProps={{ className: "opacity-100" }}
                      className="w-[20px] h-[20px]"
                    />
                  }
                  shape="circle"
                  placement="bottom-right"
                  classNames={{
                    badge: "border-1 bottom-[-5px] right-[-5px]",
                  }}
                >
                  <Avatar
                    radius="full"
                    showFallback
                    fallback={<div className="size-full bg-gray-400"></div>}
                    src={token?.logoURI}
                    size="lg"
                    imgProps={{
                      className: "opacity-100 w-10 h-10",
                    }}
                  />
                </Badge>
                <div className="text-center align-middle !text-white/70 flex flex-col grow">
                  {network === 0 && <>Select chain and token</>}
                  {network !== 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-left text-2xl">
                          {token?.symbol}
                        </span>
                        <span className="text-left text-2xl">
                          {tokenBalance}
                        </span>
                      </div>
                      <span className="text-left text-sm">
                        on {Network[network.toString()]}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="ml-auto mr-auto w-full h-full box-border flex flex-col border-white/50 border rounded-lg p-3">
              <div className="flex flex-row mt-2 gap-5">
                <div className="w-40">
                  <p className="text-white">You pay</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-transparent">
                    <Input
                      type="number"
                      placeholder="0"
                      classNames={{
                        input: "text-3xl !text-white/70",
                        inputWrapper:
                          "bg-transparent p-0 group-data-[focus=true]:bg-transparent",
                      }}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="!text-white/50">{`$${
                      Math.round(usdPrice * 100) / 100
                    }`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="place-button w-full"
                onClick={confirmDeposit}
                disabled={isPending}
              >
                {loading ? "Pending..." : "Deposit"}
              </button>

              {/* <JButton
                onClick={confirmDeposit}
                className="place-button w-full"
                loading={loading}
                disabled={disabled || isPending || isConfirming}
              >
                Deposit
              </JButton> */}
            </div>
          </>
        )}
        {selectCrypto === true && (
          <SelectCrypto
            showSelectCrypto={showSelectCrypto}
            selectToken={handleSelectToken}
          ></SelectCrypto>
        )}
      </div>
    </div>
  );
};

export default Deposit;
