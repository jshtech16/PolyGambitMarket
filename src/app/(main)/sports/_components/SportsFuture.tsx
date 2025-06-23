"use client"

import { apiURL, axiosData } from "@/util/api";
import { useEffect, useState } from "react";
import SportsFutureFormOne from "./SportsFutureFormOne";
import { EventInterface } from "@/interfaces/market.interface";
import SportsFutureFormTwo from "./SportsFutureFormTwo";
import { eventNFLSlug, eventNBASlug, eventEPLSlug } from "../_util/sportsFuturesEvents";
import { useSearchParams } from "next/navigation";

const SportsFuture = () => {

    const [eventData, setEventData] = useState<EventInterface[] | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const getFutureData = async () => {
            let api = apiURL.eventAPI;
            if (searchParams.get('tag') === 'nfl' || !searchParams.get('tag')) {
                eventNFLSlug.forEach((slug, idx) => {
                    if (idx === 0) {
                        api += '?';
                    } else {
                        api += '&';
                    }
                    api += 'slug=' + slug.slug;
                });
    
                const _eventData = await axiosData(api);
                const result: EventInterface[] = [];
                eventNFLSlug.forEach(slug => {
                    result.push(_eventData.find((item: EventInterface) => item.slug === slug.slug))
                })
                setEventData(result);
            }
    
            if (searchParams.get('tag') === 'nba') {
                eventNBASlug.forEach((slug, idx) => {
                    if (idx === 0) {
                        api += '?';
                    } else {
                        api += '&';
                    }
                    api += 'slug=' + slug.slug;
                });
                const _eventData = await axiosData(api);
                const result: EventInterface[] = [];
                eventNBASlug.forEach(slug => {
                    result.push(_eventData.find((item: EventInterface) => item.slug === slug.slug))
                })
    
                setEventData(result);
            }
    
            if (searchParams.get('tag') === 'EPL') {
                eventEPLSlug.forEach((slug, idx) => {
                    if (idx === 0) {
                        api += '?';
                    } else {
                        api += '&';
                    }
                    api += 'slug=' + slug.slug;
                });
                const _eventData = await axiosData(api);
                const result: EventInterface[] = [];
                eventEPLSlug.forEach(slug => {
                    result.push(_eventData.find((item: EventInterface) => item.slug === slug.slug))
                })
                setEventData(result);
            }
            setIsLoading(true);
        }

        getFutureData();
    }, [searchParams])

    const renderComponent = (eventData: EventInterface[]) => {
        if (searchParams.get('tag') === 'nfl' || !searchParams.get('tag')) {
            return (
                <div className="mt-5">
                    <div className="flex">
                        <SportsFutureFormOne title={eventNFLSlug[0].label} data={eventData[0]} showAll={true} event={eventNFLSlug[0].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5 w-full">
                        <SportsFutureFormTwo title={eventNFLSlug[1].label} data={eventData[1]} event={eventNFLSlug[1].slug} />
                        <SportsFutureFormTwo title={eventNFLSlug[2].label} data={eventData[2]} event={eventNFLSlug[2].slug} />
                        <SportsFutureFormTwo title={eventNFLSlug[3].label} data={eventData[3]} event={eventNFLSlug[3].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5">
                        <SportsFutureFormOne title={eventNFLSlug[4].label} data={eventData[4]} showAll={false} event={eventNFLSlug[4].slug} />
                        <SportsFutureFormOne title={eventNFLSlug[5].label} data={eventData[5]} showAll={false} event={eventNFLSlug[5].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5">
                        <SportsFutureFormTwo title={eventNFLSlug[6].label} data={eventData[6]} event={eventNFLSlug[6].slug} />
                        <SportsFutureFormTwo title={eventNFLSlug[7].label} data={eventData[7]} event={eventNFLSlug[7].slug} />
                        <SportsFutureFormTwo title={eventNFLSlug[8].label} data={eventData[8]} event={eventNFLSlug[8].slug} />
                    </div>
                </div>
            )
        }
        if (searchParams.get('tag') === 'nba') {
            return (
                <div className="mt-5">
                    <div className="flex">
                        <SportsFutureFormOne title={eventNBASlug[0].label} data={eventData[0]} showAll={true} event={eventNBASlug[0].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5 w-full">
                        <SportsFutureFormTwo title={eventNBASlug[1].label} data={eventData[1]} event={eventNBASlug[1].slug} />
                        <SportsFutureFormTwo title={eventNBASlug[2].label} data={eventData[2]} event={eventNBASlug[2].slug} />
                        <SportsFutureFormTwo title={eventNBASlug[3].label} data={eventData[3]} event={eventNBASlug[3].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5">
                        <SportsFutureFormOne title={eventNBASlug[4].label} data={eventData[4]} showAll={false} event={eventNBASlug[4].slug} />
                        <SportsFutureFormOne title={eventNBASlug[5].label} data={eventData[5]} showAll={false} event={eventNBASlug[5].slug} />
                    </div>
                </div>
            )
        }
        if (searchParams.get('tag') === 'EPL') {
            return (
                <div className="mt-5">
                    <div className="flex flex-col xl:flex-row gap-5 mt-5">
                        <SportsFutureFormOne title={eventEPLSlug[0].label} data={eventData[0]} showAll={false} event={eventEPLSlug[0].slug} />
                        <SportsFutureFormOne title={eventEPLSlug[1].label} data={eventData[1]} showAll={false} event={eventEPLSlug[1].slug} />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-5 mt-5">
                        <SportsFutureFormOne title={eventEPLSlug[2].label} data={eventData[2]} showAll={false} event={eventEPLSlug[2].slug} />
                        <SportsFutureFormOne title={eventEPLSlug[3].label} data={eventData[3]} showAll={false} event={eventEPLSlug[3].slug} />
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {
                isLoading ?
                    eventData && renderComponent(eventData) : null
            }
        </>
    )
}

export default SportsFuture;