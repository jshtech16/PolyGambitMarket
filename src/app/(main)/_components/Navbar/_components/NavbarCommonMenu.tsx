import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { usePathname } from "next/navigation";

import { navMarketsList } from "@/util/nav";

const NavbarCommonMenu = () => {
  const pathname = usePathname();
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center">
      <div
        className="relative py-2"
        onMouseLeave={() => setIsMarketOpen(false)}
      >
        <div
          className="hidden lg:block"
          onMouseEnter={() => setIsMarketOpen(true)}
        >
          <Link href="/markets">
            <div className="hidden md:flex justify-between min-w-20 min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
              <div className="h-[30px] flex justify-center items-center">
                <Image
                  className=""
                  src={
                    /^\/markets/.test(pathname)
                      ? "/assets/img/icons/marketsFill.svg"
                      : "/assets/img/icons/markets.svg"
                  }
                  alt=""
                  width={15}
                  height={15}
                />
              </div>
              <p
                className={`font-medium mb-0 leading-4 text-xs ${/^\/markets/.test(pathname) ? "text-[#A9FF32]" : "text-white"
                  }`}
              >
                Markets
              </p>
            </div>
          </Link>
        </div>
        {isMarketOpen && (
          <div
            className="absolute right-[-190px] z-10 bg-gradient-to-b from-[#0B0B0B] to-[#2A2A2A] rounded-lg w-[466px] mt-2 p-[20px] flex gap-[20px] flex-col"
            onMouseEnter={() => setIsMarketOpen(true)}
            onMouseLeave={() => setIsMarketOpen(false)}
          >
            {navMarketsList.map((ele, idx) => (
              <div className="flex flex-col gap-[20px]" key={idx}>
                <div className="flex justify-between items-end">
                  <p className="text-white text-2xl font-semibold">
                    {ele.label}
                  </p>
                  {ele.view.show && (
                    <Link href="/markets">
                      <p className="text-success text-lg cursor-pointer">
                        View all
                      </p>
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-[20px]">
                  {ele.child.map((subEle, jdx) => (
                    <Link href={subEle.link} key={jdx}>
                      <div className="border border-white px-4 py-2 flex-1 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-neutral-800">
                        <Image
                          src={"/assets/img/icons/" + subEle.image}
                          alt=""
                          className="w-auto h-auto"
                          width={100}
                          height={100}
                        />
                        <p className="text-white font-medium">{subEle.label}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link href="/dashboard">
        <div className="hidden md:flex justify-between min-w-20 min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
          <div className="h-[30px] flex justify-center items-center">
            <Image
              src={
                /^\/dashboard/.test(pathname)
                  ? "/assets/img/icons/dashboard-fill.svg"
                  : "/assets/img/icons/dashboard.svg"
              }
              alt=""
              width={21}
              height={21}
            />
          </div>
          <p
            className={`font-medium mb-0 leading-4 text-xs ${/^\/dashboard/.test(pathname) ? "text-[#A9FF32]" : "text-white"
              }`}
          >
            Dashboard
          </p>
        </div>
      </Link>
      <Link href="/sports">
        <div className="hidden md:flex justify-between min-w-20 min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
          <div className="h-[30px] flex justify-center items-center">
            <Image
              src={
                /^\/sports/.test(pathname)
                  ? "/assets/img/icons/sportFill.svg"
                  : "/assets/img/icons/sport.svg"
              }
              alt=""
              width={19}
              height={19}
            />
          </div>
          <p
            className={`font-medium mb-0 leading-4 text-xs ${/^\/sports/.test(pathname) ? "text-[#A9FF32]" : "text-white"
              }`}
          >
            Sports
          </p>
        </div>
      </Link>
      <Link href="/activity">
        <div className="hidden md:flex justify-between min-w-20 min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
          <div className="h-[30px] flex justify-center items-center">
            <Image
              src={
                /^\/activity/.test(pathname)
                  ? "/assets/img/icons/activityFill.svg"
                  : "/assets/img/icons/activity.svg"
              }
              alt=""
              width={17}
              height={17}
            />
          </div>
          <p
            className={`font-medium mb-0 leading-4 text-xs ${/^\/activity/.test(pathname) ? "text-[#A9FF32]" : "text-white"
              }`}
          >
            Activity
          </p>
        </div>
      </Link>
      <Link href="/leaderboard">
        <div className="hidden md:flex justify-between min-w-20 min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
          <div className="h-[30px] flex justify-center items-center">
            <Image
              src={
                /^\/leaderboard/.test(pathname)
                  ? "/assets/img/icons/ranksFill.svg"
                  : "/assets/img/icons/ranks.svg"
              }
              alt=""
              width={17}
              height={17}
            />
          </div>
          <p
            className={`font-medium mb-0 leading-4 text-xs ${/^\/leaderboard/.test(pathname) ? "text-[#A9FF32]" : "text-white"
              }`}
          >
            Ranks
          </p>
        </div>
      </Link>
      <Link href="/ai">
        <div className="hidden md:flex justify-between min-w-[50px] min-h-[49px] max-h-[49px] items-center flex-col gap-1 px-2 rounded-lg cursor-pointer hover:bg-neutral-800 py-1 text-whitee">
          <div className="h-[30px] flex justify-center items-center">
            <Image
              src={
                /^\/ai/.test(pathname)
                  ? "/assets/img/icons/aiFill.svg"
                  : "/assets/img/icons/ai.svg"
              }
              alt=""
              width={17}
              height={17}
            />
          </div>
          <p
            className={`font-medium mb-0 leading-4 text-xs ${/^\/ai/.test(pathname) ? "text-[#A9FF32]" : "text-white"
              }`}
          >
            AI
          </p>
        </div>
      </Link>
    </div>
  );
};

export default NavbarCommonMenu;
