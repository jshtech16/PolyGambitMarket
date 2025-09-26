"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useAccount } from 'wagmi';
import { CarouselInterface } from "@/interfaces/carousel.interface";
import Auth from './Navbar/_components/auth';
interface PropsInterface {
    data: CarouselInterface[]
}

const Carousel: React.FC<PropsInterface> = ({ data }) => {

    const router = useRouter();
    const { isConnected } = useAccount();

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [data.length]);

    const redirectPage = (link: string) => {
        router.push(link)
    }

    return (
        <div>
            <div className="relative hidden md:flex justify-start 2xl:justify-center gap-5 pt-6 overflow-x-scroll hide-scroll">
                {
                    data?.map((carousel, idx) => (
                        <div className="flex-1 min-w-[350px] max-w-[370px] bg-[linear-gradient(90deg,_#BFF816_-100%,_#2B2B2B_50%,_#2B2B2B_100%,_#6C3DB8_200%)] rounded-lg flex items-center justify-center" key={idx}>
                            <div className="flex-1 h-full px-4 py-5">
                                <p className="text-base font-medium text-white leading-5">{carousel.title}</p>
                                <p className="text-xs text-white mt-3">{carousel.description}</p>
                                {
                                    (carousel.buttonLabel === 'Add funds' && !isConnected) ?
                                        <Auth type='carousel' />
                                        :
                                        <button
                                            type="button"
                                            className="bg-[rgba(217,217,217,0.1)] px-3 py-1 rounded-full mt-4 text-sm text-white"
                                            onClick={() => redirectPage(carousel.link)}
                                        >
                                            {carousel.buttonLabel}
                                        </button>
                                }

                            </div>
                            <div className="relative flex-1 h-full">
                                <Image src={carousel.img} alt="" fill className="rounded-lg" />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="block md:hidden relative w-full mx-auto pt-6 h-[180px]">
                <div className="relative">
                    {data.map((carousel, idx) => (
                        <div
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-[linear-gradient(90deg,_#BFF816_-100%,_#2B2B2B_50%,_#2B2B2B_100%,_#6C3DB8_200%)] w-full h-[150px] rounded-lg flex items-center justify-center ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}
                            key={idx}
                        >
                            <div className="flex-1 h-full px-4 py-5">
                                <p className="text-base font-medium text-white leading-5">{carousel.title}</p>
                                <p className="text-xs text-white mt-3">{carousel.description}</p>
                                {
                                    (carousel.buttonLabel === 'Add funds' && !isConnected) ?
                                        <Auth type='carousel' />
                                        :
                                        <button
                                            type="button"
                                            className="bg-[rgba(217,217,217,0.1)] px-3 py-1 rounded-full mt-4 text-sm text-white"
                                            onClick={() => redirectPage(carousel.link)}
                                        >
                                            {carousel.buttonLabel}
                                        </button>
                                }
                            </div>
                            <div className="h-full">
                                <div className="relative w-[150px] h-[150px]">
                                    <Image src={carousel.img} alt="" fill className="rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel;