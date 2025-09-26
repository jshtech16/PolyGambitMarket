"use client"

import { useEffect, useState } from "react";
import { SlugInterface } from "@/interfaces/slug.interface";
import { fetchData } from "@/util/api";
import Topics from "../_components/Topics";
import EventList from "../_components/EventList/EventList";
import ToolBar from "../_components/toolbar/ToolBar";

const Page = () => {

    const [slugs, setSlugs] = useState<SlugInterface[]>([])

    useEffect(() => {
        getFilteredBySlug();
    })

    const getFilteredBySlug = async () => {
        const _slugs = await fetchData("https://polymarket.com/api/tags/filteredBySlug?tag=creators&status=active");
        setSlugs(_slugs);
    }

    return (
        <div className="bg-black px-[20px]">
            <ToolBar />
            <Topics slugs={slugs} />
            <EventList />
        </div>
    )
}

export default Page;