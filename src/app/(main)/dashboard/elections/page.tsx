"use client"

import { useEffect, useState } from "react";
import DashboardMenu from "../_components/dashboardMenu";
import { EventInterface } from "@/interfaces/market.interface";
import { apiURL, axiosData } from "@/util/api";
import Link from "next/link";
import ProgressBarWithImage from "../../_components/ProgressBarWithImage";

const Page = () => {

    const [events, setEvents] = useState<EventInterface[]>([]);

    useEffect(() => {
        getEventsData();
    }, [])

    const getEventsData = async () => {
        const api = apiURL.eventAPI + '?limit=20&offset=0&tag_slug=world-elections&closed=false&active=true&archived=false&order=startTime&ascending=true';
        const _events = await axiosData(api);
        _events.forEach((_event: EventInterface) => {
            if (_event.startTime) {
                const dateObject = new Date(_event.startTime);
                _event.startDay = dateObject.getUTCDate();
                _event.startMonth = dateObject.toLocaleDateString('en-US', { month: "short" });
            }
        });
        console.log(_events)
        setEvents(_events);
    }

    return (
        <div className="max-w-[1200px] mx-auto px-[20px] pt-[0px] lg:pt-[50px] pb-[100px] flex flex-col lg:flex-row lg:items-start gap-5">
            <DashboardMenu />
            <div className="flex-1">
                <p className="text-base lg:text-3xl text-white font-semibold pb-2">Global Elections</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        events?.map((event, idx) => (
                            <Link
                                href={'/event/' + event.slug}
                                className="border border-neutral-800 rounded-lg px-4 py-4 mt-5 hover:shadow-lg cursor-pointer"
                                key={idx}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex gap-3">
                                        {
                                            event.startTime ?
                                                <div className="text-center">
                                                    <p className="text-xl text-white font-semibold">{event.startDay}</p>
                                                    <p className="text-xs lg:text-sm text-white">{event.startMonth}</p>
                                                </div>
                                                :
                                                <p className="text-sm text-white font-semibold">TBD</p>
                                        }
                                        <div className="flex flex-col justify-between">
                                            <p className="text-xs lg:text-base text-white font-semibold">{event.countryName}</p>
                                            <p className="text-xs lg:text-sm text-neutral-500">{event.electionType}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="w-[30px] min-w-[30px] lg:w-[50px] lg:min-w-[50px] h-[30px] lg:h-[50px] bg-top bg-no-repeat bg-cover rounded-lg"
                                        style={{ backgroundImage: 'url(' + event.image + ')' }}
                                    />
                                </div>
                                <ProgressBarWithImage event={event} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Page;