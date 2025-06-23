"use client"

import { apiURL, axiosData } from "@/util/api";
import { useEffect, useState } from "react";
import EventDetail from "../_components/EventDetail";
import BuyMarket from "../../_components/BuyMarket";
import { EventInterface, MarketInterface } from "@/interfaces/market.interface";

const Page = (
  { params }: {
    params: { slug: string[] }
  }
) => {
  const [eventData, setEventData] = useState<EventInterface | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<MarketInterface | null>(null)

  useEffect(() => {
    const getEventData = async () => {
      const _event = await axiosData(apiURL.eventAPI + '?slug=' + params.slug[0]);
      setEventData(_event[0]);
      if (params.slug[1]) {
        for (const x in _event[0].markets) {
          if (_event[0].markets[x].slug == params.slug[1]) {
            setSelectedMarket(_event[0].markets[x]);
            break;
          }
        }
      }
      else {
        setSelectedMarket(null);
      }
    }

    if (params.slug.length > 0) {
      getEventData();
    }
  }, [params])

  return (
    <div className="bg-black">
      <div className="w-full max-w-[1200px] mx-auto px-[20px] py-[50px]">
        { eventData != null &&
          <div className="flex gap-5">
            <EventDetail eventData={eventData} selectedMarket={selectedMarket} />
            <div className="hidden lg:block">
              <BuyMarket />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Page;