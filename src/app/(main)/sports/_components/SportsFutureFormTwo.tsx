import { EventInterface, MarketInterface } from "@/interfaces/market.interface";
import { getRoundingUpNumber } from "@/util/formatNumber";
import { sortByMarkets } from "@/util/sortByMarkets";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsInterface {
    title: string;
    data: EventInterface;
    event: string;
}

const SportsFutureFormTwo: React.FC<PropsInterface> = ({ title, data, event }) => {

    const [markets, setMarkets] = useState<MarketInterface[] | null>(null);

    useEffect(() => {
        const _markets = sortByMarkets(data).slice(0, 5);
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
                        <div className="flex justify-between" key={idx}>
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] h-[25px] bg-top bg-no-repeat bg-cover" style={{ backgroundImage: "url(" + market.image + ")" }}></div>
                                <p className="text-sm text-white w-[100px] whitespace-nowrap">{market.groupItemTitle}</p>
                            </div>
                            <p className="text-lg text-white font-semibold w-[50px] text-right">
                                {getRoundingUpNumber(Number(market.outcomePrices.split('"')[1]) * 100)}%
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SportsFutureFormTwo;