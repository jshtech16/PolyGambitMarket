"use client"

import { useEffect, useRef, useState } from "react";
import { EventInterface } from "@/interfaces/market.interface";
import EventCard from "./EventCard";
import { apiURL, axiosData } from "@/util/api";
import EventLoadingCard from "./EventLoadingCard";
import Load from "@/components/Load/Load";
import { usePathname, useSearchParams } from "next/navigation";

const EventList = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const buttonRef = useRef(null);

    const [isClient, setIsClient] = useState(false);
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!end && entry.isIntersecting) {
                    handleShowMore();
                }
                setShowMore(entry.isIntersecting);
            },
            { threshold: 1 }
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);

    useEffect(() => {
        setIsClient(false);

        const getEventApiFromURL = () => {
            let eventApi = apiURL.eventAPI + '?';

            eventApi += 'limit=' + 20;

            if (searchParams.get('topic')) {
                eventApi += '&tag_slug=' + searchParams.get('topic');
            } else {
                if (pathname.split('/')[pathname.split('/').length - 1] !== 'markets') {
                    eventApi += '&tag_slug=' + pathname.split('/')[pathname.split('/').length - 1];
                }
            }

            if (searchParams.get('_s')) {
                eventApi += '&order=' + searchParams.get('_s');
            } else {
                eventApi += '&order=volume24hr';
            }

            if (searchParams.get('ascending')) {
                eventApi += '&ascending=' + searchParams.get('ascending');
            } else {
                eventApi += '&ascending=false';
            }

            if (searchParams.get('active')) {
                eventApi += '&active=' + searchParams.get('active');
            } else {
                eventApi += '&active=true';
            }

            if (searchParams.get('archived')) {
                eventApi += '&archived=' + searchParams.get('archived');
            } else {
                eventApi += '&archived=false';
            }

            if (searchParams.get('closed')) {
                eventApi += '&closed=' + searchParams.get('closed');
            } else {
                eventApi += '&closed=false';
            }

            if (page === 1) {
                eventApi += '&offset=0';
            } else {
                eventApi += '&offset=' + (page * 20);
            }

            return eventApi;
        }


        const eventApi = getEventApiFromURL();
        getEventData(eventApi);
    }, [pathname, searchParams, page])


    const getEventData = async (eventApi: string) => {
        const _events = await axiosData(eventApi);
        const __events = [...events, ..._events]
        if (__events.length < page * 20) {
            setEnd(true);
        }
        setEvents(__events);
        setShowMore(false);
        setIsClient(true);
    }

    const showEventLoading = () => {
        const result = []
        for (let i = 0; i < 12; i++) {
            result.push(<EventLoadingCard key={i} />);
        }
        return result;
    };

    const handleShowMore = () => {
        setPage((prevPage) => {
            const newPage = prevPage + 1;
            return newPage;
        });
    }

    return (
        <div className="py-[32px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-5">
                {isClient ?
                    events?.map((event, idx) => <EventCard event={event} changeWatchList={() => { }} key={idx} />) : (showEventLoading())
                }
            </div>

            <div className="pt-[30px] text-center">
                {
                    end ?
                        <p>End of result</p>
                        :
                        <button
                            ref={buttonRef}
                            type="button"
                            className="gradiant-btn px-4 py-2 text-md text-white rounded-lg"
                        >
                            {showMore ? <Load /> : 'Show More'}
                        </button>

                }
            </div>
        </div>
    );
};

export default EventList;