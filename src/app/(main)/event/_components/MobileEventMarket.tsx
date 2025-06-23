import { useState } from "react";
import EventGraph from "./EventGraph";
import { MarketInterface } from "@/interfaces/market.interface";
import CloseIcon from '@mui/icons-material/Close';
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MobileBetMarket from "./MobileBetMarket";

interface PropsInterface {
    market: MarketInterface;
    onClose: () => void
}

const MobileEventMarket: React.FC<PropsInterface> = ({ market, onClose }) => {

    const [showDesc, setShowDesc] = useState(false);
    const [bet, setBet] = useState(false);
    const [isYes, setIsYes] = useState(false);

    const showMobileBetMarket = (param: boolean) => {
        setBet(true);
        setIsYes(param);
    }

    return (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black rounded-lg z-[51] pt-5 overflow-scroll hide-scroll block lg:hidden">
            {
                bet ?
                    <MobileBetMarket defaultYes={isYes} market={market} onClose={() => setBet(false)} />
                    :
                    <div>
                        <div className="flex justify-between px-[20px]">
                            <div className="flex gap-5">
                                <div
                                    className="w-[60px] h-[60px] bg-top bg-no-repeat bg-cover rounded-full"
                                    style={{ backgroundImage: 'url(' + market.image + ')' }}
                                />
                                <p className="text-base text-white">
                                    <EmojiEventsOutlinedIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
                                    ${Math.floor(market.volume)}
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <StarBorderIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
                                <DescriptionOutlinedIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
                                <CodeOutlinedIcon className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1" />
                                <CloseIcon
                                    className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                        <p className="text-base text-white font-semibold my-4 px-[20px]">{market.groupItemTitle}</p>
                        <div className="px-[20px]">
                            <EventGraph market={market} />
                        </div>
                        <div className="mt-5 w-full px-[20px]">
                            <p className="text-xl text-white border-b border-neutral-900 pb-2">
                                Rules
                            </p>
                            <p
                                className={`text-md text-neutral-400 pt-3 ${!showDesc && "h-[30px] overflow-y-hidden"}`}
                            >
                                {market.description}
                            </p>
                            <div className="flex items-center mt-3 cursor-pointer" onClick={() => setShowDesc(!showDesc)}>
                                <p className="text-md text-neutral-400">{showDesc ? "Show Less" : "Show More"}</p>
                                {showDesc ? (
                                    <KeyboardArrowUpIcon className="text-neutral-400" />
                                ) : (
                                    <KeyboardArrowDownIcon className="text-neutral-400" />
                                )}
                            </div>
                        </div>
                        <div className="w-full h-[220px] px-[20px]"></div>
                        <div className="fixed bottom-[80px] left-0 w-full h-[120px] flex justify-between items-center gap-5 px-[20px] border-t border-neutral-900 z-[9001] bg-black">
                            <button
                                className='flex-1 text-xs font-semibold py-2 rounded-lg bg-[#BCFF00] text-black'
                                onClick={() => showMobileBetMarket(true)}
                            >{market.outcomes.split('"')[1]} {Math.round(market.bestAsk * 100)}{`¢`}</button>
                            <button
                                className='flex-1 text-xs font-semibold py-2 rounded-lg bg-[#BCFF00] text-black'
                                onClick={() => showMobileBetMarket(false)}
                            >{market.outcomes.split('"')[3]} {Math.round((1 - market.bestBid) * 100)}{`¢`}</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default MobileEventMarket;