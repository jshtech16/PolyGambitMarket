const ElectionsForecast = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[20px] lg:gap-0 w-full">
            <div className="flex flex-col gap-[10px] lg:gap-[30px] items-center lg:items-start">
                <p className="text-[28px] lg:text-5xl text-white font-bold">2024 Election Forecast</p>
                <p className="text-[10px] lg:text-base text-white">Live and accurate forecasts by the world&apos;s largest prediction market.</p>
            </div>
            <div className="flex gap-[20px] justify-center items-center border border-[0.5px] border-white rounded-lg p-[15px] lg:p-[24px]">
                <p className="text-xs lg:text-base text-[#A9A7B9]">Election in</p>
                <div className="flex gap-[10px]">
                    <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                        <p className="text-base lg:text-xl text-white font-semibold">35</p>
                        <p className="text-xs lg:text-sm text-[#A9A7B9]">DAYZ</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                        <p className="text-base lg:text-xl text-white font-semibold">15</p>
                        <p className="text-xs lg:text-sm text-[#A9A7B9]">HRS</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                        <p className="text-base lg:text-xl text-white font-semibold">38</p>
                        <p className="text-xs lg:text-sm text-[#A9A7B9]">MIN</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-[rgba(217,217,217,0.2)] w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-lg">
                        <p className="text-base lg:text-xl text-white font-semibold">18</p>
                        <p className="text-xs lg:text-sm text-[#A9A7B9]">SEC</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionsForecast;