'use client'

import { useEffect, useState } from "react";
import Carousel from "@/app/(main)/_components/Carousel";
import EventList from "@/app/(main)/_components/EventList/EventList";
import Topics from "@/app/(main)/_components/Topics";
import { fetchData } from "@/util/api";
import { scienceCarousel } from "@/util/carousel";
import { SlugInterface } from "@/interfaces/slug.interface";
import ToolBar from "../../_components/toolbar/ToolBar";

export default function MarketsSciencePage() {

    const [slugs, setSlugs] = useState<SlugInterface[]>([]);

    useEffect(() => {
        getFilteredBySlug();
    }, [])

    const getFilteredBySlug = async () => {
        const _slugs = await fetchData("https://polymarket.com/api/tags/filteredBySlug?tag=science&status=active");
        setSlugs(_slugs)
    }

    return (
        <div className="bg-black px-[20px]">
            <Carousel data={scienceCarousel} />
            <ToolBar />
            <Topics slugs={slugs} />
            <EventList />
        </div>
    );
}
