"use client"

import { useEffect, useState } from 'react';
import { EventInterface } from '@/interfaces/market.interface';
import { apiURL, axiosData } from '@/util/api';
import EventCard from '../_components/EventList/EventCard';
import EventLoadingCard from '../_components/EventList/EventLoadingCard';
import { getCookie } from '@/util/cookie';

const Page = () => {

    const [isClient, setIsClient] = useState(false);
    const [watchLists, setWatchLists] = useState<EventInterface[] | null>(null);
    const [watchListIds, setWatchListIds] = useState('');

    useEffect(() => {
        getwatchListsData();
    }, [])

    const getwatchListsData = async () => {
        const _watchListIds = getCookie('watchlist');
        if (_watchListIds) {
            let api = apiURL.eventAPI + '?';
            _watchListIds.split(',').map((watchListID: string, idx: number) => {
                if (idx !== 0) {
                    api += '&'
                }
                api += 'id=' + watchListID;
            })
            const _watchLists = await axiosData(api);
            setWatchListIds(_watchListIds);
            setWatchLists(_watchLists)
        } else {
            setWatchListIds('');
        }
        setIsClient(true);
    }

    const showEventLoading = () => {
        const result = []
        for (let i = 0; i < 12; i++) {
            result.push(<EventLoadingCard key={i} />);
        }
        return result;
    };

    const changeWatchList = () => {
        getwatchListsData();
    }

    return (
        <div className="px-[20px] py-[32px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-5">
                {isClient ?
                    watchListIds === '' ?
                        <p className='text-center min-h-[50vh]'>Events does not exist</p>
                        :
                        watchLists?.map((watchList, idx) => <EventCard event={watchList} changeWatchList={changeWatchList} key={idx} />) : (showEventLoading())
                }
            </div>
        </div>
    )
}

export default Page;
