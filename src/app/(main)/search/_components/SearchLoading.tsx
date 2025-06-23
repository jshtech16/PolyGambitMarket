const SearchLoading = () => {
    return (
        <div className="flex items-center gap-3 cursor-pointer animate-pulse">
            <div className="bg-neutral-800 w-[40px] h-[40px] rounded-lg" />
            <div className="flex-1">
                <div className="bg-neutral-800 w-full h-[20px] rounded-md" />
                <div className="bg-neutral-800 w-1/3 h-[15px] mt-2 rounded-md" />
            </div>
        </div>
    )
}

export default SearchLoading;