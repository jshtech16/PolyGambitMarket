'use client'

import Carousel from "@/app/(main)/_components/Carousel";
import EventList from "@/app/(main)/_components/EventList/EventList";
import Topics from "@/app/(main)/_components/Topics";
import { fetchData } from "@/util/api";
import { useEffect, useState } from "react";
import { politicsCarousel } from "@/util/carousel";
import { SlugInterface } from "@/interfaces/slug.interface";
import ToolBar from "../../_components/toolbar/ToolBar";

export default function MarketsPoliticsPage() {

    const [slugs, setSlugs] = useState<SlugInterface[]>([]);

    useEffect(() => {
        getFilteredBySlug();
    }, [])

    const getFilteredBySlug = async () => {
        const _slugs = await fetchData("https://polymarket.com/api/tags/filteredBySlug?tag=politics&status=active");
        setSlugs(_slugs)
    }

    return (
        <div className="bg-black px-[20px] xl:px-[30px]">
            <Carousel data={politicsCarousel} />
            <ToolBar />
            <Topics slugs={slugs} />
            <EventList />
        </div>
    );
}
