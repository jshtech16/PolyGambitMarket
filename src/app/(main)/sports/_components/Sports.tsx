'use client'

import { useEffect, useState } from "react";
import { axiosData } from "@/util/api";
import EventCard from "../../_components/EventList/EventCard";
import EventLoadingCard from "../../_components/EventList/EventLoadingCard";
import { useSearchParams, useRouter } from "next/navigation";
import { sportsTags } from "../_util/sportstags";
import { sportsTypes } from "../_util/sportstypes";
import SportsFuture from "./SportsFuture";
import { EventInterface } from "@/interfaces/market.interface";

interface tagInterface {
    label: string,
    slug: string,
    image: string
}

const Sports = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [sports, setSports] = useState<EventInterface[]>([]);
    const [tag, setTag] = useState<tagInterface | null>();
    const [type, setType] = useState('future');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(false);
        const currentTag = searchParams.get('tag') || 'nfl';
        if (currentTag) {
            const _tag = sportsTags.find(tag => tag.slug.toLowerCase() === currentTag.toLowerCase());
            setTag(_tag);
            if (currentTag === 'nfl' || currentTag === 'nba' || currentTag === 'EPL') {
                setType('future')
            } else {
                setType('prop')
            }
        }

        const getSportsData = async () => {
            const tagParam = searchParams.get('tag') || 'nfl';
            const _data = await axiosData('https://gamma-api.polymarket.com/events?tag_slug=' + tagParam + '&order=id&closed=false')
            setSports(_data)
            setIsClient(true);
        }

        getSportsData()
    }, [searchParams]);

    useEffect(() => {
        const currentType = searchParams.get('type');
        if (currentType) {
            setType(currentType);
        }
    }, [searchParams]);

    const renderSportsData = () => {
        const _sports = [];
        if (sports.length === 0) {
            return (<p className="text-base text-white">No Events</p>)
        } else {
            for (let idx = 0; idx < sports.length; idx++) {
                if (sports[idx].showAllOutcomes) {
                    _sports.push(<EventCard event={sports[idx]} changeWatchList={() => { }} key={idx} />)
                }
            }
        }

        return (_sports)
    }

    const showEventLoading = () => {
        const result = []
        for (let i = 0; i < 12; i++) {
            result.push(<EventLoadingCard key={i} />);
        }
        return result;
    };

    const showType = (param: string) => {
        setType(param);
        const currentType = searchParams.get('type');
        const newParams = new URLSearchParams(searchParams);

        if (currentType) {
            newParams.set('type', param);
        } else {
            newParams.append('type', param);
        }

        router.push(`?${newParams.toString()}`);
    }

    return (
        <div className="flex-1 flex gap-[30px]">
            <div className="flex-1 px-0 xl:px-[20px]">
                <div className="flex gap-5 items-center">
                    <div className="w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] rounded-lg bg-top bg-no-repeat bg-cover"
                        style={{ backgroundImage: 'url(/assets/img/sports/' + tag?.image + ')' }} />
                    <p className="text-4xl lg:text-6xl text-white font-semibold">{tag?.label}</p>
                </div>
                {
                    tag?.slug === 'nfl' || tag?.slug === 'nba' || tag?.slug === "EPL" ?
                        <div className="flex gap-4 mt-5">
                            {
                                sportsTypes.map((sportsType, idx) => (
                                    <p
                                        className={`text-base px-5 py-2 rounded-lg cursor-pointer font-semibold 
                                        ${type === sportsType.slug ? "text-black bg-[#B3FC35]" : "text-white bg-neutral-900"}`}
                                        onClick={() => showType(sportsType.slug)}
                                        key={idx}
                                    >{sportsType.label}</p>
                                ))
                            }
                        </div>
                        :
                        <div className="flex gap-4 mt-5">
                            <p className="text-white text-base bg-success px-5 py-2 rounded-lg cursor-pointer">Props</p>
                        </div>
                }
                {
                    type === 'future' ?
                        <SportsFuture />
                        :
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5 mt-5">
                            {
                                isClient ? (renderSportsData()) : (showEventLoading())
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Sports;