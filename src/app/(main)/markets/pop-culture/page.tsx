'use client'

import { useEffect, useState } from "react";
import Carousel from "@/app/(main)/_components/Carousel";
import EventList from "@/app/(main)/_components/EventList/EventList";
import Topics from "@/app/(main)/_components/Topics";
import { fetchData } from "@/util/api";
import { popCultureCarousel } from "@/util/carousel";
import { SlugInterface } from "@/interfaces/slug.interface";
import ToolBar from "../../_components/toolbar/ToolBar";

export default function MarketsPopCulturePage() {

    const [slugs, setSlugs] = useState<SlugInterface[]>([]);

    useEffect(() => {
        getFilteredBySlug();
    }, [])

    const getFilteredBySlug = async () => {
        const _slugs = await fetchData("https://polymarket.com/api/tags/filteredBySlug?tag=pop-culture&status=active");
        setSlugs(_slugs)
    }

    return (
        <div className="bg-black px-[20px] xl:px-[30px]">
            <Carousel data={popCultureCarousel} />
            <ToolBar />
            <Topics slugs={slugs} />
            <EventList />
        </div>
    );
}
