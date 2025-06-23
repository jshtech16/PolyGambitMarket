interface PropsInterface {
  leaderboardNum: number;
  name: string;
  bidPrice: number;
}

const LeaderBoard: React.FC<PropsInterface> = ({
  leaderboardNum,
  name,
  bidPrice
}) => {
  return (
    <div className="flex justify-between items-center gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <div className="relative">
        <div className="w-[40px] h-[40px] rounded-full bg-avatar-gradient"></div>
          <div className="absolute top-0 right-[0px] bg-[#202020] w-[14px] h-[14px] text-white text-[10px] font-medium flex justify-center items-center rounded-full leading-[10px]">
            {leaderboardNum + 1}
          </div>
        </div>
        <p className="text-base xl:text-xl text-white font-medium">
          {name}
        </p>
      </div>
      <p className="text-sm xl:text-base text-[#545454]">${Math.floor(bidPrice)}</p>
    </div>
  );
};

export default LeaderBoard;
