"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { EventInterface, MarketInterface } from "@/interfaces/market.interface";
import { setMarketImage } from "@/providers/redux/MarketSlice";
import { formatDate } from "@/util/formatDate";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import EventGraph from "./EventGraph";
import EventMarket from "./EventMarket";
import { sortByMarkets } from "@/util/sortByMarkets";

interface PropsInterface {
  eventData: EventInterface;
  selectedMarket: MarketInterface | null;
}

export interface AIInsight {
  eventId: string;
  title: string;
  description: string;
  winnerMarketId: string;
  winnerMarketPosition: number;
  reason: string;
}

const EventDetail: React.FC<PropsInterface> = ({ eventData, selectedMarket }) => {
  const dispatch = useDispatch();

  const [markets, setMarkets] = useState<MarketInterface[]>([]);
  const [showDesc, setShowDesc] = useState(false);
  const [aiInsight, setAIInsight] = useState<AIInsight>();

  useEffect(() => {
    const _markets: MarketInterface[] = sortByMarkets(eventData);

    dispatch(
      setMarketImage({
        image: eventData.image,
      })
    );

    setMarkets(_markets);
  }, [dispatch, eventData]);

  const fetchAIInsight = async () => {
    try {
      if (aiInsight) {
        return;
      }
      const res = await axios.post<AIInsight>("https://api.sportsgambit.io/gamble-gpt/polymarket-ai-insights", {
        event: { ...eventData, markets: eventData.markets.filter((item) => !item.automaticallyResolved) },
      });

      setAIInsight(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-5">
        <div
          className="w-[40px] lg:w-[70px] h-[40px] lg:h-[70px] bg-top bg-no-repeat bg-cover rounded-lg"
          style={{ backgroundImage: "url(" + eventData.image + ")" }}
        />
        <p className="text-lg lg:text-3xl text-white font-semibold">{eventData.title}</p>
      </div>
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-5">
          <p className="text-sm lg:text-md text-neutral-400">
            ${Math.floor(eventData.volume)}Vol.
          </p>
          <div className="flex gap-1 items-center">
            <AccessTimeOutlinedIcon className="text-[16px] text-neutral-400" />
            <p className="text-sm lg:text-md text-neutral-400">{formatDate(eventData.endDate)}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <StarBorderIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
          <CodeOutlinedIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
          <LinkOutlinedIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
        </div>
      </div>
      {eventData && eventData?.markets.length === 1 ? (
        <EventGraph market={eventData.markets[0]} />
      ) : (
        <EventMarket markets={markets} selectedMarket={selectedMarket} aiInsight={aiInsight} />
      )}

      <div className="mt-5 w-full">
        <p className="text-xl text-white border-b border-neutral-900 pb-2">
          Rules
        </p>
        <p
          className={`text-md text-neutral-400 pt-3 ${!showDesc && "h-[30px] overflow-y-hidden"}`}
        >
          {markets[0]?.description}
        </p>
        <div className="flex items-center mt-3 cursor-pointer" onClick={() => setShowDesc(!showDesc)}>
          <p className="text-md text-neutral-400">{showDesc ? "Show Less" : "Show More"}</p>
          {showDesc ? (
            <KeyboardArrowUpIcon className="text-neutral-400" />
          ) : (
            <KeyboardArrowDownIcon className="text-neutral-400" />
          )}
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="border-b border-neutral-900 pb-2 flex justify-between">
          <span className="text-xl text-white">AI Insight</span>
          <button
            className="bg-[#BCFF00] text-black font-semibold py-2 px-4 text-base rounded-lg"
            onClick={fetchAIInsight}
          >
            Generate
          </button>
        </div>
        {aiInsight && <div className="mt-5 text-neutral-600">{aiInsight.reason}</div>}
      </div>
    </div>
  );
};

export default EventDetail;
