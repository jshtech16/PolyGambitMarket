import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useSelector, useDispatch } from "react-redux";
import { setWallet, setUserBalance } from "@/providers/redux/WalletSlice";
import { walletaddress } from "@/providers/redux/WalletSlice";

import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { getUserBalance } from "@/util/web3";
import { USDCAddress } from "@/constant/web3";

const truncateAddress = (address: string) => {
  return address.slice(0, 5) + "..." + address.slice(-5);
};

export default function ConnectButton() {
  const dispatch = useDispatch();
  const rdxwalletaddress = useSelector(walletaddress);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const chain = "polygon";
    const run = async () => {
      const ret = await getUserBalance(
        chain,
        USDCAddress[chain],
        rdxwalletaddress
      );
      if (ret.state == "ok") {
        dispatch(setUserBalance(ret.data));
      } else {
        dispatch(setUserBalance(0));
      }
    };
    if (rdxwalletaddress != "") {
      run();
    } else {
      dispatch(setUserBalance(0));
    }
  }, [dispatch, rdxwalletaddress]);

  useEffect(() => {
    if (isConnected == true) {
      dispatch(
        setWallet({
          active: true,
          address: address,
        })
      );
    } else {
      dispatch(
        setWallet({
          active: false,
          address: "",
        })
      );
    }
  }, [dispatch, isConnected, address]);

  return (
    <>
      {isConnected ? (
        <div className="flex gap-1 items-center px-2 text-[#BCFF00] cursor-pointer">
          <span style={{ color: "#bcff00" }}>
            <FontAwesomeIcon icon={faWallet} />
          </span>
          <span
            className="text-xs px-3 py-0 rounded-lg font-semibold text-[#ddd]"
            onClick={() => open({ view: "Account" })}
          >
            {address ? truncateAddress(address) : ""}
          </span>
        </div>
      ) : (
        <button
          onClick={() => open()}
          className="bg-[#BCFF00] text-black text-xs px-3 py-2 font-semibold rounded-lg cursor-pointer"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}
