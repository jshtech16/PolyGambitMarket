import "./style.scss";

import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Snipping from "@/app/(main)/_components/Snipping";
import { AIInsight } from "@/app/(main)/event/_components/EventDetail";
import ProgressBar from "@/components/ProgressBar";
import { EventInterface, MarketInterface } from "@/interfaces/market.interface";
import { NotificationType } from "@/interfaces/ui.interface";
import { userBalance, walletaddress } from "@/providers/redux/WalletSlice";
import { formatNumber } from "@/util/formatNumber";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";

import RecommendedMarketCard from "./RecommendedMarket";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RecommendCardProps {
  event: EventInterface;
  aiInsight?: AIInsight;
}

const RecommendCard: React.FC<RecommendCardProps> = ({ event, aiInsight }) => {
  const rdxwalletaddress = useSelector(walletaddress);
  const rdxuserBalance = useSelector(userBalance);

  const [markets, setMarkets] = useState<MarketInterface[]>([]);

  const [tokenId, setTokenId] = useState<string>("");
  const [bidSize, setBidSize] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [openMarket, setOpenMarket] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<MarketInterface | null>(
    null
  );
  const [outcomeTitle, setOutcomeTitle] = useState<string>("");
  const [outcomeColor, setOutcomeColor] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [msgOpen, setMsgOpen] = React.useState(false);
  const [msgText, setMsgText] = React.useState("");
  const [msgType, setMsgType] = React.useState<NotificationType>("success");
  const pushMessage = (msgText: string, msgType: NotificationType) => {
    setMsgOpen(false);
    setTimeout(() => {
      setMsgText(msgText);
      setMsgType(msgType);
      setMsgOpen(true);
    }, 500);
  };

  const openMarketHandle = (pmMarket: MarketInterface, outcome: string) => {
    setSelectedMarket(pmMarket);
    setOpenMarket(true);
    setOutcomeTitle(outcome);
    if (
      (pmMarket.outcomes && outcome == pmMarket.outcomes.split('"')[1]) ||
      outcome == "Yes"
    ) {
      setPrice(Number(pmMarket.outcomePrices.split('"')[1]));
      setTokenId(pmMarket.clobTokenIds.split('"')[1]);
      setOutcomeColor(true);
    } else {
      setPrice(Number(pmMarket.outcomePrices.split('"')[3]));
      setTokenId(pmMarket.clobTokenIds.split('"')[3]);
      setOutcomeColor(false);
    }
  };

  const placeBetHandler = useCallback(() => {
    const run = async () => {
      setLoading(true);
      try {
        const size = Math.round((Number(bidSize) / price) * 10000) / 10000;
        const ret = await axios.post(
          `${process.env.NEXT_PUBLIC_API}order/createOrder`,
          {
            chain: "polygon",
            tokeId: tokenId,
            price: Number(price),
            side: "buy",
            size: size,
            wallet: rdxwalletaddress,
          }
        );
        if (ret.data.state == "err") {
          pushMessage(ret.data.code.split(".")[0], "error");
        } else if (ret.data.data == false) {
          pushMessage(ret.data.code, "error");
        } else {
          pushMessage("Success", "success");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        pushMessage(error as string, "error");
      }
    };
    run();
  }, [bidSize, price, tokenId, rdxwalletaddress]);

  useEffect(() => {
    let _markets: MarketInterface[] = [];
    _markets = event.markets.filter((item) => !item.automaticallyResolved);
    if (event.sortBy === "price") {
      _markets = _markets.sort((b, a) => a.lastTradePrice - b.lastTradePrice);
    } else if (event.sortBy === "ascending") {
      _markets = _markets.sort(
        (a, b) => Number(a.groupItemThreshold) - Number(b.groupItemThreshold)
      );
    }
    setMarkets(_markets);
  }, [event.markets, event.sortBy]);

  return (
    <>
      {loading && <Snipping></Snipping>}
      <div className="w-full grow min-h-80 flex flex-col justify-between bg-black bg-[linear-gradient(107.7deg,rgba(0,0,0,0)_37.9%,rgba(96,4,213,0.2)_113.22%),linear-gradient(248.12deg,rgba(24,20,32,0)_35.67%,#292929_101.76%)] rounded-lg pt-5 shadow-md hover:shadow-lg">
        <div className="flex items-center justify-between gap-3 px-5">
          {!(openMarket == true && selectedMarket != null) && (
            <div className="pb-5 flex items-center justify-between gap-5">
              <div
                className="w-[40px] h-[40px] overflow-hidden rounded-md bg-top bg-no-repeat bg-cover"
                style={{ backgroundImage: "url(" + event.image + ")" }}
              ></div>
              <div
                className="min-h-12 overflow-hidden flex justify-center flex-col"
                style={{ width: "calc(100% - 52px)" }}
              >
                <Link href={"/event/" + event.slug}>
                  <p
                    className={`text-sm text-white font-medium overflow-hidden cursor-pointer hover:underline ${markets.length === 1 &&
                      markets[0].groupItemTitle &&
                      "h-[20px]"
                      }`}
                  >
                    {event.title}
                  </p>
                </Link>
                {markets.length === 1 && markets[0].groupItemTitle && (
                  <p className="text-sm text-white font-medium h-[20px] cursor-pointer">
                    {markets[0].groupItemTitle}
                  </p>
                )}
              </div>
            </div>
          )}
          {markets.length === 1 && markets[0].lastTradePrice && (
            <ProgressBar val={markets[0].lastTradePrice * 100} />
          )}
        </div>
        <div
          className={`flex flex-col grow gap-1 ${openMarket == true && selectedMarket != null
            ? "flex-grow"
            : "h-[6rem] overflow-y-scroll"
            } hide-scroll px-5`}
        >
          {openMarket == true && selectedMarket != null ? (
            <div>
              <div className="flex justify-between">
                <div className="text-sm text-white">
                  {selectedMarket.groupItemTitle}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setOpenMarket(false)}
                >
                  <CloseIcon></CloseIcon>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 flex border rounded-xl p-2">
                  <div>$</div>
                  <div className="flex-grow">
                    <input
                      className="w-full outline-none bg-transparent border-none text-white"
                      placeholder="0"
                      value={bidSize}
                      onChange={(e) => setBidSize(e.target.value)}
                    ></input>
                  </div>
                  <div
                    className="bg-slate-800/20 p-1 px-2 rounded-lg cursor-pointer hover:bg-slate-800/30 text-xs mr-1 text-white"
                    onClick={() =>
                      setBidSize((oldState) => String(Number(oldState) + 1))
                    }
                  >
                    +1
                  </div>
                  <div
                    className="bg-slate-800/20 p-1 px-2 rounded-lg cursor-pointer hover:bg-slate-800/30 text-xs text-white"
                    onClick={() => setBidSize(String(rdxuserBalance))}
                  >
                    Max
                  </div>
                </div>
                <div className="w-1/2 px-4 pt-1">
                  <Slider
                    classes={{
                      mark: "text-indigo-900",
                      markLabel: "text-foreground",
                      valueLabel: "text-foreground",
                      rail: "text-indigo-100",
                      thumb: "text-indigo-400",
                      track: "text-slate-400",
                      active: "text-indigo-400",
                    }}
                    defaultValue={0}
                    value={Number(bidSize)}
                    onChange={(e, v) => {
                      setBidSize(String(v));
                    }}
                    min={0}
                    max={rdxuserBalance}
                    step={0.01}
                    valueLabelDisplay="off"
                  />
                </div>
              </div>
              <div
                className={`${outcomeColor
                  ? "bg-background-button text-[#171717]"
                  : "bg-background-button-2nd"
                  } cursor-pointer text-center p-2 rounded-xl mt-2 hover:opacity-80`}
              >
                <div className="font-medium" onClick={() => placeBetHandler()}>
                  Buy {outcomeTitle}
                </div>
                <div className="text-xs">
                  To win $
                  {price == 0
                    ? "0.00"
                    : Number(Number(bidSize) / price).toFixed(2)}
                </div>
              </div>
            </div>
          ) : markets?.length > 1 ? (
            markets.map((market, index) => (
              <RecommendedMarketCard
                key={index}
                market={market}
                openMarketHandle={openMarketHandle}
                aiInsight={aiInsight}
              />
            ))
          ) : (
            markets?.length == 1 && (
              <div className="flex items-end gap-2 h-[75px] pb-2">
                <button
                  className={clsx(
                    `ai-buy-button flex justify-center items-center gap-1 bg-[rgba(54,178,8,0.2)] hover:bg-[#1D8800] rounded-lg px-2 py-2 flex-1 text-[#BFF816] hover:text-white`,
                    {
                      "recommended-button":
                        markets[0].id === aiInsight?.winnerMarketId &&
                        aiInsight?.winnerMarketPosition === 0,
                    }
                  )}
                  onClick={() =>
                    openMarketHandle(
                      markets[0],
                      markets[0].outcomes.split('"')[1] || "Yes"
                    )
                  }
                >
                  <p className="text-sm font-medium">
                    Bet {markets[0].outcomes.split('"')[1] || "Yes"}
                  </p>
                  <KeyboardDoubleArrowUpIcon className="text-[11px]" />
                </button>
                <button
                  className={clsx(
                    `ai-buy-button flex justify-center items-center gap-1 bg-[rgba(255,0,0,0.1)] hover:bg-[#BB0000] rounded-lg px-2 py-2 flex-1 text-red hover:text-white`,
                    {
                      "recommended-button":
                        markets[0].id === aiInsight?.winnerMarketId &&
                        aiInsight?.winnerMarketPosition === 1,
                    }
                  )}
                  onClick={() =>
                    openMarketHandle(
                      markets[0],
                      markets[0].outcomes.split('"')[3] || "No"
                    )
                  }
                >
                  <p className="text-sm font-medium">
                    Bet {markets[0].outcomes.split('"')[3] || "No"}
                  </p>
                  <KeyboardDoubleArrowDownIcon className="text-[11px]" />
                </button>
              </div>
            )
          )}
        </div>
        <div className="flex justify-between px-5 py-2 bg-[linear-gradient(0deg,rgba(35,34,36,0.8),rgba(35,34,36,0.8)),linear-gradient(248.12deg,rgba(24,20,32,0)_35.67%,#292929_101.76%),linear-gradient(106.24deg,rgba(0,0,0,0)_38.72%,rgba(96,4,213,0.5)_104.16%)] rounded-b-lg">
          <div className="flex gap-2">
            <div className="bg-[rgba(191,248,16,0.2)] hover:bg-[#1D8800] w-[20px] h-[20px] flex justify-center items-center rounded-md cursor-pointer">
              <Image
                src="/assets/img/icons/pin.svg"
                alt=""
                className="w-[15px] h-[15px]"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm text-white">
              ${event.volume && formatNumber(event.volume)} Vol.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/assets/img/icons/present.svg"
              alt=""
              className="cursor-pointer w-[15px] h-[15px]"
              width={100}
              height={100}
            />
            <div className="flex gap-1 cursor-pointer items-center">
              <Image
                src="/assets/img/icons/msg.svg"
                alt=""
                className="w-[15px] h-[15px]"
                width={100}
                height={100}
              />
              <p className="text-sm text-white">
                {event.commentCount ? event.commentCount.toLocaleString() : 0}
              </p>
            </div>
            <Image
              src="/assets/img/icons/star-blank.svg"
              alt=""
              className="cursor-pointer w-[15px] h-[15px]"
              width={100}
              height={100}
            />
          </div>
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
  );
};

export default RecommendCard;
