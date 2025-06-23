"use client"

import { useEffect, useState } from "react";
import { apiURL, axiosData } from "@/util/api";
import { EventInterface } from "@/interfaces/market.interface";
import { useRouter } from "next/navigation";
import SearchLoading from "./_components/SearchLoading";

const Page = () => {

    const router = useRouter();

    const [events, setEvents] = useState<EventInterface[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const getSearchEventData = async () => {
            const _events = await axiosData(apiURL.polymarketAPI + "/api/events/global?q=" + inputValue);
            setEvents(_events.events);
            setIsClient(true);
        }

        getSearchEventData();
    }, [inputValue]);

    const changeInputValue = (searchValue: string) => {
        setIsClient(false);
        setInputValue(searchValue);
    }

    const goToEventDetailPage = (slug: string) => {
        setInputValue('');
        router.push('/event/' + slug);
    }

    const loading = () => {
        const _loading = [];
        for (let idx = 0; idx < 5; idx++) {
            _loading.push(<SearchLoading key={idx} />)

        }
        return _loading;
    }

    return (
        <div className="px-[20px] py-[50px] min-h-[90vh] bg-black">
            <div className="relative h-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="navbar-search"
                    className="block w-full h-full ps-10 pe-3 py-2 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none"
                    placeholder="Search Markets"
                    required
                    onChange={(e) => changeInputValue(e.target.value)}
                    value={inputValue}
                />
            </div>
            {
                inputValue &&
                <div className="bg-black mt-1 px-4 py-2">
                    <div className="flex flex-col gap-3 mt-4">
                        {
                            isClient ?
                                events?.map((event, idx) => (
                                    <div
                                        className="flex items-center gap-3 cursor-pointer"
                                        key={idx}
                                        onClick={() => goToEventDetailPage(event.slug)}
                                    >
                                        <div
                                            className="w-[30px] h-[30px] bg-top bg-no-repeat bg-cover rounded-lg"
                                            style={{ backgroundImage: 'url(' + event.image + ')' }}
                                        />
                                        <div>
                                            <p className="text-sm text-white">{event.title}</p>
                                            <p className="text-xs text-neutral-400">${Math.floor(event.volume)}</p>
                                        </div>
                                    </div>
                                ))
                                :
                                loading()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Page;