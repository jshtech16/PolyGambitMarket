import Image from "next/image"

const MainTopVolume = () => {
    return (
        <div className="flex-1">
            <div className="flex justify-between">
                <p className="text-base xl:text-2xl text-white font-integralcf">TOP VOLUME THIS WEEK</p>
                <div>
                    <p className="text-[8px] xl:text-base text-white border rounded-lg px-2 py-1 cursor-pointer">See All</p>
                </div>
            </div>
            <div className="flex gap-1 pt-[40px]">
                {
                    [0, 0].map((ele, idx) => (
                        <div className="flex flex-col gap-[30px] flex-1 w-[50%]" key={idx}>
                            {
                                [0, 0, 0, 0, 0].map((element, jdx) => (
                                    <div className="flex items-center gap-2 relative" key={jdx}>
                                        <div className="relative">
                                            <Image src="/assets/img/bet.png" alt="" className="w-[30px] xl:w-[50px] h-[30px] xl:h-[50px] " width={100} height={100} />
                                            <div className="absolute top-0 right-[0px] bg-[#202020] w-[14px] h-[14px] text-white text-[10px] font-medium flex justify-center items-center rounded-full leading-[10px]">{jdx + 1}</div>
                                        </div>
                                        <div className="w-[calc(100% - 38px)]" style={{ width: 'calc(100% - 38px)' }}>
                                            <p className="text-sm xl:text-base text-white break-words w-100">ImplausibleOutcome</p>
                                            <p className="text-xs xl:text-base text-[#545454]">$7,633,011</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MainTopVolume;