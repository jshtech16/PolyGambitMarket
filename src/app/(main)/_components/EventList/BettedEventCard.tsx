import React, { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import Snipping from "../Snipping";
import axios from "axios";
import { NotificationType } from "@/interfaces/ui.interface";
import { Snackbar } from "@mui/material";
import { PortfolioInterface } from "@/interfaces/portfolio.interface";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface EventCardProps {
  item: PortfolioInterface;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BettedEventCard: React.FC<EventCardProps> = ({ item }) => {
  const account = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [msgOpen, setMsgOpen] = React.useState(false);
  const [msgText, setMsgText] = React.useState("");
  const [msgType, setMsgType] = React.useState<NotificationType>("success");

  const pushMessage = (msgText: string, msgType: NotificationType) => {
    setMsgOpen(false);
    setTimeout(() => {
      setMsgText(msgText);
      setMsgType(msgType);
      setMsgOpen(true);
    }, 500);
  };

  const claimHandler = useCallback(
    (conditionId: string, tokenId: string, size: number) => {
      const run = async () => {
        setLoading(true);
        const ret = await axios.post(
          `${process.env.NEXT_PUBLIC_API}order/claimOrder`,
          {
            chain: "polygon",
            tokeId: tokenId,
            conditionId: conditionId,
            size: size,
            wallet: account.address,
          }
        );
        const data = ret.data;
        if (data.state == "ok" && data.data == true) {
          pushMessage("Success", "success");
        } else {
          pushMessage(
            data.code.code
              ? JSON.stringify(data.code.code)
              : JSON.stringify(data.code),
            "error"
          );
        }
        setLoading(false);
      };

      if (account.address == undefined) {
        pushMessage("Connect Wallet", "error");
        return;
      }
      run();
    },
    [account]
  );

  return (
    <>
      {loading && <Snipping></Snipping>}
      <div className="w-full h-full flex flex-col justify-between bg-black bg-[linear-gradient(107.7deg,rgba(0,0,0,0)_37.9%,rgba(96,4,213,0.2)_113.22%),linear-gradient(248.12deg,rgba(24,20,32,0)_35.67%,#292929_101.76%)] rounded-lg pt-5 shadow-md hover:shadow-lg">
        <div className="flex items-center justify-between gap-3 px-5">
          <div className="pb-5 flex items-center justify-between gap-5">
            <div
              className="w-[40px] h-[40px] overflow-hidden rounded-md bg-top bg-no-repeat bg-cover"
              style={{ backgroundImage: "url(" + item.icon + ")" }}
            ></div>
            <div
              className="h-[40px] overflow-hidden flex justify-center flex-col"
              style={{ width: "calc(100% - 52px)" }}
            >
              <Link href={"/event/" + item.slug}>
                <p className="text-sm text-white font-medium overflow-hidden cursor-pointer hover:underline">
                  {item.title}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 px-4">
          <div className="text-sm flex-1 flex flex-col gap-1 items-start">
            <div className="text-green-600">
              {item.outcome} {Number(item.curPrice * 100).toFixed(2)}
              {`¢`}
            </div>
            <div>{Number(item.sizeUser).toFixed(2)} shares</div>
          </div>
          <div className="text-sm flex flex-col gap-1 items-center">
            <div className="text-neutral-500">Latest</div>
            <div>
              {Number(item.avgPrice * 100).toFixed(2)}
              {`¢`}
            </div>
          </div>
          <div className="text-sm flex flex-col gap-1 items-center">
            <div className="text-neutral-500">Bet</div>
            <div>
              $
              {Number(
                (Number(item.sizeUser) / item.size) * item.initialValue
              ).toFixed(2)}
            </div>
          </div>
          <div className="text-sm flex flex-col gap-1 items-center">
            <div className="text-neutral-500">Current</div>
            <div>
              $
              {Number(
                (Number(item.sizeUser) / item.size) * item.currentValue
              ).toFixed(2)}
            </div>
          </div>
          <div className="text-sm flex flex-col gap-1 items-center">
            <div className="text-neutral-500">To Win</div>
            <div>${Number(item.sizeUser).toFixed(2)}</div>
          </div>
        </div>
        <div className={`flex flex-col gap-1 flex-grow hide-scroll px-5`}>
          <div className="flex items-end gap-2 h-[75px] pb-2 justify-between">
            {item.redeemable ? (
              <button
                className="flex justify-center items-center gap-1 bg-[rgba(54,178,8,0.2)] hover:bg-[#1D8800] rounded-lg px-2 py-2 flex-1 text-[#BFF816] hover:text-white"
                onClick={() =>
                  claimHandler(
                    item.conditionId,
                    item.asset,
                    Number(item.sizeUser)
                  )
                }
              >
                Claim
              </button>
            ) : (
              <Link
                href={`/event/${item.eventSlug}/${item.slug}`}
                className="flex justify-center items-center gap-1 bg-[rgba(54,178,8,0.2)] hover:bg-[#1D8800] rounded-lg px-2 py-2 flex-1 text-[#BFF816] hover:text-white"
              >
                <button>Trade</button>
              </Link>
            )}
            <button className="flex justify-center items-center gap-1 bg-[rgba(255,0,0,0.1)] hover:bg-[#BB0000] rounded-lg px-2 py-2 flex-1 text-red hover:text-white">
              Share
            </button>
          </div>
        </div>
      </div>

      <Snackbar
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
      </Snackbar>
    </>
  );
};

export default BettedEventCard;
