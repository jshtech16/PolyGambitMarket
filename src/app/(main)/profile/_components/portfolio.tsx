"use client";

import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { useAccount } from "wagmi";
import axios from "axios";

// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";
// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// import { NotificationType } from "@/interfaces/ui.interface";

import { getUserPolyTokenBalance } from "@/util/web3";
import { PortfolioInterface } from "@/interfaces/portfolio.interface";

// import Snipping from "./../../_components/Snipping";
import BettedEventCard from "../../_components/EventList/BettedEventCard";

const UserPortfolio = () => {
  const account = useAccount();

  const [proxyWallet, setProxyWallet] = useState<string>("");
  const [portfolioList, setPortfolioList] = useState<PortfolioInterface[]>([]);

  // const [loading, setLoading] = useState<boolean>(false);
  // const [msgOpen, setMsgOpen] = React.useState(false);
  // const [msgText, setMsgText] = React.useState("");
  // const [msgType, setMsgType] = React.useState<NotificationType>("success");
  // const pushMessage = (msgText: string, msgType: NotificationType) => {
  //   setMsgOpen(false);
  //   setTimeout(() => {
  //     setMsgText(msgText);
  //     setMsgType(msgType);
  //     setMsgOpen(true);
  //   }, 500);
  // };

  // const claimHandler = useCallback(
  //   (conditionId: string, tokenId: string, size: number) => {
  //     const run = async () => {
  //       setLoading(true);
  //       const ret = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API}order/claimOrder`,
  //         {
  //           chain: "polygon",
  //           tokeId: tokenId,
  //           conditionId: conditionId,
  //           size: size,
  //           wallet: account.address,
  //         }
  //       );
  //       const data = ret.data;
  //       if (data.state == "ok" && data.data == true) {
  //         pushMessage("Success", "success");
  //       } else {
  //         pushMessage(
  //           data.code.code
  //             ? JSON.stringify(data.code.code)
  //             : JSON.stringify(data.code),
  //           "error"
  //         );
  //       }
  //       setLoading(false);
  //     };

  //     if (account.address == undefined) {
  //       pushMessage("Connect Wallet", "error");
  //       return;
  //     }
  //     run();
  //   },
  //   [account]
  // );

  useEffect(() => {
    const run = async () => {
      const ret = await axios.get(
        `https://data-api.polymarket.com/positions?user=${proxyWallet}&sizeThreshold=.1&limit=50&offset=0&sortBy=CURRENT&sortDirection=DESC`
      );
      const tmp: PortfolioInterface[] = ret.data;
      if (tmp.length > 0) {
        const chain = "polygon";
        const tokens: string[] = [];
        for (const x in tmp) {
          tokens.push(tmp[x].asset);
        }
        const bal = await getUserPolyTokenBalance(
          chain,
          tokens,
          account.address as string
        );
        const userdata: PortfolioInterface[] = [];
        if (bal.state == "ok") {
          for (const x in tmp) {
            if (bal.data[x] > 0) {
              const item = JSON.parse(JSON.stringify(tmp[x]));
              item.sizeUser = bal.data[x];
              userdata.push(item);
            }
          }
        }
        setPortfolioList(userdata);
        console.log(userdata)
      } else {
        setPortfolioList([]);
      }
    };
    if (account.address != undefined && proxyWallet != "") {
      run();
    } else {
      setPortfolioList([]);
    }
  }, [proxyWallet, account]);

  useEffect(() => {
    try {
      const run = async () => {
        const ret = await axios.get(
          `${process.env.NEXT_PUBLIC_API}wallet/proxywallet`
        );
        setProxyWallet(ret.data);
      };
      run();
    } catch (error) {
      console.log(error);
      setProxyWallet("");
    }
  }, []);

  return (
    <>
      {/* {loading && <Snipping></Snipping>} */}
      <div className="w-full sm:block text-foreground rounded-3xl p-6">
        {/* <div className="hidden sm:flex w-full justify-between font-medium text-lg">
          <div className="flex-grow">Market</div>
          <div className="w-32">Latest</div>
          <div className="w-32">Bet</div>
          <div className="w-32">Current</div>
          <div className="w-32">To Win</div>
          <div className="w-80">{` `}</div>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-5">
          {
            portfolioList.map((item, index) => (
              <BettedEventCard item={item} key={index} />
            ))
          }
        </div>
        {/* {portfolioList.map((item, index) => (
          <div
            key={index}
            className="sm:flex items-center w-full justify-between border-t py-2 text-white"
          >
            <div className="flex-grow">
              <div className="flex">
                <div className="w-12 h-12 m-1 mr-4">
                  <Image
                    src={item.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full"
                  ></Image>
                </div>
                <div>
                  <div className="text-lg font-medium">{item.title}</div>
                  <div className="flex text-sm">
                    <div className="text-green-600 mr-2">
                      {item.outcome} {Number(item.curPrice * 100).toFixed(2)}
                      {`¢`}
                    </div>
                    <div>{Number(item.sizeUser).toFixed(2)} shares</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-32 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Latest:</span>
              <span>
                {Number(item.avgPrice * 100).toFixed(2)}
                {`¢`}
              </span>
            </div>
            <div className="w-full sm:w-32 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Bet:</span>
              <span>
                $
                {Number(
                  (Number(item.sizeUser) / item.size) * item.initialValue
                ).toFixed(2)}
              </span>
            </div>
            <div className="w-full sm:w-32 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">Current:</span>
              <span>
                $
                {Number(
                  (Number(item.sizeUser) / item.size) * item.currentValue
                ).toFixed(2)}
              </span>
              <span
                className={`${item.cashPnl > 0 ? "text-green-500" : "text-rose-500"
                  } text-sm`}
              >
                ({Number((item.cashPnl / item.initialValue) * 100).toFixed(2)}%)
              </span>
            </div>
            <div className="w-full sm:w-32 flex items-center justify-center sm:justify-start">
              <span className="block sm:hidden mr-2">To Win:</span>
              <span>${Number(item.sizeUser).toFixed(2)}</span>
            </div>
            <div className="w-full sm:w-80 flex items-center justify-center">
              {item.redeemable ? (
                <div
                  className="bg-[#BFF816] text-black px-5 py-2 rounded-lg font-semibold mt-4"
                  onClick={() =>
                    claimHandler(
                      item.conditionId,
                      item.asset,
                      Number(item.sizeUser)
                    )
                  }
                >
                  Claim
                </div>
              ) : (
                <Link href={`/event/${item.eventSlug}/${item.slug}`}>
                  <div className="bg-[#BFF816] text-black px-5 py-2 rounded-lg font-semibold mt-4">
                    Trade
                  </div>
                </Link>
              )}

              <div className="bg-[#BFF816] text-black px-5 py-2 rounded-lg font-semibold mt-4">
                Share
              </div>
            </div>
          </div>
        ))} */}

        {portfolioList.length == 0 &&
          <div className="text-center mt-6">There is no positions</div>
        }
      </div>

      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={msgOpen}
        autoHideDuration={6000}
        onClose={() => {
          setMsgOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setMsgOpen(false);
          }}
          severity={msgType}
          sx={{ width: "100%" }}
        >
          {msgText}
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default UserPortfolio;
