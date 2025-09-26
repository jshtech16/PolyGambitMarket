import "./style.scss";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { AIInsight } from "@/app/(main)/event/_components/EventDetail";
import { MarketInterface } from "@/interfaces/market.interface";

interface RecommendedMarketCardProps {
  openMarketHandle: (pmMarket: MarketInterface, outcome: string) => void;
  market: MarketInterface;
  aiInsight?: AIInsight;
}

const RecommendedMarketCard: React.FC<RecommendedMarketCardProps> = ({ market, openMarketHandle, aiInsight }) => {
  const [lastTradePrice, setLastTradePrice] = useState("");
  const [lastTradePriceReverse, setLastTradePriceReverse] = useState("");
  const [yes, setYes] = useState("Yes");
  const [no, setNo] = useState("No");

  useEffect(() => {
    if (Math.round(market.lastTradePrice * 100) <= 1) {
      setLastTradePrice("<1%");
      setLastTradePriceReverse("100%");
    } else {
      setLastTradePrice(String(Math.round(market.lastTradePrice * 100)) + "%");
      setLastTradePriceReverse(String(100 - Math.round(market.lastTradePrice * 100)) + "%");
    }
  }, [market.lastTradePrice]);

  return (
    <div className="flex justify-between">
      <p className="text-sm text-white">{market.groupItemTitle}</p>
      <div className="flex gap-2 items-center">
        <p className="text-sm text-white">{lastTradePrice}</p>
        <button
          className={clsx(
            `ai-buy-button text-G0 hover:text-white text-xs font-medium bg-G3 hover:bg-G2 rounded-md w-[35px] h-[25px]`,
            {
              "recommended-button": market.id === aiInsight?.winnerMarketId && aiInsight?.winnerMarketPosition === 0,
            }
          )}
          onMouseEnter={() => setYes(lastTradePrice)}
          onMouseLeave={() => setYes("Yes")}
          onClick={() => openMarketHandle(market, "Yes")}
        >
          {yes}
        </button>
        <button
          className={clsx(
            `ai-buy-button text-R0 hover:text-white text-xs font-medium bg-[rgba(255,0,0,0.1)] hover:bg-[#BB0000] rounded-md w-[35px] h-[25px]`,
            {
              "recommended-button": market.id === aiInsight?.winnerMarketId && aiInsight?.winnerMarketPosition === 1,
            }
          )}
          onMouseEnter={() => setNo(lastTradePriceReverse)}
          onMouseLeave={() => setNo("No")}
          onClick={() => openMarketHandle(market, "No")}
        >
          {no}
        </button>
      </div>
    </div>
  );
};

export default RecommendedMarketCard;
