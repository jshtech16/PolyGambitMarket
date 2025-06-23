import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useSelector, useDispatch } from "react-redux";
import { setWallet, setUserBalance } from "@/providers/redux/WalletSlice";
import { walletaddress } from "@/providers/redux/WalletSlice";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { getUserBalance } from "@/util/web3";
import { USDCAddress } from "@/constant/web3";
import {
  checkUserNameExist,
  createUser,
  getUserNameByWallet,
} from "@/util/auth";

interface PropsInterface {
  type: string
}

const Auth: React.FC<PropsInterface> = ({ type }) => {
  const dispatch = useDispatch();
  const rdxwalletaddress = useSelector(walletaddress);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameExist, setNameExist] = useState(false);

  useEffect(() => {
    console.log(getUserNameByWallet(String(address)));
    // setUser({
    //   name: "aaa",
    //   wallet: String(address),
    // });
    const chain = "polygon";
    const fetchBalance = async () => {
      const ret = await getUserBalance(
        chain,
        USDCAddress[chain],
        rdxwalletaddress
      );
      if (ret.state === "ok") {
        dispatch(setUserBalance(ret.data));
      } else {
        dispatch(setUserBalance(0));
      }
    };
    if (rdxwalletaddress !== "") {
      fetchBalance();
    } else {
      dispatch(setUserBalance(0));
    }
  }, [dispatch, rdxwalletaddress]);

  useEffect(() => {
    (async () => {
      if (isConnected) {
        dispatch(
          setWallet({
            active: true,
            address: address,
          })
        );
        const username = await getUserNameByWallet(address as string);
        console.log("res", username);
        if (username === null) {
          setModalVisible(true);
        }
      } else {
        dispatch(
          setWallet({
            active: false,
            address: "",
          })
        );
      }
    })();
  }, [dispatch, isConnected, address]);

  const handleNameSubmit = async () => {
    if ((await checkUserNameExist(userName)) === null) {
      await createUser(userName, address as string, "");
      setModalVisible(false);
    } else {
      setNameExist(true);
    }
  };

  return (
    <>
      {!isConnected && type === 'auth' && (
        <div className="flex gap-3">
          <button
            className="gradiant-btn px-3 py-1 rounded-lg text-white text-sm font-semibold"
            onClick={() => open()}
          >
            Log In
          </button>
          <button
            className="bg-[#BFF816] px-3 py-1 rounded-lg text-black text-sm font-semibold"
            onClick={() => open()}
          >
            Sign Up
          </button>
        </div>
      )}
      {!isConnected && type === 'carousel' && (
        <button
          type="button"
          className="bg-[rgba(217,217,217,0.1)] px-3 py-1 rounded-full mt-4 text-sm text-white"
          onClick={() => open()}
        >
          Sign up
        </button>
      )}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg w-80 border border-neutral-700">
            <p className="text-lg font-semibold text-center">
              Create New Account
            </p>
            <input
              type="text"
              className="w-full h-full px-5 py-3 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none mt-4"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {nameExist && (
              <p className="text-red text-sm mt-2 ps-2">
                This name already exists.
              </p>
            )}

            <div className="text-center">
              <button
                className="gradiant-btn px-3 py-1 rounded-lg mt-4 mx-auto"
                onClick={handleNameSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
