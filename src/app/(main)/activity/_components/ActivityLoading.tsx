const ActivityLoading = () => {
    return (
        <div className="pb-[30px] border-b border-neutral-800 animate-pulse w-full">
            <div className="flex justify-between items-center gap-[30px] w-full">
                <div className="flex items-center gap-2 w-full">
                    <div className="w-[30px] xl:w-[50px] h-[30px] xl:h-[50px] bg-neutral-900 rounded-md" />
                    <div className="w-full flex flex-col gap-1">
                        <div className="bg-neutral-900 w-[75%] h-[20px] rounded-md"></div>
                        <div className="bg-neutral-900 w-[50%] h-[20px] rounded-md"></div>
                    </div>
                </div>
                <div className="bg-neutral-900 w-[50px] h-[20px]"></div>
            </div>
        </div>
    )
}

export default ActivityLoading;