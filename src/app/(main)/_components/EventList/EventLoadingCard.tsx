const EventLoadingCard = () => {
    return (
        <div className="bg-black bg-[linear-gradient(107.7deg,rgba(0,0,0,0)_37.9%,rgba(96,4,213,0.2)_113.22%),linear-gradient(248.12deg,rgba(24,20,32,0)_35.67%,#292929_101.76%)] rounded-lg pt-5 shadow-md animate-pulse">
            <div className="flex items-center justify-between gap-3 px-5">
                <div className="pb-5 flex items-center justify-between gap-5 w-full">
                    <div className="w-[40px] h-[40px] overflow-hidden rounded-md bg-neutral-900"></div>
                    <div className="h-[40px] overflow-hidden flex justify-center items-center flex-col gap-[4px]" style={{ width: 'calc(100% - 52px)' }}>
                        <div className="w-full h-[20px] bg-neutral-900 rounded-md"></div>
                        <div className="w-full h-[20px] bg-neutral-900 rounded-md"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 h-[75px] px-5 overflow-hidden">
                <div className="bg-neutral-900 w-[75%] h-[20px] rounded-md"></div>
                <div className="bg-neutral-900 w-[40%] h-[20px] rounded-md"></div>
                <div className="bg-neutral-900 w-[60%] h-[20px] rounded-md"></div>
            </div>
            <div className="flex justify-between px-5 py-2 bg-[linear-gradient(0deg,rgba(35,34,36,0.8),rgba(35,34,36,0.8)),linear-gradient(248.12deg,rgba(24,20,32,0)_35.67%,#292929_101.76%),linear-gradient(106.24deg,rgba(0,0,0,0)_38.72%,rgba(96,4,213,0.5)_104.16%)] rounded-b-lg">
                <div className="bg-neutral-900 w-[20%] h-[20px] rounded-md"></div>
                <div className="bg-neutral-900 w-[20%] h-[20px] rounded-md"></div>
            </div>
        </div>
    )
}

export default EventLoadingCard;