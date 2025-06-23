"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import TimeStamp from "../_components/TimeStamp";
import { EventInterface, MarketInterface } from "@/interfaces/market.interface";
import { apiURL, axiosData } from "@/util/api";
import { sortByMarkets } from "@/util/sortByMarkets";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Page = () => {

    const [promises, setPromises] = useState<EventInterface[] | null>(null);
    const [whiteMarkets, setWhiteMarkets] = useState<MarketInterface[] | null>(null);
    const [cabinets, setCabinets] = useState<EventInterface[] | null>(null);

    useEffect(() => {
        getPromisesData();
        getWhiteHouseData();
        getCabinetsData();
    }, [])

    const getPromisesData = async () => {
        const _promises = await axiosData(apiURL.eventAPI + '?limit=20&active=true&archived=false&tag_slug=campaign-promises&closed=false&order=volume24hr&ascending=false&offset=0');
        setPromises(_promises);
    }

    const getWhiteHouseData = async () => {
        const _whiteHouses = await axiosData(apiURL.eventAPI + '?slug=trump-administration');
        const _whiteMarkets = sortByMarkets(_whiteHouses[0]);
        setWhiteMarkets(_whiteMarkets);
    }

    const getCabinetsData = async () => {
        const _cabinets = await axiosData(apiURL.eventAPI + '?limit=20&active=true&archived=false&tag_slug=trump-cabinet&closed=false&order=volume24hr&ascending=false&offset=0');
        setCabinets(_cabinets);
        console.log(_cabinets)
    }

    const renderCabinetMarkets = (cabinet: EventInterface) => {
        const _markets = sortByMarkets(cabinet);
        const cabinetMarkets = [];

        for (let idx = 0; idx < 5; idx++) {
            cabinetMarkets.push(
                <div className="flex items-center gap-3 bg-neutral-600 px-2 h-[30px] rounded-md">
                    <p className="text-sm font-semibold w-[40px]">{Math.floor(_markets[idx].bestAsk * 100)}%</p>
                    <div
                        className="min-w-[25px] w-[25px] h-[25px] bg-top bg-no-repeat bg-cover rounded-full"
                        style={{ backgroundImage: 'url(' + _markets[idx].image + ')' }}
                    />
                    <p className="text-sm">{_markets[idx].groupItemTitle}</p>
                </div>
            )
        }

        return cabinetMarkets;
    }

    return (
        <div className="px-[20px] py-[40px] w-full max-w-[1100px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start mt-0 lg:mt-[20px]">
                <p className="text-2xl lg:text-4xl font-semibold text-center">Trump won, now what?</p>
                <div className="relative min-w-[350px] w-[350px] h-[200px] mt-3 mx-auto">
                    <Image src="/assets/img/trump/trump-and-crew.webp" alt="" fill />
                </div>
                <TimeStamp title="Inauguration in" days={10} hrs={20} min={30} sec={30} />
            </div>
            <div className="flex justify-between items-center mt-5 lg:mt-[50px]">
                <div>
                    <p className="text-xl lg:text-3xl font-semibold">Promises and Policies</p>
                    <p className="text-base text-neutral-500 hidden lg:block">What do the first few months in office look like?</p>
                </div>
                <p className="border border-neutral-600 hidden lg:block px-3 py-2 cursor-pointer rounded-md text-sm">
                    View all
                    <ArrowForwardIosIcon className="text-[14px] ms-2" />
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 lg:mt-[30px]">
                {
                    promises?.map((promise, idx) => {
                        if (promise.markets[0].oneDayPriceChange) {
                            return (
                                <div className="bg-neutral-800 px-4 py-3 rounded-lg" key={idx}>
                                    <div className="flex gap-2 items-center">
                                        <div
                                            className="min-w-[40px] w-[40px] h-[40px] bg-top bg-no-repeat bg-cover"
                                            style={{ backgroundImage: 'url(' + promise.image + ')' }}
                                        />
                                        <p className="text-sm">{promise.markets[0].question}</p>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <p className="text-sm text-neutral-300">
                                            <span className="text-xl font-semibold text-white pe-2">
                                                {Math.floor(promise.markets[0].bestAsk * 100)}%
                                            </span>
                                            chance
                                        </p>
                                        {
                                            promise.markets[0].oneDayPriceChange < 0 ?
                                                <p className="text-xs text-[#FF0000]">
                                                    <ArrowDropDownIcon />
                                                    -{Math.abs(Math.floor((promise.markets[0].oneDayPriceChange * 100)))}%
                                                </p>
                                                :
                                                <p className="text-xs text-[#BFF816]">
                                                    <ArrowDropUpIcon />
                                                    {Math.abs(Math.floor((promise.markets[0].oneDayPriceChange * 100)))}%
                                                </p>
                                        }
                                    </div>
                                    <div className="w-full h-[5px] bg-neutral-600 rounded-md mt-2">
                                        <div className="h-[5px] bg-[#BFF816]" style={{ width: (Math.floor(promise.markets[0].bestAsk * 100)) + "%" }} />
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="flex justify-between items-center mt-5 lg:mt-[50px]">
                <div>
                    <p className="text-xl lg:text-3xl font-semibold">The White House</p>
                    <p className="text-base text-neutral-500 hidden lg:block">Who will be appointed the next administration?</p>
                </div>
                <p className="border border-neutral-600 hidden lg:block px-3 py-2 cursor-pointer rounded-md text-sm">
                    View all
                    <ArrowForwardIosIcon className="text-[14px] ms-2" />
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-3 lg:mt-[30px]">
                {
                    whiteMarkets?.map((market, idx) => {
                        if (idx < 10) {
                            return (
                                <div className="bg-neutral-800 p-3 rounded-lg" key={idx}>
                                    <div
                                        className="min-w-[150px] w-[150px] h-[150px] mx-auto rounded-lg bg-top bg-no-repeat bg-cover"
                                        style={{ backgroundImage: 'url(' + market.image + ')' }}
                                    />
                                    <p className="text-base text-center">{market.groupItemTitle}</p>
                                    <p className="text-sm text-neutral-300 text-center">
                                        <span className="text-xl font-semibold text-white pe-2">{Math.floor(market.bestAsk * 100)}%</span>
                                        chance
                                    </p>
                                    <div className="w-full h-[5px] bg-neutral-600 rounded-md mt-2">
                                        <div className="h-[5px] bg-[#BFF816]" style={{ width: (Math.floor(market.bestAsk * 100)) + "%" }} />
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="flex justify-between items-center mt-5 lg:mt-[50px]">
                <div>
                    <p className="text-xl lg:text-3xl font-semibold">Cabinet Positions</p>
                    <p className="text-base text-neutral-500 hidden lg:block">Who will Trump pick?</p>
                </div>
                <p className="border border-neutral-600 hidden lg:block px-3 py-2 cursor-pointer rounded-md text-sm">
                    View all
                    <ArrowForwardIosIcon className="text-[14px] ms-2" />
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 lg:mt-[30px]">
                {
                    cabinets?.map((cabinet, idx) => {
                        if (cabinet.markets.length > 1) {
                            return (
                                <div className="bg-neutral-800 px-4 py-3 rounded-lg" key={idx}>
                                    <div className="flex gap-2 items-center">
                                        <div
                                            className="min-w-[40px] w-[40px] h-[40px] bg-top bg-no-repeat bg-cover"
                                            style={{ backgroundImage: 'url(' + cabinet.image + ')' }}
                                        />
                                        <p className="text-sm">{cabinet.title}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3">
                                        {renderCabinetMarkets(cabinet)}
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div >
    )
}

export default Page;