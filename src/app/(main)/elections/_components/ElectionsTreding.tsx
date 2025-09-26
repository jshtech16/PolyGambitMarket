import Image from "next/image";

const ElectionsTrending = () => {
    return (
        <div className="mt-[40px] lg:mt-[60px]">
            <div className="flex justify-between items-center">
                <p className="text-base lg:text-2xl text-white font-integralcf">Trending Markets</p>
                <p className="text-[8px] lg:text-base text-[#535353] font-medium">Chance of Events</p>
            </div>
            <div className="mt-[20px] lg:mt-[40px] flex flex-col gap-[10px] lg:gap-[30px]">
                {
                    [0, 0, 0, 0, 0].map((ele, idx) => (
                        <div className="flex justify-between" key={idx}>
                            <div className="flex gap-[15px] items-center">
                                <Image src="/assets/img/bet.png" alt="" className="w-[30px] lg:w-[50px] h-[30px] lg:h-[50px] rounded-md" width={100} height={100} />
                                <p className="text-[10px] lg:text-xl text-white font-semibold">Will there be another debate?</p>
                            </div>
                            <div className="flex gap-[5px] items-center">
                                <p className="text-[10px] lg:text-2xl text-white font-semibold">33%</p>
                                <p className="text-[8px] lg:text-base text-[#BFF816] font-bold">1%</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="mt-[30px] lg:mt-[60px]">
                <p className="hidden lg:block text-2xl text-white font-integralcf">Trending Markets</p>
                <div className="mt-[40px] flex flex-col lg:flex-row gap-[20px]">
                    <div className="flex flex-col items-center border border-[#535353] py-[40px] rounded-lg flex-1">
                        <p className="text-xl text-white font-medium">Presidency</p>
                        <p className="text-2xl text-[#BFF816] font-semibold">51% Democrat</p>
                        <Image src="/assets/img/trending.png" alt="" className="mt-[10px] w-[80%] max-w-[230px] h-auto" width={100} height={100} />
                    </div>
                    <div className="flex flex-col items-center border border-[#535353] py-[40px] rounded-lg flex-1">
                        <p className="text-xl text-white font-medium">Presidency</p>
                        <p className="text-2xl text-[#BFF816] font-semibold">51% Democrat</p>
                        <Image src="/assets/img/trending.png" alt="" className="mt-[10px] w-[80%] max-w-[230px]" width={100} height={100} />
                    </div>
                    <div className="flex flex-col items-center border border-[#535353] py-[40px] rounded-lg flex-1">
                        <p className="text-xl text-white font-medium">Presidency</p>
                        <p className="text-2xl text-[#BFF816] font-semibold">51% Democrat</p>
                        <Image src="/assets/img/trending.png" alt="" className="mt-[10px] w-[80%] max-w-[230px]" width={100} height={100} />
                    </div>
                    <div className="hidden lg:flex flex-col gap-[10px] flex-1">
                        <div className="bg-[rgba(217,217,217,0.2)] flex flex-col gap-[10px] justify-center items-center rounded-lg flex-1">
                            <div className="flex justify-center gap-[5px]">
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                            </div>
                            <p className="text-2xl text-red font-semibold">28% Rep. sweep</p>
                        </div>
                        <div className="bg-[rgba(217,217,217,0.2)] flex flex-col gap-[10px] justify-center items-center rounded-lg flex-1">
                            <div className="flex justify-center gap-[5px]">
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                                <Image src="/assets/img/trump.png" alt="" className="w-[40px]" width={100} height={100} />
                            </div>
                            <p className="text-2xl text-[#0045CF] font-semibold">28% Rep. sweep</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionsTrending;