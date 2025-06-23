'use client'

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import axios from "axios";

import CloseIcon from '@mui/icons-material/Close';

import { PendingOrderExtType, PendingOrderType } from "@/interfaces/portfolio.interface";

type MarketMetaType = {
  question: string;
  image: string;
}

type MarketMetaObjType = {
  [key: string]: MarketMetaType
}

const UserOpenOrder = () => {
  const account  = useAccount();

  const [portfolioList, setPortfolioList] = useState<PendingOrderExtType[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrderType[]>([]);

  useEffect(() => {
    const run = async() => {
      const ids = []
      for (const x in pendingOrders) {
        if (ids.indexOf(pendingOrders[x].market) == -1) {
          ids.push(pendingOrders[x].market)
        }
      }
      if (ids.length == 0) {
        setPortfolioList([]);
        return;
      }
      let url = `https://gamma-api.polymarket.com/markets`
      for (const x in ids) {
        if (Number(x) == 0) {
          url += "?"
        }
        else {
          url += "&"
        }
        url += `condition_ids=${ids[x]}`
      }
      const ret = await axios.get(url);
      const dic: MarketMetaObjType = {}
      for (const x in ret.data) {
        dic[ret.data[x].conditionId] = {
          question: ret.data[x].question,
          image: ret.data[x].image
        }
      }
      const data: PendingOrderExtType[] = []
      for (const x in pendingOrders) {
        if (dic[pendingOrders[x].market]) {
          data.push({
            question: dic[pendingOrders[x].market].question,
            image: dic[pendingOrders[x].market].image,
            ...pendingOrders[x]
          })
        }
      }
      setPortfolioList(data);
    }
    if (pendingOrders.length > 0) {
      run();
    }
    else {
      setPortfolioList([])
    }
  }, [pendingOrders]);

  useEffect(() => {
    const run = async() => {
      try {
        const ret = await axios.get(`${process.env.NEXT_PUBLIC_API}order/pendingOrder?wallet=${account.address}`);
        setPendingOrders(ret.data);
      } catch (error) {
        console.log(error)
        setPendingOrders([]);
      }
    }
    if (account.address) {
      run();
    }
    else {
      setPendingOrders([]);
    }
  }, [account]);

  return (
    <>
      <div className="w-full sm:block text-foreground rounded-3xl p-6 bg-background-2nd">
        <div className="hidden sm:flex w-full justify-between font-medium text-lg">
          <div className="flex-grow">Market</div>
          <div className="w-24">Side</div>
          <div className="w-24">Outcome</div>
          <div className="w-24">Price</div>
          <div className="w-24">Filled</div>
          <div className="w-24">Total</div>
          <div className="w-24">Expiration</div>
          <div className="w-24">{` `}</div>
        </div>

        {portfolioList.map((item, index) =>
          <div
            key={index}
            className="sm:flex items-center w-full justify-between border-t py-2"
          >
            <div className="flex-grow">
              <div className="flex items-center">
                <div className="w-12 h-12 m-1 mr-4">
                  <Image
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full"
                  ></Image>
                </div>
                <div className="text-lg font-medium">{item.question}</div>
              </div>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Side:</span>
              <span>{item.side}</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Outcome:</span>
              <span>{item.outcome}</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Price:</span>
              <span>{Number(item.price * 100).toFixed(2)}{`¢`}</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Filled:</span>
              <span>{item.size_matched}/6</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Total:</span>
              <span>${Number(item.price*item.original_size).toFixed(2)}</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Expiration:</span>
              <span>Until Cancelled</span>
            </div>
            <div className="w-full sm:w-24 flex items-center justify-center">
              <CloseIcon></CloseIcon>
            </div>
          </div>
        )}

        {portfolioList.length == 0 &&
          <div className="text-center mt-6">There is no open orders</div>
        }
      </div>
    </>
  )
}

export default UserOpenOrder