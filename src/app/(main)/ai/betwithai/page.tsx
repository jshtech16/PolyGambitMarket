"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EventInterface } from "@/interfaces/market.interface";
import { apiURL, axiosData } from "@/util/api";
import { mainCarousel } from "@/util/carousel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TelegramIcon from "@mui/icons-material/Telegram";

import Carousel from "../../_components/Carousel";
import { AIInsight } from "../../event/_components/EventDetail";
import RecommendCard from "./_components/RecommendCard";

const Page = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);

  const router = useRouter();

  const getEvents = async () => {
    const _eventsRes = await Promise.allSettled([
      axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=2&closed=false&tag_id=2"),
      axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=2&closed=false&tag_id=21"),
      axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=2&closed=false&tag_id=596"),
      axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=2&closed=false&tag_id=107"),
      axiosData(apiURL.eventAPI + "?order=volume24hr&ascending=false&limit=2&closed=false&tag_id=74"),
    ]);

    const _events: EventInterface[] = _eventsRes.filter((e) => e.status === "fulfilled").map((e) => e.value[0]);

    const uniqueEvents = (() => {
      const seenIds = new Set<string>();
      return _events
        .filter((event) => {
          if (seenIds.has(event.id)) {
            return false;
          }
          seenIds.add(event.id);
          return true;
        })
        .slice(0, 5);
    })();

    if (uniqueEvents && uniqueEvents.length > 0) {
      setEvents(uniqueEvents);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const fetchAIInsight = async () => {
      try {
        if (!events || events.length === 0) {
          return;
        }
        const res = await axios.post<AIInsight[]>("https://api.sportsgambit.io/gamble-gpt/polymarket-top-ai-insights", {
          events: events.map((eventData) => ({
            ...eventData,
            markets: eventData.markets.filter((item) => !item.automaticallyResolved),
          })),
        });
  
        setAIInsights(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAIInsight();
  }, [events]);

  return (
    <div className="bg-black">
      <div className="container mx-auto px-[20px] pt-[50px] pb-[100px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white text-lg lg:text-3xl font-semibold">GambleGPT</p>
            <p className="text-white text-xs lg:text-base">The next generation of best selection</p>
          </div>
          {/* <button className="bg-[#BFF816] px-5 py-2 rounded-lg text-black text-xs lg:text-base font-semibold">
            Chat With Me
          </button> */}
        </div>
        <Carousel data={mainCarousel} />
        <div className="mt-[50px]">
          <div className="flex justify-between">
            <div className="flex gap-[10px] items-center">
              <ArrowBackIcon
                className="text-white w-6 h-6 cursor-pointer"
                onClick={() => router.back()}
              />
              <div className="relative w-[40px] h-[25px]">
                <Image src="/assets/img/gambit_ai.png" alt="" fill />
              </div>
              <p className="text-white text-xl font-semibold">GambitAI Bot</p>
            </div>
            <TelegramIcon className="text-white" fontSize="large" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-[50px]">
            {events.map((event, idx) => (
              <div className="flex flex-col h-full border border-neutral-800 rounded-lg px-2 py-3 gap-5" key={idx}>
                <div className="flex gap-4">
                  {event.tags.slice(0, 3).map((tag, idx) => (
                    <p
                      key={`event-${event.id}-tag-${idx}`}
                      className="bg-neutral-800 text-xs text-white px-3 rounded-md"
                    >
                      {tag.label}
                    </p>
                  ))}
                </div>
                <p className="text-white text-xs">{aiInsights.find(({ eventId }) => event.id === eventId)?.reason}</p>
                <RecommendCard event={event} aiInsight={aiInsights.find(({ eventId }) => event.id === eventId)} />
                {/* <button className="bg-[#BFF816] text-black w-full mt-5 py-2 text-lg font-semibold rounded-full">
                  Place Bet Now
                </button>
                <button className="flex justify-center items-center gap-2 border border-[#BFF816] w-full text-lg font-semibold text-white rounded-full mt-4 py-2">
                  <Image
                    src="/assets/img/gambit_ai.png"
                    alt=""
                    className="w-[30px] h-[20px]"
                    width={100}
                    height={100}
                  />
                  Chat with me about this
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
