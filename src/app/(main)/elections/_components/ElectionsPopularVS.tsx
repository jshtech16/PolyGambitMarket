import Image from "next/image";

const ElectionsPopularVS = () => {
    return (
        <div className="bg-[linear-gradient(107.7deg,_rgba(0,0,0,0)_37.9%,_rgba(96,4,213,0.5)_113.22%),linear-gradient(248.12deg,_rgba(24,20,32,0)_35.67%,_#292929_101.76%)] flex gap-[30px] justify-center items-center py-[40px] lg:py-[80px] relative mt-[20px] lg:mt-[40px] rounded-lg border" style={{borderImageSource: 'linear-gradient(92.77deg, rgba(255, 255, 255, 0.25) 2.04%, rgba(7, 3, 34, 0.5) 100%)', borderImageSlice: 1}}>
            <Image src="/assets/img/trump1.png" alt="" className="absolute top-0 left-0 w-auto h-[100%] rounded-lg" width={259} height={290} />
            <Image src="/assets/img/harris1.png" alt="" className="absolute top-0 right-0 w-auto h-[100%] rounded-lg" width={290} height={290} />
            <div className="relative">
                <p className="text-[26px] lg:text-[80px] text-white font-bold">23%</p>
                <div className="flex justify-center gap-5">
                    <p className="text-[8px] lg:text-2xl text-white font-bold">Trump</p>
                    <p className="text-[8px] lg:text-2xl text-[#535353] font-bold">0%</p>
                </div>
            </div>
            <div className="relative">
                <button className="bg-[linear-gradient(122deg,_#BFF816_-4.93%,_#101500_96.35%)] px-3 py-2 rounded-lg text-[6px] lg:text-base font-semibold text-white">Popular Vote Winner</button>
            </div>
            <div className="relative">
                <p className="text-[26px] lg:text-[80px] text-white font-bold">23%</p>
                <div className="flex justify-center gap-5">
                    <p className="text-[8px] lg:text-2xl text-white font-bold">Harris</p>
                    <p className="text-[8px] lg:text-2xl text-[#535353] font-bold">0%</p>
                </div>
            </div>
        </div>
    )
}

export default ElectionsPopularVS;