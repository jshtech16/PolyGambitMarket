"use client";

import LeaderBoard from "@/app/(main)/leaderboard/_components/LeaderBoard";
import LeaderBoardLoading from "@/app/(main)/leaderboard/_components/LeaderBoardLoading";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const LeaderBoardPage = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<any[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 1000);

    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}order/leaderboard`
        );
        console.log(response.data)
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const renderVolume = () => {
    if (!leaderboardData) return null;
    return leaderboardData.map((item, i) => (
      <LeaderBoard leaderboardNum={i} name={item.name} bidPrice={item.bidPrice} key={i} />
    ));
  };

  const renderVolumeLoading = () => {
    const activity = [];
    for (let i = 0; i < 20; i++) {
      activity.push(<LeaderBoardLoading key={i} />);
    }
    return activity;
  };

  const renderProfit = () => {
    if (!leaderboardData) return null;
    return leaderboardData.map((item, i) => (
      <LeaderBoard leaderboardNum={i} name={item.name} bidPrice={item.bidPrice} key={i} />
    ));
  };

  const renderProfitLoading = () => {
    const activity = [];
    for (let i = 0; i < 20; i++) {
      activity.push(<LeaderBoardLoading key={i} />);
    }
    return activity;
  };

  return (
    <div className="bg-black px-[20px] py-[60px] flex items-center flex-col ">
      <div className="w-full max-w-[1100px] flex flex-col items-center">
        <p className="text-4xl text-white font-integralcf">LEADERBOARD</p>
        <div className="pt-[40px] flex gap-[10px]">
          <button className="text-base font-medium text-white px-3 py-[6px] border border-neutral-600 rounded-lg hover:bg-neutral-900">
            Day
          </button>
          <button className="text-base font-medium text-white px-3 py-[6px] border border-neutral-600 rounded-lg hover:bg-neutral-900">
            Week
          </button>
          <button className="text-base font-medium text-white px-3 py-[6px] border border-neutral-600 rounded-lg hover:bg-neutral-900">
            Month
          </button>
          <button className="text-base font-medium text-white px-3 py-[6px] border border-neutral-600 rounded-lg hover:bg-neutral-900">
            All
          </button>
        </div>
        <div className="pt-[30px] flex gap-[10px]">
          <Image
            src="/assets/img/icons/clock.svg"
            alt=""
            width={15}
            height={15}
          />
          <p className="text-base font-medium text-neutral-600">
            Resets in 5h 27m 33s
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-5 w-full pt-[30px] lg:pt-[48px]">
          <div className="bg-none lg:bg-[linear-gradient(100.7deg,_rgba(0,0,0,0)_37.9%,_rgba(96,4,213,0.5)_203.22%),linear-gradient(68.12deg,_rgba(24,20,32,0)_35.67%,_#292929_101.76%)] px-0 lg:px-[50px] py-0 lg:py-[46px] flex-1 lg:border-t lg:border-[#505050] lg:shadow-md">
            <div className="flex items-center justify-center lg:justify-start gap-[10px] xl:gap-[18px]">
              <Image
                src="/assets/img/icons/chart.svg"
                alt=""
                className="h-[16px] xl:h-[28px]"
                width={32}
                height={27}
              />
              <p className="text-base xl:text-4xl font-integralcf text-white">
                VOLUME
              </p>
            </div>
            <div className="flex flex-col gap-[20px] pt-[25px]">
              {isClient && leaderboardData
                ? renderVolume()
                : renderVolumeLoading()}
            </div>
          </div>
          <div className="bg-none lg:bg-[linear-gradient(280.7deg,_rgba(0,0,0,0)_37.9%,_rgba(96,4,213,0.5)_203.22%),linear-gradient(68.12deg,_rgba(24,20,32,0)_35.67%,_#292929_101.76%)] px-0 lg:px-[50px] py-0 lg:py-[46px] flex-1 lg:border-t lg:border-[#505050] lg:shadow-md">
            <div className="flex items-center justify-center lg:justify-start gap-[10px] xl:gap-[18px]">
              <Image
                src="/assets/img/icons/profit.svg"
                alt=""
                className="h-[16px] xl:h-[28px]"
                width={19}
                height={27}
              />
              <p className="text-base xl:text-4xl font-integralcf text-white">
                PROFIT
              </p>
            </div>
            <div className="flex flex-col gap-[20px] pt-[25px]">
              {isClient && leaderboardData
                ? renderProfit()
                : renderProfitLoading()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
