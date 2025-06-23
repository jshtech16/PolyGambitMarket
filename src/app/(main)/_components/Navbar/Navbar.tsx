"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

// import ConnectButton from "@/components/ConnectButton";

import MobileSidebar from "./_components/MobileSidebar";
import NavbarCommonMenu from "./_components/NavbarCommonMenu";
import NavbarSearch from "./_components/NavbarSearch";
import NavbarTabMenu from "./_components/NavbarTabMenu";
import NavbarDropdownMenu from "./_components/NavbarDropdownMenu";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Auth from "./_components/auth";
import "./_components/style.scss";

const Navbar = () => {
  const router = useRouter();
  const [isopen, setIsopen] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const { isConnected } = useAccount();

  const showOrHideMobileMenu = () => {
    setVisibleSidebar(true);
  };

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div>
      <nav className="navbar bg-black">
        <div className="mx-auto">
          <div className="relative flex h-[40px] items-center justify-between">
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center gap-2">
                <div className="block lg:hidden">
                  <MenuIcon
                    className="cursor-pointer text-white mx-2"
                    onClick={() => showOrHideMobileMenu()}
                  />
                </div>
                <Image
                  src="/assets/img/logo.png"
                  alt=""
                  className="h-6 lg:h-8 w-auto cursor-pointer"
                  width={100}
                  height={100}
                  priority
                  onClick={() => goToHomePage()}
                />
              </div>
            </div>
            <NavbarSearch />
            <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <NavbarCommonMenu />
              <Auth type='auth' />
              {isConnected && (
                <NotificationsNoneOutlinedIcon className="text-[40px] px-2 cursor-pointer text-neutral-700 hover:text-white hover:bg-neutral-800 rounded-lg" />
              )}

              <div
                className={`flex justify-center items-center ${
                  isConnected ? "py-2" : "py-5"
                }`}
                onMouseLeave={() => setIsopen(false)}
              >
                <div className="hidden lg:block relative text-left">
                  <MenuIcon
                    className="cursor-pointer text-white mx-2"
                    onClick={() => setIsopen(!isopen)}
                    onMouseEnter={() => setIsopen(true)}
                  />
                  {isopen && (
                    <div
                      className="absolute right-0 z-10 bg-[linear-gradient(180deg,_#0B0B0B_0%,_#2A2A2A_100%)] rounded-lg w-[227px] shadow-lg mt-2"
                      onMouseEnter={() => setIsopen(true)}
                      onMouseLeave={() => setIsopen(false)}
                    >
                      <NavbarDropdownMenu movePage={() => {}} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarTabMenu />
      </nav>
      <MobileSidebar
        visibleSidebar={visibleSidebar}
        onClose={() => setVisibleSidebar(false)}
      />
      <div className="w-full h-[105px]"></div>
    </div>
  );
};

export default Navbar;
