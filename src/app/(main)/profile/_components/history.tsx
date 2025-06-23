"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

import {
  PendingOrderExtType,
  PendingOrderType,
} from "@/interfaces/portfolio.interface";
// import { render } from "react-dom";

type MarketMetaType = {
  question: string;
  image: string;
};

type MarketMetaObjType = {
  [key: string]: MarketMetaType;
};

interface Bet {
  name: string;
  spent: string;
  date: string;
  position: "Won" | "Lost";
  status: "Claimed" | "Claim Now" | "Completed";
}

const betsData: Bet[] = [
  {
    name: "Bet 1",
    spent: "$14.235",
    date: "11/09/24",
    position: "Won",
    status: "Claimed",
  },
  {
    name: "Bet 2",
    spent: "$35.346",
    date: "09/09/24",
    position: "Won",
    status: "Claim Now",
  },
  {
    name: "Bet 3",
    spent: "$135.346",
    date: "04/09/24",
    position: "Lost",
    status: "Completed",
  },
  {
    name: "Bet 4",
    spent: "$45.346",
    date: "02/09/24",
    position: "Lost",
    status: "Completed",
  },
];

const History = () => {
  const [timeFilter, setTimeFilter] = useState("This week");

  const account = useAccount();

  const [historyList, setHistoryList] = useState<PendingOrderExtType[]>([]);
  const [history, setHistory] = useState<PendingOrderType[]>([]);

  const renderTime = (stamp: number): string => {
    const curTs = Math.round(new Date().getTime() / 1000);
    const anhr = 3600;
    const aday = 24 * anhr;
    const diff = curTs - stamp;
    if (diff > aday) {
      return Math.floor(diff / aday) + " days ago";
    }
    if (diff > anhr) {
      return Math.floor(diff / anhr) + " hours ago";
    }
    return Math.floor(diff / 60) + " mins ago";
  };

  console.log(historyList, renderTime);

  useEffect(() => {
    const run = async () => {
      const ids = [];
      for (const x in history) {
        if (ids.indexOf(history[x].market) == -1) {
          ids.push(history[x].market);
        }
      }
      if (ids.length == 0) {
        setHistoryList([]);
        return;
      }
      let url = `https://gamma-api.polymarket.com/markets`;
      for (const x in ids) {
        if (Number(x) == 0) {
          url += "?";
        } else {
          url += "&";
        }
        url += `condition_ids=${ids[x]}`;
      }
      const ret = await axios.get(url);
      const dic: MarketMetaObjType = {};
      for (const x in ret.data) {
        dic[ret.data[x].conditionId] = {
          question: ret.data[x].question,
          image: ret.data[x].image,
        };
      }
      const data: PendingOrderExtType[] = [];
      for (const x in history) {
        if (dic[history[x].market]) {
          data.push({
            question: dic[history[x].market].question,
            image: dic[history[x].market].image,
            ...history[x],
          });
        }
      }
      setHistoryList(data);
    };
    if (history.length > 0) {
      run();
    } else {
      setHistoryList([]);
    }
  }, [history]);

  useEffect(() => {
    const run = async () => {
      try {
        const ret = await axios.get(
          `${process.env.NEXT_PUBLIC_API}order/history?wallet=${account.address}`
        );
        setHistory(ret.data);
      } catch (error) {
        console.log(error);
        setHistory([]);
      }
    };
    if (account.address) {
      run();
    } else {
      setHistory([]);
    }
  }, [account]);

  return (
    <div className="bg-black text-white rounded-2xl p-4 max-w-[1000px] mx-auto border border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bets History</h2>
        <div className="relative">
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            onClick={() => setTimeFilter("This week")}
          >
            {timeFilter}
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Spent</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Position</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {betsData.map((bet, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } hover:bg-gray-700`}
            >
              <td className="py-2 px-4 flex items-center">
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                    bet.name.startsWith("A")
                      ? "bg-orange-500"
                      : bet.name.startsWith("T")
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {bet.name.charAt(0)}
                </span>
                {bet.name}
              </td>
              <td className="py-2 px-4">{bet.spent}</td>
              <td className="py-2 px-4">{bet.date}</td>
              <td
                className={`py-2 px-4 ${
                  bet.position === "Won" ? "text-green-400" : "text-red-400"
                }`}
              >
                {bet.position}
              </td>
              <td className="py-2 px-4">
                {bet.status === "Claim Now" ? (
                  <button className="bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-400">
                    Claim Now
                  </button>
                ) : (
                  <span
                    className={`${
                      bet.status === "Claimed" ? "text-gray-400" : "text-white"
                    }`}
                  >
                    {bet.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <>
    //   <div className="w-full sm:block text-foreground rounded-3xl p-6 bg-background-2nd">
    //     <div className="hidden sm:flex w-full justify-between font-medium text-lg">
    //       <div className="w-24">Type</div>
    //       <div className="flex-grow">Market</div>
    //       <div className="w-24">Outcome</div>
    //       <div className="w-24">Price</div>
    //       <div className="w-24">Shares</div>
    //       <div className="w-24">Value</div>
    //       <div className="w-32">Date</div>
    //     </div>

    //     {historyList.map((item, index) =>
    //       <div
    //         key={index}
    //         className="sm:flex items-center w-full justify-between border-t py-2"
    //       >
    //         <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Type:</span>
    //           <span>{item.side.toUpperCase()}</span>
    //         </div>
    //         <div className="flex-grow">
    //           <div className="flex items-center">
    //             <div className="w-12 h-12 m-1 mr-4">
    //               <Image
    //                 src={item.image}
    //                 alt=""
    //                 width={100}
    //                 height={100}
    //                 className="w-full h-full"
    //               ></Image>
    //             </div>
    //             <div className="text-lg font-medium">{item.question}</div>
    //           </div>
    //         </div>
    //         <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Outcome:</span>
    //           <span>{item.outcome}</span>
    //         </div>
    //         <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Price:</span>
    //           <span>{Number(item.price * 100).toFixed(2)}{`¢`}</span>
    //         </div>
    //         <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Shares:</span>
    //           <span>{item.size_matched}</span>
    //         </div>
    //         <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Value:</span>
    //           <span>${Number(item.price*item.size_matched).toFixed(2)}</span>
    //         </div>
    //         <div className="w-full sm:w-32 flex items-center justify-center sm:justify-start">
    //           <span className="block sm:hidden mr-2">Date:</span>
    //           <span>{renderTime(item.created_at)}</span>
    //         </div>
    //       </div>
    //     )}

    //     {historyList.length == 0 &&
    //       <div className="text-center mt-6">There is no history</div>
    //     }
    //   </div>
    // </>
  );
};

export default History;
