'use client'

import { useEffect, useState } from "react";
import Activity from './_components/Activity';
import ActivityLoading from './_components/ActivityLoading';

const ActivityPage = () => {

    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsClient(true);
        }, 1000);
    })

    const renderActivity = () => {
        const activity = [];
        for (let i = 0; i < 10; i++) {
            activity.push(
                <div className="border-b border-neutral-800" key={i}>
                    <Activity />
                </div>
            )
        }
        return activity;
    }

    const renderActivityLoading = () => {
        const activity = [];
        for (let i = 0; i < 5; i++) {
            activity.push(<ActivityLoading key={i} />)
        }
        return activity;
    }

    return (
        <div className="bg-black px-[20px] py-[60px] flex justify-center">
            <div className="w-full max-w-[1100px]">
                <div className="flex justify-between">
                    <p className="text-base xl:text-2xl text-white font-integralcf">RECENT ACTIVITY</p>
                    <div>
                        <p className="text-[8px] xl:text-base text-white border rounded-lg px-2 py-1 cursor-pointer">Min Amount</p>
                    </div>
                </div>
                <div className="flex flex-col gap-[30px] pt-[40px]">
                    {isClient ? (renderActivity()) : (renderActivityLoading())}
                </div>
                <div className="w-full text-center">
                    <button className="mt-[40px] px-[30px] py-[14px] rounded-lg bg-[linear-gradient(122deg,#404040_-4.93%,#101500_96.35%)] text-white">See More</button>
                </div>
            </div>
        </div>
    )
}

export default ActivityPage;