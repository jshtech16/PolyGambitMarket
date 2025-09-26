import React from "react";

interface PropsInterface {
    title: string;
    days: number;
    hrs: number;
    min: number;
    sec: number;
}

const TimeStamp: React.FC<PropsInterface> = ({ title, days, hrs, min, sec }) => {
    return (
        <div className="flex gap-[20px] justify-center items-center border border-[0.5px] border-neutral-800 rounded-lg p-[15px] lg:p-[24px]">
            <p className="text-xs lg:text-base text-[#A9A7B9]">{title}</p>
            <div className="flex gap-[10px]">
                <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                    <p className="text-base lg:text-xl text-white font-semibold">{days}</p>
                    <p className="text-xs lg:text-sm text-[#A9A7B9]">DAYZ</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                    <p className="text-base lg:text-xl text-white font-semibold">{hrs}</p>
                    <p className="text-xs lg:text-sm text-[#A9A7B9]">HRS</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                    <p className="text-base lg:text-xl text-white font-semibold">{min}</p>
                    <p className="text-xs lg:text-sm text-[#A9A7B9]">MIN</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                    <p className="text-base lg:text-xl text-white font-semibold">{sec}</p>
                    <p className="text-xs lg:text-sm text-[#A9A7B9]">SEC</p>
                </div>
            </div>
        </div>
    )
}

export default TimeStamp;