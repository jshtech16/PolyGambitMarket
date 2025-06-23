import { EventInterface, MarketInterface } from "@/interfaces/market.interface";
import { getLastTradePrice } from "@/util/getLastTradePrice";
import { sortByMarkets } from "@/util/sortByMarkets";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from "next/link";

interface PropsInterface {
    title: string;
    data: EventInterface;
    showAll: boolean;
    event: string;
}

const SportsFutureFormOne: React.FC<PropsInterface> = ({ title, data, showAll, event }) => {

    const [markets, setMarkets] = useState<MarketInterface[] | null>(null);
    const [maxLastOutcomePrice, setMaxLastOutcomePrice] = useState(0);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const _maxLastOutcomePrice = Math.max(...data.markets.map(item => parseFloat(item.outcomePrices?.split('"')[1])));
        setMaxLastOutcomePrice(_maxLastOutcomePrice);
        const _markets = sortByMarkets(data);
        setMarkets(_markets);
    }, [data])

    return (
        <div className="flex-1 bg-neutral-900 rounded-lg p-5 cursor-pointer">
            <Link href={'/event/' + event}>
                <p className="text-xl text-white font-semibold hover:underline">{title}</p>
            </Link>
            <div className="flex flex-col gap-3 mt-5">
                {
                    markets?.map((market, idx) => (
                        <div className={`flex gap-[50px] items-center ${idx > 4 && !showMore && 'hidden'}`} key={idx}>
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] h-[25px] bg-top bg-no-repeat bg-cover" style={{ backgroundImage: "url(" + market.image + ")" }}></div>
                                <p className="text-sm text-white w-[100px] overflow-x-hidden">{market.groupItemTitle}</p>
                            </div>
                            <div className="flex-1 flex gap-2 items-center">
                                <p className="text-xl text-white font-semibold w-[50px] text-right">{getLastTradePrice(Number(market.outcomePrices?.split('"')[1])).lastTradePrice}</p>
                                <div className="flex-1">
                                    <div
                                        className="min-w-[20px] max-w-[100%] h-[30px] rounded-lg"
                                        style={{
                                            width: Math.floor(market.lastTradePrice * 100 / maxLastOutcomePrice) + '%',
                                            backgroundColor: Math.floor(market.lastTradePrice * 100 / maxLastOutcomePrice) > 75 ? '#BFF816'
                                                :
                                                Math.floor(market.lastTradePrice * 100 / maxLastOutcomePrice) < 30 ? '#FF0000' : '#0000FF'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                showAll &&
                <div className="flex items-center mt-3 cursor-pointer" onClick={() => setShowMore(!showMore)}>
                    <p className="text-md text-neutral-400">{showMore ? 'Show Less' : 'Show More'}</p>
                    {
                        showMore ?
                            <KeyboardArrowUpIcon className='text-neutral-400' />
                            :
                            <KeyboardArrowDownIcon className='text-neutral-400' />
                    }
                </div>
            }
        </div>
    )
}

export default SportsFutureFormOne;