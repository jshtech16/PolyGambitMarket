"use client"

import { EventInterface } from "@/interfaces/market.interface";
import { apiURL, axiosData } from "@/util/api";
import { sortByMarkets } from "@/util/sortByMarkets";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {

    const [events, setEvents] = useState<EventInterface[]>([]);

    useEffect(() => {
        getEventsData();
    }, [])

    const getEventsData = async () => {
        const api = apiURL.eventAPI + '?limit=20&offset=0&tag_slug=mention-markets&closed=false&active=true&archived=false&order=startTime&ascending=true';
        const _events = await axiosData(api);
        _events.forEach((_event: EventInterface) => {
            if (_event.startTime) {
                const dateObject = new Date(_event.startTime);
                _event.startDay = dateObject.getUTCDate();
                _event.startMonth = dateObject.toLocaleDateString('en-US', { month: "short" });
                _event.startDayOfWeek = dateObject.toLocaleString("en-US", { weekday: "short" });
                _event.startHour = dateObject.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });
                _event.markets = sortByMarkets(_event);
            }
        });
        setEvents(_events);
    }

    return (
        <div className="container mx-auto px-[20px] pt-[50px] pb-[100px]">
            <p className="text-base lg:text-3xl text-white font-semibold">Mention Markets</p>
            <p className="text-xs lg:text-base text-white my-2">Live events where you can predict the words and phrases that will be said.</p>
            {
                events?.map((event, idx) => (
                    <Link
                        href={'/event/' + event.slug}
                        className="flex flex-col lg:flex-row justify-between gap-4 border border-neutral-800 rounded-lg px-4 py-4 mt-5 hover:shadow-lg cursor-pointer"
                        key={idx}
                    >
                        <div className="flex items-center gap-3">
                            {
                                event.startTime ?
                                    <div className="text-center">
                                        <p className="text-xl text-white font-semibold">{event.startDay}</p>
                                        <p className="text-xs lg:text-sm text-white">{event.startMonth}</p>
                                    </div>
                                    :
                                    <p className="text-sm text-white font-semibold">TBD</p>
                            }
                            <div
                                className="w-[30px] min-w-[30px] lg:w-[50px] lg:min-w-[50px] h-[30px] lg:h-[50px] bg-top bg-no-repeat bg-cover rounded-lg"
                                style={{ backgroundImage: 'url(' + event.image + ')' }}
                            />
                            <div>
                                <p className="text-xs lg:text-base text-white font-semibold">{event.title}</p>
                                <div className="hidden lg:flex items-center gap-3">
                                    {
                                        event.startTime &&
                                        <p className="text-xs lg:text-sm text-white bg-neutral-800 rounded-md px-2 py-1">{event.startDayOfWeek}, {event.startHour}</p>
                                    }
                                    <p className="text-xs lg:text-sm text-neutral-500">${Math.floor(event.volume)}Vol.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:hidden items-center gap-3">
                            {
                                event.startTime &&
                                <p className="text-xs text-white bg-neutral-800 rounded-md px-2 py-1">{event.startDayOfWeek}, {event.startHour}</p>
                            }
                            <p className="text-xs lg:text-sm text-neutral-500">${Math.floor(event.volume)}Vol.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {
                                event.markets.length >= 1 &&
                                <p className="text-xs lg:text-sm border border-neutral-800 rounded-md px-1 whitespace-nowrap">
                                    {event.markets[0]?.groupItemTitle}
                                </p>
                            }
                            {
                                event.markets.length >= 2 &&
                                <p className="text-xs lg:text-sm border border-neutral-800 rounded-md px-1 whitespace-nowrap">
                                    {event.markets[1]?.groupItemTitle}
                                </p>
                            }
                            {
                                event.markets.length > 2 &&
                                <p className="text-xs lg:text-sm border border-neutral-800 rounded-md px-1 whitespace-nowrap">
                                    +{event.markets.length - 2}
                                </p>
                            }
                            <button className="bg-[#BCFF00] text-black text-xs px-3 py-2 font-semibold rounded-lg cursor-pointer">
                                Trade
                            </button>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Page;