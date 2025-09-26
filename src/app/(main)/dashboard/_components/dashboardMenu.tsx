"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {

    const pathname = usePathname();

    return (
        <div className="flex flex-row lg:flex-col justify-between lg:gap-2 w-full lg:w-[200px] px-[0px] lg:px-[20px] py-[10px]">
            <p className="hidden lg:block text-sm text-neutral-500 px-5 pb-2">Dashboard</p>
            <Link
                href='/dashboard/macro'
                className={`flex flex-col lg:flex-row items-center gap-2 px-4 py-[10px] hover:bg-neutral-900 cursor-pointer rounded-lg ${pathname.includes('macro') && 'bg-neutral-900'}`}
            >
                <div className="relative w-[20px] h-[20px]">
                    <Image
                        src={
                            pathname.includes('macro')
                                ? "/assets/img/icons/dashboard-macro-fill.svg"
                                : "/assets/img/icons/dashboard-macro.svg"
                        }
                        alt=""
                        fill
                    />
                </div>
                <p className={`text-xs lg:text-base whitespace-nowrap ${pathname.includes('macro') ? 'text-[#BFF816]' : 'text-white'}`}>Macro</p>
            </Link>
            <Link
                href='/dashboard/elections'
                className={`flex flex-col lg:flex-row items-center gap-2 px-4 py-[10px] hover:bg-neutral-900 cursor-pointer rounded-lg ${pathname.includes('elections') && 'bg-neutral-900'}`}
            >
                <div className="relative w-[20px] h-[20px]">
                    <Image
                        src={
                            pathname.includes('elections')
                                ? "/assets/img/icons/dashboard-elections-fill.svg"
                                : "/assets/img/icons/dashboard-elections.svg"
                        }
                        alt=""
                        fill
                    />
                </div>
                <p className={`text-xs lg:text-base whitespace-nowrap ${pathname.includes('elections') ? 'text-[#BFF816]' : 'text-white'}`}>Elections</p>
            </Link>
            <Link
                href='/dashboard/fed-rates'
                className={`flex flex-col lg:flex-row items-center gap-2 px-4 py-[10px] hover:bg-neutral-900 cursor-pointer rounded-lg ${pathname.includes('fed-rates') && 'bg-neutral-900'}`}
            >
                <div className="relative w-[20px] h-[20px]">
                    <Image
                        src={
                            pathname.includes('fed-rates')
                                ? "/assets/img/icons/dashboard-fedrates-fill.svg"
                                : "/assets/img/icons/dashboard-fedrates.svg"
                        }
                        alt=""
                        fill
                    />
                </div>
                <p className={`text-xs lg:text-base whitespace-nowrap ${pathname.includes('fed-rates') ? 'text-[#BFF816]' : 'text-white'}`}>Fed Rates</p>
            </Link>
            <Link
                href='/dashboard/trump'
                className={`flex flex-col lg:flex-row items-center gap-2 px-4 py-[10px] hover:bg-neutral-900 cursor-pointer rounded-lg ${pathname.includes('trump') && 'bg-neutral-900'}`}
            >
                <div className="relative w-[20px] h-[20px]">
                    <Image
                        src={
                            pathname.includes('trump')
                                ? "/assets/img/icons/dashboard-trump-fill.svg"
                                : "/assets/img/icons/dashboard-trump.svg"
                        }
                        alt=""
                        fill
                    />
                </div>
                <p className={`text-xs lg:text-base whitespace-nowrap ${pathname.includes('trump') ? 'text-[#BFF816]' : 'text-white'}`}>Trump</p>
            </Link>
            <Link
                href='/dashboard/sports'
                className={`flex flex-col lg:flex-row items-center gap-2 px-4 py-[10px] hover:bg-neutral-900 cursor-pointer rounded-lg ${pathname.includes('sports') && 'bg-neutral-900'}`}
            >
                <div className="relative w-[20px] h-[20px]">
                    <Image
                        src={
                            pathname.includes('sports')
                                ? "/assets/img/icons/dashboard-sports-fill.svg"
                                : "/assets/img/icons/dashboard-sports.svg"
                        }
                        alt=""
                        fill
                    />
                </div>
                <p className={`text-xs lg:text-base whitespace-nowrap ${pathname.includes('sports') ? 'text-[#BFF816]' : 'text-white'}`}>Sports</p>
            </Link>
        </div>
    )
}

export default DashboardMenu;