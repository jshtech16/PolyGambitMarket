const CustomTooltip: React.FC<any> = ({ active, payload, label, outcomes }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-black border border-neutral-800 p-3 rounded-md">
                <p className="text-xs lg:text-base text-white">{label}</p>
                <div className="flex gap-4 mt-3">
                    <p className="text-xs lg:text-base text-white">{outcomes}</p>
                    <p className="text-xs lg:text-base text-white">{Math.floor(payload[0].value * 100)}%</p>
                </div>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;