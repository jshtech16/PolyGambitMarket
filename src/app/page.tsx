"use client";

import Carousel from "@/app/(main)/_components/Carousel";
import Topics from "@/app/(main)/_components/Topics";
import { apiURL, fetchData, axiosData } from "@/util/api";
import { useEffect, useState } from "react";
import EventCard from "./(main)/_components/EventList/EventCard";
import EventLoadingCard from "./(main)/_components/EventList/EventLoadingCard";
import { mainCarousel } from "@/util/carousel";
import { useSearchParams } from "next/navigation";
import { EventInterface } from "@/interfaces/market.interface";
import { SlugInterface } from "@/interfaces/slug.interface";
import ToolBar from "./(main)/_components/toolbar/ToolBar";

export default function Home() {

  const searchParams = useSearchParams();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [slugs, setSlugs] = useState<SlugInterface[]>([])

  useEffect(() => {
    const getFilteredBySlug = async (): Promise<SlugInterface[]> => {
      return await fetchData("https://polymarket.com/api/tags/filteredBySlug?tag=all&status=active")
    }

    const getEvents = async () => {
      const topic = searchParams.get('topic');
      const pmSlugs = await getFilteredBySlug();
      setSlugs(pmSlugs);
      if (topic) {
        const tag_id = pmSlugs.find((slug: SlugInterface) => slug.slug === topic)?.id;
        const _events = await axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=20&closed=false&tag_id=" + tag_id);
        if (_events) {
          setEvents(_events);
        }
      } else {
        if (searchParams.get('_s') === 'startDate' && searchParams.get('ascending') === 'false') {
          const _events = await axiosData(apiURL.eventAPI + "?order=startDate&ascending=false&limit=12&closed=false&active=true&archived=false&offset=0");
          if (_events) {
            setEvents(_events);
          }
        } else {
          const _events = await axiosData(apiURL.eventAPI + "?limit=12&active=true&archived=false&closed=false&order=volume24hr&ascending=false&offset=0");
          if (_events) {
            setEvents(_events);
          }
        }
      }
      setIsClient(true);
    };

    setIsClient(false);
    getEvents();
  }, [searchParams])

  // const renderActivity = () => {
  //   const activity = [];
  //   for (let i = 0; i < 10; i++) {
  //     activity.push(<Activity key={i} />);
  //   }
  //   return activity;
  // };

  // const renderActivityLoading = () => {
  //   const activity = [];
  //   for (let i = 0; i < 5; i++) {
  //     activity.push(<ActivityLoading key={i} />);
  //   }
  //   return activity;
  // };

  const renderEventLoading = () => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      result.push(<EventLoadingCard key={i} />);
    }
    return result;
  };

  return (
    <div className="bg-black px-[20px] xl:px-[30px]">
      <Carousel data={mainCarousel} />
      <ToolBar />
      <Topics slugs={slugs} />
      <div className="py-[32px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-5">
          {isClient
            ? events?.map((event, index) => (
              <EventCard event={event} changeWatchList={() => { }} key={index} />
            ))
            : renderEventLoading()}
        </div>
      </div>
      {/* <div className="flex flex-col xl:flex-row gap-[40px] xl:gap-[50px] pt-[8px] pb-[40px] px-0 xl:px-3">
        <div className="flex-1">
          <div className="flex justify-between pb-[40px]">
            <p className="text-base xl:text-2xl text-white font-integralcf">
              Recent Activity
            </p>
            <div>
              <p className="text-[8px] xl:text-base text-white border rounded-lg px-2 py-1 cursor-pointer">
                See All
              </p>
            </div>
          </div>
          {isClient ? renderActivity() : renderActivityLoading()}
        </div>
        <MainTopVolume />
      </div> */}
    </div>
  );
}
