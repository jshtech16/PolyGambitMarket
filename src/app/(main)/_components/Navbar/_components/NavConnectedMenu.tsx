import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Link from "next/link";

const NavConnectedMenu = () => {
  return (
    <div className="flex items-center gap-1">
      <Link href="/portfolio">
        <div className="hidden sm:flex items-center flex-col gap-1 px-2 py-1 rounded-lg cursor-pointer hover:bg-neutral-800 text-neutral-400 text-neutral-600 hover:text-white">
          <p className="text-G0 text-lg leading-[19px]">
            $0.00
          </p>
          <p className="font-medium leading-4 mb-0">Portfolio</p>
        </div>
      </Link>
      <Link href="/wallet">
        <div className="hidden sm:flex items-center flex-col gap-1 px-2 py-1 rounded-lg cursor-pointer hover:bg-neutral-800 text-neutral-400 text-neutral-600 hover:text-white">
          <p className="text-G0 text-lg leading-[19px]">
            $0.00
          </p>
          <p className="font-medium leading-4 mb-0">Cash</p>
        </div>
      </Link>
      <div className="hidden sm:block px-2">
        <button
          type="button"
          className="bg-[#BCFF00] text-black text-xs px-3 py-2 font-semibold rounded-lg cursor-pointer"
        >
          Deposit
        </button>
      </div>
      <div className="p-2 cursor-pointer rounded-lg hover:bg-neutral-800 relative">
        <NotificationsOutlinedIcon className="text-white" />
        <span className="absolute bottom-[11px] right-[11px] w-[5px] h-[5px] bg-[#FF0000] rounded-full"></span>
      </div>
      <div className="hidden lg:block mx-2 h-[36px]">
        <hr className="border h-full border-neutral-600" />
      </div>
    </div>
  );
};

export default NavConnectedMenu;
