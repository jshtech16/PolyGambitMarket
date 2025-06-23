import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { useDispatch } from "react-redux";
import { setUser } from "@/providers/redux/AuthSlice";
import { navDropdownMenuList } from "@/util/nav";
import { getUserNameByWallet } from "@/util/auth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface Props {
  movePage: () => void;
}

export function truncateWalletAddress(
  address: string,
  startChars = 6,
  endChars = 4
) {
  // Check if the provided address is valid and has sufficient length
  if (typeof address !== "string" || address.length <= startChars + endChars) {
    return address; // Return the original if not long enough to truncate
  }

  // Extract the starting and ending parts of the address
  const start = address.slice(0, startChars);
  const end = address.slice(-endChars);

  // Combine and return the truncated address with ellipsis in between
  return `${start}...${end}`;
}

const NavbarDropdownMenu = ({ movePage }: Props) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const account = useAccount();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");

  useEffect(() => {
    (async () => {
      const userName = await getUserNameByWallet(address as string);
      console.log(address, userName);
      dispatch(
        setUser({
          userName: userName,
          wallet: address as string,
        })
      );
      setName(String(userName));
    })();
  }, []);

  const RedirectPage = (param: string) => {
    movePage();
    router.push("/" + param);
  };

  const handleClipCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(address));
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div>
      {isConnected && (
        <div className="flex gap-3 items-center border-b border-[#535353] px-4 py-[20px]">
          <div className="w-[40px] h-[40px] rounded-full bg-avatar-gradient"></div>
          <div className="row">
            <div className="flex items-center gap-1">
              <p className="text-sm leading-6 text-whit mb-0">{name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm leading-6 text-whit mb-0">
                {truncateWalletAddress(account.address as string, 6, 4)}
              </p>
              <ContentCopyIcon
                className="text-[11px] text-white cursor-pointer"
                onClick={handleClipCopy}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[3px] px-2 py-3">
        {navDropdownMenuList.map((list, idx) =>
          (isConnected || (!isConnected && !list.loginUser)) && (
            <p
              className="text-sm leading-6 text-white rounded-lg hover:bg-neutral-800 font-[MuseoModerno] font-bold px-4 py-2 cursor-pointer"
              onClick={() => RedirectPage(list.link)}
              key={idx}
            >
              {list.label}
            </p>
          )
        )}
      </div>
      {isConnected && (
        <div className="px-2 py-3 border-t border-[#535353]">
          <p
            className="text-sm leading-6 text-white rounded-lg hover:bg-neutral-800 font-[MuseoModerno] font-bold px-4 py-2 cursor-pointer"
            onClick={() => disconnect()}
          >
            Log Out
          </p>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdownMenu;
