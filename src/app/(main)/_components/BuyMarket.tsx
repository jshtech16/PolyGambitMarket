import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SyncIcon from '@mui/icons-material/Sync';
import SettingsIcon from '@mui/icons-material/Settings';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import { NotificationType } from "@/interfaces/ui.interface";

import { useSelector } from "react-redux";
import {
  MarketGroupItemTitle, MarketImage, MarketOutcomes,
  MarketClobIds, MarketBestPrice
} from "@/providers/redux/MarketSlice";
import { walletaddress, userBalance } from "@/providers/redux/WalletSlice";
import { getUserPolyTokenBalance } from "@/util/web3";

import Snipping from "./Snipping";

const BuyMarket = () => {
  const activeMarketImage = useSelector(MarketImage);
  const activeMarketGroupItemTitle = useSelector(MarketGroupItemTitle);
  const activeMarketOutcomes = useSelector(MarketOutcomes);
  const activeMarketClobIds = useSelector(MarketClobIds);
  const activeMarketBestPrice = useSelector(MarketBestPrice);
  const rdxWalletaddress = useSelector(walletaddress);
  const rdxUserBalance = useSelector(userBalance);

  const [isOpen, setIsOpen] = useState(false);
  const [market, setMarket] = useState('Markets');
  const [isBuy, setIsBuy] = useState(true);
  const [isYes, setIsYes] = useState(true);
  const [settingMarket, setSettingMarket] = useState('Market');
  const [tolerance, setTolerance] = useState(0);
  const [outcomeSetting, setOutcomeSetting] = useState(false);
  const [shareBalance, setShareBalance] = useState<number[]>([]);
  const [tradePrice, setTradePrice] = useState<number>(0);
  const [tradeAmount, setTradeAmount] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [msgType, setMsgType] = useState<NotificationType>("success");
  const pushMessage = (msgText: string, msgType: NotificationType) => {
    setMsgOpen(false);
    setTimeout(() => {
      setMsgText(msgText);
      setMsgType(msgType);
      setMsgOpen(true);
    }, 500);
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const showMarkets = (param: string) => {
    setMarket(param);
    setIsOpen(false);
  }

  const tradeHandler = useCallback(() => {
    console.log("isBuy, isYes, tradeAmount, tradePrice")
    console.log(isBuy, isYes, tradeAmount, tradePrice)
    console.log("shareBalance, rdxUserBalance, activeMarketClobIds")
    console.log(shareBalance, rdxUserBalance, activeMarketClobIds)
    const tradeAmt = Number(tradeAmount);
    if (tradeAmt == 0) {
      pushMessage("Enter trade amount", "error")
      return;
    }
    if (isBuy) {
      if (tradeAmt > rdxUserBalance) {
        pushMessage("Overflow your USDC balance", "error")
        return
      }
    }
    else {
      if (isYes) {
        if (tradeAmt > shareBalance[0]) {
          pushMessage("Overflow your share balance", "error")
          return
        }
      }
      else {
        if (tradeAmt > shareBalance[1]) {
          pushMessage("Overflow your share balance", "error")
          return
        }
      }
    }

    const run = async() => {
      try {
        setLoading(true);
        const ret = await axios.post(
          `${process.env.NEXT_PUBLIC_API}order/createOrder`,
          {
            chain: "polygon",
            tokeId: isYes?activeMarketClobIds[0]:activeMarketClobIds[1],
            price: tradePrice,
            side: isBuy?"buy":"sell",
            size: tradeAmt,
            wallet: rdxWalletaddress,
          }
        );
        if (ret.data.state == "err") {
          pushMessage(ret.data.code.split(".")[0], "error");
        } else if (ret.data.data == false) {
          pushMessage(ret.data.code, "error");
        }
        else {
          pushMessage("Success", "success");
        }
        setLoading(false);
      } catch (error) {
        pushMessage(error as string, "error");
      }
    }
    run();
  }, [
    isBuy, isYes, tradeAmount, tradePrice,
    shareBalance, rdxUserBalance, activeMarketClobIds,
    rdxWalletaddress
  ])

  useEffect(() => {
    if (activeMarketBestPrice.length > 0) {
      if (isBuy) {
        if (isYes) {
          setTradePrice(activeMarketBestPrice[0])
        }
        else {
          setTradePrice(1-activeMarketBestPrice[1])
        }
      }
      else {
        if (isYes) {
          setTradePrice(activeMarketBestPrice[1])
        }
        else {
          setTradePrice(1-activeMarketBestPrice[0])
        }
      }
    }
    else {
      setTradePrice(0);
    }
  }, [isBuy, isYes, activeMarketBestPrice]);

  useEffect(() => {
    const run = async() => {
      const chain = 'polygon'
      const ret = await getUserPolyTokenBalance(chain, activeMarketClobIds, rdxWalletaddress)
      if (ret.state == 'ok') {
        setShareBalance(ret.data);
      }
      else {
        const tmp: number[] = new Array(activeMarketClobIds.length).fill(0);
        setShareBalance(tmp);
      }
    }
    if (rdxWalletaddress != "" && activeMarketClobIds.length > 0) {
      run();
    }
    else {
      setShareBalance([]);
    }
  }, [rdxWalletaddress, activeMarketClobIds])

  return (
    <>
      {loading && <Snipping></Snipping>}

      <div className="w-[350px] border border-neutral-800 rounded-lg shadow-lg">
        <div className="flex items-center gap-5 px-5 pt-5">
          <div
            className="w-[40px] h-[40px] bg-top bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: 'url(' + activeMarketImage + ')' }}
          />
          <p className="text-lg text-white">{activeMarketGroupItemTitle}</p>
        </div>
        <div className="flex justify-between border-b border-neutral-800 px-5 pt-5">
          <div className="flex">
            <p
              className={`text-md text-white px-2 pb-2 cursor-pointer ${isBuy && 'border-b-[2px] border-[#BCFF00]'}`}
              onClick={() => setIsBuy(true)}
            >Buy</p>
            <p
              className={`text-md text-white px-2 pb-2 cursor-pointer ${!isBuy && 'border-b-[2px] border-[#BCFF00]'}`}
              onClick={() => setIsBuy(false)}
            >Sell</p>
          </div>
          <div className="relative">
            <div>
              <button className="text-md text-white flex justify-end items-center gap-1 w-[100px]" onClick={toggleCollapse}>
                <span>{market}</span>
                {
                  isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
              </button>
            </div>
            { isOpen &&
              <div className="absolute shadow-xl w-full bg-neutral-900 top-[35px] rounded-lg flex flex-col z-50 overflow-hidden">
                {
                  ['Markets', 'Limit', 'AMM'].map((ele, idx) => (
                    <p
                      className="text-sm text-white hover:bg-neutral-800 cursor-pointer px-3 py-2"
                      onClick={() => showMarkets(ele)}
                      key={idx}
                    >
                      {ele}
                    </p>
                  ))
                }
              </div>
            }
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-end">
            <p className="text-md text-white">Outcome</p>
            <div className="relative flex gap-2">
              <SyncIcon
                className="text-[17px] text-white cursor-pointer"
                onClick={() => setIsYes(true)}
              />
              <SettingsIcon
                className="text-[17px] text-white cursor-pointer"
                onClick={() => setOutcomeSetting(!outcomeSetting)}
              />
              { outcomeSetting &&
                <div className="absolute top-[25px] right-0 border border-neutral-900 rounded-lg bg-black w-[300px] z-50 p-3">
                  <p className="text-md text-white">Default order type</p>
                  <div className="flex gap-2 mt-3">
                    {
                      ['Market', 'Limit', 'AMM'].map((ele, idx) => (
                        <p
                          className={`flex-1 font-semibold py-2 text-xs text-center rounded-lg cursor-pointer ${settingMarket === ele ? 'bg-[#BCFF00] text-black' : 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]'}`}
                          onClick={() => setSettingMarket(ele)}
                          key={idx}
                        >
                          {ele}
                        </p>
                      ))
                    }
                  </div>
                  <p className="text-md text-white mt-3">Slippage tolerance</p>
                  <div className="flex gap-2 mt-3">
                    {
                      [0.1, 0.5, 1].map((ele, idx) => (
                        <p
                          className={`flex-1 font-semibold py-2 text-xs text-center rounded-lg cursor-pointer ${tolerance === ele ? 'bg-[#BCFF00] text-black' : 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]'}`}
                          onClick={() => setTolerance(ele)}
                          key={idx}
                        >
                          {ele}%
                        </p>
                      ))
                    }
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 text-xs font-semibold py-2 rounded-lg ${isYes ? 'bg-[#BCFF00] text-black' : 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]'}`}
              onClick={() => setIsYes(true)}
            >{activeMarketOutcomes?.split('"')[1]} {isBuy?Math.round(activeMarketBestPrice[0]*100):Math.round(activeMarketBestPrice[1]*100)}{`¢`}</button>
            <button
              className={`flex-1 text-xs font-semibold py-2 rounded-lg ${isYes ? 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]' : 'bg-[#BCFF00] text-black'}`}
              onClick={() => setIsYes(false)}
            >{activeMarketOutcomes?.split('"')[3]} {isBuy?Math.round((1-activeMarketBestPrice[1])*100):Math.round((1-activeMarketBestPrice[0])*100)}{`¢`}</button>
          </div>
          { market === "Limit" ?
            <div>
              <div className="flex justify-between items-end">
                <p className="text-md text-white mt-3">Limit Price</p>
              </div>
              <div className="relative mt-2">
                <p className="absolute left-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">-</p>
                <input type="text" className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-neutral-900 text-white" />
                <p className="absolute right-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">+</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-md text-white mt-3">Shares</p>
              </div>
              <div className="relative mt-2">
                <p className="absolute left-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">-</p>
                <input type="text" className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-neutral-900 text-white" />
                <p className="absolute right-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">+</p>
              </div>
              <div>
                <p className="text-md text-white mt-3">Set Expiration</p>
              </div>
            </div>
          :
            <div>
              {isBuy?
                <div className="flex justify-between items-end">
                  <p className="text-md text-white mt-3">Amount</p>
                  <div className="flex gap-2">
                    <p className="text-xs bg-neutral-900 text-white px-2 py-[2px] rounded-full">Balance ${Math.round(rdxUserBalance*100)/100}</p>
                    <p
                      className="text-xs bg-neutral-900 bg-white text-black rounded-full px-2 py-[2px] cursor-pointer"
                      onClick={() => setTradeAmount(String(rdxUserBalance))}
                    >Max</p>
                  </div>
                </div>
              :
                <div className="flex justify-between items-end">
                  <p className="text-md text-white mt-3">Shares</p>
                  <div className="flex gap-2">
                    <p className="text-xs bg-neutral-900 text-white px-2 py-[2px] rounded-full">{isYes?shareBalance[0]:shareBalance[1]}</p>
                    <p
                      className="text-xs bg-white text-black rounded-full px-2 py-[2px] cursor-pointer"
                      onClick={() => setTradeAmount(String(isYes?shareBalance[0]:shareBalance[1]))}
                    >Max</p>
                  </div>
                </div>
              }
              
              <div className="relative mt-2">
                <p
                  className="absolute left-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800"
                  onClick={() => {
                    if (Number(tradeAmount) >= 1) {
                      setTradeAmount(String(Number(tradeAmount)-1))
                    }
                    else {
                      setTradeAmount("0")
                    }
                  }}
                >-</p>
                <input
                  type="text" className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-neutral-900 text-white"
                  value={tradeAmount}
                  onChange={e => setTradeAmount(e.target.value)}
                />
                <p
                  className="absolute right-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800"
                  onClick={() => {
                    setTradeAmount(String(Number(tradeAmount)+1))
                  }}
                >+</p>
              </div>
            </div>
          }

          <button
            className="w-full bg-[#BCFF00] text-black font-semibold py-2 text-base rounded-lg mt-4"
            onClick={() => tradeHandler()}
          >{isBuy ? "Buy" : "Sell"}</button>
          { market === "Limit" ?
            <div className="flex justify-between mt-4">
                <p className="text-neutral-400 text-sm">Total</p>
                <p className="text-white">0$</p>
            </div>
          :
            <div>
              { market === "Markets" ?
                <div>
                  <div className="flex justify-between mt-4">
                    <p className="text-neutral-400 text-sm">Avg Price</p>
                    <p className="text-white">{Math.round(tradePrice*100)}{`¢`}</p>
                  </div>
                  {isBuy?
                    <div className="flex justify-between">
                      <p className="text-neutral-400 text-sm">Shares</p>
                      <p className="text-white">{tradePrice>0?Math.round(Number(tradeAmount)/tradePrice*100)/100:0}</p>
                    </div>
                  :
                    <div className="flex justify-between">
                      <p className="text-neutral-400 text-sm">Est. amount received</p>
                      <p className="text-white">${Math.round(tradePrice * Number(tradeAmount) * 100)/100}</p>
                    </div>
                  }
                  
                </div>
              :
                <div>
                  <div className="flex justify-between mt-4">
                    <p className="text-neutral-400 text-sm">Avg Price</p>
                    <p className="text-white">0$</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-neutral-400 text-sm">Est.shares</p>
                    <p className="text-white">0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-neutral-400 text-sm">LP fee</p>
                    <p className="text-white">0%</p>
                  </div>
                </div>
              }
            </div>
          }
          {isBuy &&
            <div className="flex justify-between">
              <p className="text-neutral-400 text-sm">Potential return</p>
              <p className="text-white">${tradePrice>0?Math.round(Number(tradeAmount)/tradePrice*100)/100:0}({tradePrice>0?Math.round(100/tradePrice-100):"0.00"}%)</p>
            </div>
          }
          <p className="text-sm text-neutral-400 w-full text-center mt-3">By trading, you agree to the Terms of Use</p>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={msgOpen}
        autoHideDuration={6000}
        onClose={() => {
          setMsgOpen(false);
        }}
        >
        <Alert
          onClose={() => {
            setMsgOpen(false);
          }}
          severity={msgType}
          sx={{ width: "100%" }}
        >
          {msgText}
        </Alert>
      </Snackbar>
    </>
  )
}

export default BuyMarket;