import Image from "next/image";

const ElectionsVS = () => {
    return (
        <div className="bg-[rgba(255,255,255,0.1)] w-full flex justify-between px-[50px] py-[27px] mt-[20px] lg:mt-[30px] rounded-[20px]">
            <div className="flex gap-[20px]">
                <div className="flex flex-col items-center gap-[10px]">
                    <Image src="/assets/img/trump.png" alt="" className="w-[50px] lg:w-[150px]" width={100} height={100} />
                    <p className="text-[8px] lg:text-2xl text-white font-bold">Trump</p>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-3xl lg:text-8xl text-white font-bold">48%</p>
                    <p className="text-[8px] lg:text-2xl font-bold text-red">-0.8%</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image src="/assets/img/logo.png" alt="" className="w-[35px] lg:w-[110px]" width={100} height={100} priority />
                <p className="text-[8px] lg:text-2xl text-[#535353] font-integralcf">Elections</p>
            </div>
            <div className="flex gap-[20px]">
                <div className="flex flex-col justify-center items-end">
                    <p className="text-3xl lg:text-8xl text-white font-bold">50%</p>
                    <p className="text-[8px] lg:text-2xl font-bold text-red">-0.1%</p>
                </div>
                <div className="flex flex-col items-center gap-[10px]">
                    <Image src="/assets/img/haris.png" alt="" className="w-[50px] lg:w-[150px]" width={100} height={100} />
                    <p className="text-[8px] lg:text-2xl text-white font-bold">Harris</p>
                </div>
            </div>
        </div>
    )
}

export default ElectionsVS;