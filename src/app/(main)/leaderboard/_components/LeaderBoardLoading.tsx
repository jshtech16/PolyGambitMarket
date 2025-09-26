const LeaderBoardLoading = () => {
    return (
        <div className="flex justify-between items-center gap-[10px] animate-pulse w-full">
            <div className="flex items-center gap-[10px] w-full">
                <div className="w-[43px] xl:w-[50px] h-[43px] xl:h-[50px] rounded-full bg-neutral-900"></div>
                <div className="w-[50%] h-[20px] bg-neutral-900"></div>
            </div>
            <div className="w-[20%] h-[20px] bg-neutral-900"></div>
        </div>
    )
}

export default LeaderBoardLoading;