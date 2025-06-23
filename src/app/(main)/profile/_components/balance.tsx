"use client";

import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import { NotificationType } from "@/interfaces/ui.interface";

import { renderNumberWithRound } from "@/util/number";
import Snipping from "./../../_components/Snipping";
import { getTokenBalance, getTokenAllowance, getUserCash } from "../_util/web3";
import { getUserBalance } from "@/util/web3";
import { PoolAddress, USDCAddress, PoolABI, ERC20ABI } from "@/constant/web3";
import { id2chain } from "@/constant/rpcs";
import { convertDecimal } from "@/util/decimal";
import { simulateAndWriteContract } from "@/util/web3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { fetchCovalentBalances } from "@/util/web3";
import Deposit from "./Deposit";

const UserBalance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDepositDlg, setOpenDepositDlg] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [userCash, setUserCash] = useState<number>(0);
  const [openWithdrawDlg, setOpenWithdrawDlg] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawPercent, setWithdrawPercent] = useState<number>(0);
  const [chain, setChain] = useState<string>("polygon");

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

  const chainId = useChainId();
  const account = useAccount();

  const depositHandler = useCallback(() => {
    if (walletBalance < depositAmount) {
      pushMessage("Insufficient balance", "error");
      return;
    }
    if (USDCAddress[chain] == undefined) {
      pushMessage("Switch to Polygon Chain", "error");
      return;
    }
    if (account.address == undefined) {
      pushMessage("Connect Wallet", "error");
      return;
    }
    setLoading(true);
    const run = async () => {
      const depositFunc = async () => {
        const ret = await simulateAndWriteContract(
          PoolAddress[chain],
          PoolABI,
          "deposit",
          [convertDecimal(depositAmount, USDCAddress[chain].decimals, "toBN")]
        );
        if (ret.state == "ok" && ret.data == true) {
          pushMessage("Completed", "success");
          setLoading(false);

          const [ret1, ret2, ret3] = await Promise.all([
            getTokenBalance(chain, USDCAddress[chain], String(account.address)),
            getUserBalance(chain, USDCAddress[chain], String(account.address)),
            getUserCash(chain, USDCAddress[chain], String(account.address)),
          ]);
          if (ret1.state == "ok") {
            setWalletBalance(ret1.data);
          } else {
            setWalletBalance(0);
          }
          if (ret2.state == "ok") {
            setUserBalance(ret2.data);
          } else {
            setUserBalance(0);
          }
          if (ret3.state == "ok") {
            setUserCash(ret3.data);
          } else {
            setUserCash(0);
          }
        } else {
          pushMessage("Faild", "error");
          setLoading(false);
        }
      };

      const allowance = await getTokenAllowance(
        chain,
        USDCAddress[chain],
        PoolAddress[chain],
        String(account.address)
      );
      if (allowance.state == "ok") {
        if (allowance.data < depositAmount) {
          const ret = await simulateAndWriteContract(
            USDCAddress[chain].address,
            ERC20ABI,
            "approve",
            [
              PoolAddress[chain],
              convertDecimal(
                depositAmount,
                USDCAddress[chain].decimals,
                "toBN"
              ),
            ]
          );
          if (ret.state == "ok" && ret.data == true) {
            await depositFunc();
          } else {
            pushMessage("Faild", "error");
            setLoading(false);
          }
        } else {
          await depositFunc();
        }
      } else {
        pushMessage("Try again later", "error");
        setLoading(false);
        return;
      }
    };
    run();
  }, [chain, account, walletBalance, depositAmount]);

  const withdrawHandler = useCallback(() => {
    if (userCash < withdrawAmount) {
      pushMessage("Insufficient balance", "error");
      return;
    }
    if (USDCAddress[chain] == undefined) {
      pushMessage("Switch to Polygon Chain", "error");
      return;
    }
    if (account.address == undefined) {
      pushMessage("Connect Wallet", "error");
      return;
    }
    setLoading(true);

    const run = async () => {
      try {
        const ret = await axios.get(
          `${process.env.NEXT_PUBLIC_API}wallet/withdraw?wallet=${account.address}&amount=${withdrawAmount}`
        );
        if (ret.data.state == "ok") {
          const ret = await simulateAndWriteContract(
            PoolAddress[chain],
            PoolABI,
            "withdraw",
            [
              convertDecimal(
                withdrawAmount,
                USDCAddress[chain].decimals,
                "toBN"
              ),
            ]
          );
          if (ret.state == "ok" && ret.data == true) {
            pushMessage("Completed", "success");
            setLoading(false);

            const [ret1, ret2, ret3] = await Promise.all([
              getTokenBalance(
                chain,
                USDCAddress[chain],
                String(account.address)
              ),
              getUserBalance(
                chain,
                USDCAddress[chain],
                String(account.address)
              ),
              getUserCash(chain, USDCAddress[chain], String(account.address)),
            ]);
            if (ret1.state == "ok") {
              setWalletBalance(ret1.data);
            } else {
              setWalletBalance(0);
            }
            if (ret2.state == "ok") {
              setUserBalance(ret2.data);
            } else {
              setUserBalance(0);
            }
            if (ret3.state == "ok") {
              setUserCash(ret3.data);
            } else {
              setUserCash(0);
            }
          } else {
            pushMessage("Faild", "error");
            setLoading(false);
          }
        } else {
          setLoading(false);
          pushMessage(
            ret.data.code.code
              ? JSON.stringify(ret.data.code.code)
              : JSON.stringify(ret.data.code),
            "error"
          );
        }
      } catch (error) {
        setLoading(false);
        pushMessage(error as string, "error");
      }
    };
    run();
  }, [chain, account, userCash, withdrawAmount]);

  useEffect(() => {
    // Example usage:
    console.log("fetch covalent balances");
    fetchCovalentBalances(
      "0xFab16528423959119Fb29270efF3F7752Ed2F063",
      10
    ).then((balances) => {
      console.log(balances);
      console.log("Non-Zero Balances:", balances);
    });
    const run = async () => {
      const [ret1, ret2, ret3] = await Promise.all([
        getTokenBalance(chain, USDCAddress[chain], String(account.address)),
        getUserBalance(chain, USDCAddress[chain], String(account.address)),
        getUserCash(chain, USDCAddress[chain], String(account.address)),
      ]);
      if (ret1.state == "ok") {
        setWalletBalance(ret1.data);
      } else {
        setWalletBalance(0);
      }
      if (ret2.state == "ok") {
        setUserBalance(ret2.data);
      } else {
        setUserBalance(0);
      }
      if (ret3.state == "ok") {
        setUserCash(ret3.data);
      } else {
        setUserCash(0);
      }
    };
    if (USDCAddress[chain] != undefined && account.address != undefined) {
      run();
    } else {
      setWalletBalance(0);
      setUserBalance(0);
      setUserCash(0);
    }
  }, [chain, account]);

  useEffect(() => {
    if (id2chain[chainId as keyof typeof id2chain] != undefined) {
      setChain(id2chain[chainId as keyof typeof id2chain]);
    }
  }, [chainId]);

  return (
    <>
      {loading && <Snipping></Snipping>}

      <div className="w-full sm:flex items-center justify-between text-foreground rounded-3xl p-6 max-w-[1000px] mx-auto">
        <div>
          <p className="text-2xl text-center font-semibold">Wallet</p>
          <p className="text-sm text-neutral-500 text-center">Your Balance</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="bg-[#6004D5] rounded-full w-[40px] h-[40px] flex justify-center items-center">
            <AttachMoneyIcon className="text-[27px] text-neutral-300 border border-neutral-300 rounded-full p-[4px]" />
          </div>
          <p className="flex justify-center items-center text-4xl">
            ${renderNumberWithRound(String(userBalance), true, "0.00", 2, true)}
          </p>
        </div>

        <div className="flex items-center justify-center mt-4 sm:mt-0">
          <div
            className="cursor-pointer bg-[#BFF816] text-black p-2 px-4 rounded-xl mr-2"
            onClick={() => setOpenDepositDlg(true)}
          >
            Deposit
          </div>
          <div
            className="cursor-pointer bg-black text-white p-2 px-4 rounded-xl border border-gray-400"
            onClick={() => setOpenWithdrawDlg(true)}
          >
            Withdraw
          </div>
        </div>
      </div>

      <Dialog onClose={() => setOpenDepositDlg(false)} open={openDepositDlg}>
        <DialogContent className="bg-gray-800 p-2 rounded-2xl items-center justify-center">
          <div
            className="absolute top-1 right-1 p-1 cursor-pointer hover:bg-slate-400 rounded-full"
            onClick={() => setOpenDepositDlg(false)}
          >
            <CloseIcon className="text-foreground"></CloseIcon>
          </div>
          <div>
            <Deposit
              setDepositAmount={setDepositAmount}
              depositHandler={depositHandler}
            ></Deposit>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog onClose={() => setOpenWithdrawDlg(false)} open={openWithdrawDlg}>
        <DialogContent className="bg-background-2nd p-2">
          <div
            className="absolute top-0 right-0 p-1 cursor-pointer hover:bg-slate-400 rounded-full"
            onClick={() => setOpenWithdrawDlg(false)}
          >
            <CloseIcon className="text-foreground"></CloseIcon>
          </div>
          <div className="w-full sm:w-80 max-h-[24rem] sm:ml-2 mt-4 px-4 overflow-hidden flex flex-wrap justify-between items-center text-foreground">
            <div className="w-full flex items-center justify-between text-slate-400">
              <div>Withdraw</div>
              <div className="cursor-pointer hover:text-slate-200">
                Max:{" "}
                {renderNumberWithRound(String(userCash), true, "0.00", 2, true)}
              </div>
            </div>
            <div className="w-full py-2">
              <div className="w-full border border-slate-400 rounded-xl p-2">
                <input
                  className="bg-transparent border-none outline-none w-full"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(Number(e.target.value));
                    if (userCash > 0) {
                      setWithdrawPercent(
                        (Number(e.target.value) / userCash) * 100
                      );
                    } else {
                      setWithdrawPercent(0);
                    }
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full px-1">
              <Slider
                classes={{
                  mark: "text-indigo-900",
                  markLabel: "text-foreground",
                  valueLabel: "text-foreground",
                  rail: "text-indigo-100",
                  thumb: "text-indigo-400",
                  track: "text-slate-100",
                  active: "text-indigo-400",
                }}
                defaultValue={0}
                value={withdrawPercent}
                onChange={(e, v) => {
                  setWithdrawPercent(Number(v));
                  setWithdrawAmount((userCash * Number(v)) / 100);
                }}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: "0%" },
                  { value: 25, label: "25%" },
                  { value: 50, label: "50%" },
                  { value: 75, label: "75%" },
                  { value: 100, label: "100%" },
                ]}
              />
            </div>
            <div
              className="w-full text-center cursor-pointer bg-[#BFF816] text-black p-2 rounded-2xl mb-2"
              onClick={() => withdrawHandler()}
            >
              Withdraw
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

export default UserBalance;
