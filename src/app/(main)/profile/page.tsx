"use client";

import { useEffect, useState } from "react";

import UserBalance from "./_components/balance";
import UserPortfolio from "./_components/portfolio";
import UserOpenOrder from "./_components/openOrders";
import History from "./_components/history";
import Setting from "./_components/setting";
import Profile from "./_components/profile";
import SpendingChart from "./_components/SpendingChart";
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

const Page = () => {
  const [tab, setTab] = useState<string>("position");
  const [page, setPage] = useState("account");

  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [page]);

  return (
    <div className="bg-black pt-[40px]">
      <div className="px-[20px]">
        <div className="flex justify-between container mx-auto max-w-[1000px] border border-neutral-700 rounded-full">
          <p
            className={`flex-1 px-[20px] py-[10px] lg:py-[20px] rounded-l-full text-center cursor-pointer ${page === "account"
                ? "bg-gradient-to-r from-[#7D69F6] text-white"
                : "text-neutral-500"
              }`}
            onClick={() => setPage("account")}
          >
            Account
          </p>
          <p
            className={`flex-1 px-[20px] py-[10px] lg:py-[20px] rounded-l-full text-center cursor-pointer ${page === "profile"
                ? "bg-gradient-to-r from-[#7D69F6] text-white"
                : "text-neutral-500"
              }`}
            onClick={() => setPage("profile")}
          >
            Profile
          </p>
          <p
            className={`flex-1 px-[20px] py-[10px] lg:py-[20px] rounded-l-full text-center cursor-pointer ${page === "setting"
                ? "bg-gradient-to-r from-[#7D69F6] text-white"
                : "text-neutral-500"
              }`}
            onClick={() => setPage("setting")}
          >
            Setting
          </p>
        </div>
      </div>
      {page === "account" && (
        <div className="items-center justify-center mx-auto">
          <div className="container mx-auto px-[20px] py-[20px] flex gap-[30px]">
            <UserBalance></UserBalance>
          </div>
          <div className="mx-2 mb-5">
            <div className="flex gap-[30px] border border-gray-600 rounded-2xl justify-between max-w-[1200px] mx-auto">
              <div className="container mx-auto py-[20px] flex gap-[30px]">
                <SpendingChart></SpendingChart>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-[20px] flex items-center align-center gap-4 justify-center">
            <div
              className={`${tab == "position"
                  ? "bg-white text-black text-center"
                  : "bg-black text-white text-center border border-gray-400"
                } p-2 px-4 cursor-pointer rounded-lg`}
              onClick={() => setTab("position")}
            >
              Positions
            </div>
            <div
              className={`${tab == "pending"
                  ? "bg-white text-black text-center"
                  : "bg-black text-white text-center border border-gray-400"
                } p-2 px-4 cursor-pointer rounded-lg`}
              onClick={() => setTab("pending")}
            >
              Open Orders
            </div>

            <div
              className={`${tab == "history"
                  ? "bg-white text-black text-center"
                  : "bg-black text-white text-center border border-gray-400"
                } p-2 px-4 cursor-pointer rounded-lg`}
              onClick={() => setTab("history")}
            >
              History
            </div>
          </div>

          <div className="container mx-auto py-[40px] flex gap-[30px]">
            {tab == "position" ? (
              <UserPortfolio></UserPortfolio>
            ) : tab == "pending" ? (
              <UserOpenOrder></UserOpenOrder>
            ) : (
              <History></History>
            )}
          </div>
        </div>
      )}
      {page === "profile" && <Profile />}
      {page === "setting" && <Setting />}
    </div>
  );
};

export default Page;
