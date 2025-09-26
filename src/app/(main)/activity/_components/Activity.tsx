import Image from "next/image";

const Activity = () => {
    return (
        <div className="pb-[30px]">
            <div className="flex justify-between items-center gap-[30px]">
                <div>
                    <div className="flex items-center gap-2">
                        <Image src="/assets/img/bet.png" alt="" className="w-[30px] xl:w-[50px] h-[30px] xl:h-[50px]" width={100} height={100} />
                        <div>
                            <p className="text-[10px] xl:text-base text-[#A9A7B9]">Will Trump mention $MAGA before Election?</p>
                            <div className="flex gap-2">
                                <Image src="/assets/img/bet.png" alt="" className="w-[20px] h-[20px]" width={100} height={100} />
                                <p className="text-[10px] xl:text-base text-[#545454]">0x798a98e91184CD... bought Yes at 50¢ ($4,207)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-sm xl:text-base text-[#535353] min-w-[60px] xl:min-w-[70px]">52s ago</p>
            </div>
        </div>
    )
}

export default Activity;