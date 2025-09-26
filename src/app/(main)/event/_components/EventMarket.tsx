import "./style.scss";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { MarketInterface } from "@/interfaces/market.interface";
import { setMarket } from "@/providers/redux/MarketSlice";
import RedeemIcon from "@mui/icons-material/Redeem";

import { AIInsight } from "./EventDetail";
import EventGraph from "./EventGraph";
import { apiURL, axiosData } from "@/util/api";
import MobileEventMarket from "./MobileEventMarket";

interface PropsInterface {
  markets: MarketInterface[];
  selectedMarket: MarketInterface | null;
  aiInsight?: AIInsight;
}

const detailTab = [
  {
    label: "Order Book",
    slug: "order",
  },
  {
    label: "Graph",
    slug: "graph",
  }
];

const EventMarket: React.FC<PropsInterface> = ({ markets, selectedMarket, aiInsight }) => {
  const dispatch = useDispatch();

  const [activeMarket, setActiveMarket] = useState(-1);
  const [activeMarketCell, setActiveMarketCell] = useState("order");

  useEffect(() => {
    getHistoryPrices();
  }, [])

  const showMarket = (idx: number) => {
    if (activeMarket === idx) {
      setActiveMarket(-1);
    } else {
      setActiveMarket(idx);
    }
    dispatch(
      setMarket({
        groupItemTitle: markets[idx].groupItemTitle,
        image: markets[idx].image,
        outcomes: markets[idx].outcomes,
        clobIds: [markets[idx].clobTokenIds.split("\"")[1], markets[idx].clobTokenIds.split("\"")[3]],
        bestPrice: [markets[idx].bestAsk, markets[idx].bestBid]
      })
    );
    setActiveMarketCell("order");
  };

  const setDefaultActiveMarket = () => {
    setActiveMarket(-1);
  }

  useEffect(() => {
    if (markets.length) {
      if (selectedMarket == null) {
        dispatch(
          setMarket({
            groupItemTitle: markets[0].groupItemTitle,
            image: markets[0].image,
            outcomes: markets[0].outcomes,
            clobIds: [markets[0].clobTokenIds.split("\"")[1], markets[0].clobTokenIds.split("\"")[3]],
            bestPrice: [markets[0].bestAsk, markets[0].bestBid]
          })
        );
        setActiveMarket(0)
      }
      else {
        dispatch(
          setMarket({
            groupItemTitle: selectedMarket.groupItemTitle,
            image: selectedMarket.image,
            outcomes: selectedMarket.outcomes,
            clobIds: [selectedMarket.clobTokenIds.split("\"")[1], selectedMarket.clobTokenIds.split("\"")[3]],
            bestPrice: [selectedMarket.bestAsk, selectedMarket.bestBid]
          })
        )
        for (const x in markets) {
          if (markets[x].id == selectedMarket.id) {
            setActiveMarket(Number(x))
          }
        }
      }
    }
  }, [dispatch, markets, selectedMarket]);

  const getHistoryPrices = async () => {
    if (markets) {
      for (let idx = 0; idx < markets.length; idx++) {
        const _clobTokenIds = markets[idx].clobTokenIds.split('"')[1];
        const _historyPrices = await axiosData(apiURL.clobAPI + '/prices-history?interval=1m&market=' + _clobTokenIds + '&fidelity=180');
        markets[idx].historyPrices = _historyPrices.history;
      }
    }
  }

  return (
    <div>
      <div className="border-t border-neutral-900 px-3 py-4">
        <div className="flex w-full lg:w-1/2">
          <p className="flex-1 text-xs lg:text-sm text-neutral-400">OUTCOME</p>
          <p className="flex-1 text-xs lg:text-sm text-neutral-400 text-center">% CHANCE</p>
        </div>
      </div>
      {markets?.map((market, idx) => (
        <div key={idx}>
          <div
            className="flex justify-between items-center flex-col lg:flex-row gap-3 px-3 py-4 hover:bg-neutral-900 cursor-pointer rounded-lg"
            onClick={() => showMarket(idx)}
          >
            <div className="flex items-center w-full lg:w-1/2">
              <div className="flex-1">
                <p className="text-sm lg:text-base text-white">{market.groupItemTitle}</p>
                <div className="flex items-center">
                  <p className="text-xs lg:text-sm text-neutral-400">
                    ${Math.floor(market.volumeNum)}Vol.
                  </p>
                  <RedeemIcon className="text-[28px] p-2 text-neutral-400 cursor-pointer" />
                </div>
              </div>
              <p className="flex-1 text-center text-lg lg:text-3xl text-white font-semibold">
                {market.bestAsk * 100 < 1 ? '<1' : Math.floor(market.bestAsk * 100)}%
              </p>
            </div>
            <div className="flex justify-end gap-2 w-full lg:w-1/2">
              <button
                className={clsx(`buy-button bg-[#BCFF00] text-black`, {
                  "recommended-button": market.id === aiInsight?.winnerMarketId && aiInsight.winnerMarketPosition === 0,
                })}
              >
                Buy {market.outcomes.split('"')[1]} {Math.round(market.bestAsk * 100)}{`¢`}
              </button>
              <button
                className={clsx(`buy-button bg-[rgba(188,255,0,0.1)] text-[#BCFF00]`, {
                  "recommended-button": market.id === aiInsight?.winnerMarketId && aiInsight.winnerMarketPosition === 1,
                })}
              >
                Buy {market.outcomes.split('"')[3]} {Math.round((1 - market.bestBid) * 100)}{`¢`}
              </button>
            </div>
          </div>
          {activeMarket === idx && (
            <div className="py-4 hidden lg:block">
              <div className="flex gap-4 px-3 border-b border-neutral-900 mb-4">
                {detailTab.map((tab, jdx) => (
                  <p
                    className={`text-sm lg:text-base cursor-pointer ${activeMarketCell === tab.slug
                      ? "border-b-[2px] border-white text-white"
                      : "text-neutral-400"
                      }`}
                    onClick={() => setActiveMarketCell(tab.slug)}
                    key={jdx}
                  >
                    {tab.label}
                  </p>
                ))}
              </div>
              <div className="px-3">
                {activeMarketCell === "order" && (
                  <p className="text-sm lg:text-base text-white">Order</p>
                )}
                {activeMarketCell === "graph" && <EventGraph market={market} />}
              </div>
            </div>
          )}
          <div className="border-t border-neutral-900 mx-0 lg:mx-3"></div>
          {
            activeMarket !== -1 && <MobileEventMarket market={markets[activeMarket]} onClose={setDefaultActiveMarket} />
          }
        </div>
      ))}
    </div>
  );
};

export default EventMarket;
