import { MarketInterface } from "@/interfaces/market.interface";
import { useEffect, useState } from "react";

interface MarketForEventCardProps {
  openMarketHandle: (pmMarket: MarketInterface, outcome: string) => void
  market: MarketInterface;
}

const MarketForEventCard: React.FC<MarketForEventCardProps> = ({ market, openMarketHandle }) => {

  const [lastTradePrice, setLastTradePrice] = useState('')
  const [lastTradePriceReverse, setLastTradePriceReverse] = useState('')
  const [yes, setYes] = useState('Yes');
  const [no, setNo] = useState('No');

  useEffect(() => {
    if (Math.round(market.lastTradePrice * 100) <= 1) {
      setLastTradePrice('<1%');
      setLastTradePriceReverse('100%');
    } else {
      setLastTradePrice(String(Math.round(market.lastTradePrice * 100)) + '%');
      setLastTradePriceReverse(String(100 - Math.round(market.lastTradePrice * 100)) + '%')
    }
  }, [market.lastTradePrice])

  return (
    <div className="flex justify-between">
      <p className="text-sm text-white">{market.groupItemTitle}</p>
      <div className="flex gap-2 items-center">
        <p className="text-sm text-white">{lastTradePrice}</p>
        <button
          className="text-G0 hover:text-white text-xs font-medium bg-G3 hover:bg-G2 rounded-md w-[35px] h-[25px]"
          onMouseEnter={() => setYes(lastTradePrice)}
          onMouseLeave={() => setYes('Yes')}
          onClick={() => openMarketHandle(market, "Yes")}
        >{yes}</button>
        <button
          className="text-R0 hover:text-white text-xs font-medium bg-[rgba(255,0,0,0.1)] hover:bg-[#BB0000] rounded-md w-[35px] h-[25px]"
          onMouseEnter={() => setNo(lastTradePriceReverse)}
          onMouseLeave={() => setNo('No')}
          onClick={() => openMarketHandle(market, "No")}
        >{no}</button>
      </div>
    </div>
  )
}

export default MarketForEventCard;