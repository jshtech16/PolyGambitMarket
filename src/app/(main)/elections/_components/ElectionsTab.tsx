import Image from "next/image"

const ElectionsTab = () => {
    return (
        <div className="pt-[20px] lg:pt-[30px] pb-[10px] lg:pb-[20px] w-full border-b border-white">
            <div className="flex justify-between w-full">
                <div className="flex gap-[20px]">
                    <p className="text-[10px] lg:text-xl text-white">Presidency</p>
                    <p className="text-[10px] lg:text-xl text-[#A9A7B9]">Senate</p>
                </div>
                <div className="flex items-center gap-[20px]">
                    <div className="flex gap-[10px] items-center">
                        <Image src="/assets/img/icons/twitter.png" alt="" className="w-[8px] lg:w-[14px] h-[8px] lg:h-[14px]" width={100} height={100} />
                        <p className="text-[10px] lg:text-xl text-[#A9A7B9]">Share</p>
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <Image src="/assets/img/icons/arrow-left-right.svg" alt="" className="h-[8px] lg:h-[14px]" width={100} height={100} />
                        <p className="text-[10px] lg:text-xl text-[#A9A7B9]">Embed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionsTab;