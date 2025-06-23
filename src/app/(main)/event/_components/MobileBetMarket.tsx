import { useEffect, useState } from "react";
import { MarketInterface } from "@/interfaces/market.interface";
import { useAccount } from "wagmi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ConnectButton from "@/components/ConnectButton";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface PropsInterface {
    defaultYes: boolean;
    market: MarketInterface;
    onClose: () => void;
}

const MobileBetMarket: React.FC<PropsInterface> = ({ defaultYes, market, onClose }) => {

    const { isConnected } = useAccount();

    const [isYes, setIsYes] = useState(defaultYes);
    const [yesText, setYesText] = useState('Yes');
    const [noText, setNoText] = useState('No');
    const [isBuy, setIsBuy] = useState(true);
    const [selectedType, setSelectedType] = useState('Markets');
    const [isOpen, setIsOpen] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [settingMarket, setSettingMarket] = useState('Market');
    const [tolerance, setTolerance] = useState(0);
    const [betPrice, setBetPrice] = useState(0);
    const [openExpire, setOpenExpire] = useState(false);
    const [selectedExpire, setSelectedExpire] = useState('Until Cancelled');
    const [isCalendar, setIsCalendar] = useState(false);

    const today: Date = new Date();

    useEffect(() => {
        if (market.outcomes.split('"')[1]) {
            setYesText(market.outcomes.split('"')[1]);
        }
        if (market.outcomes.split('"')[3]) {
            setNoText(market.outcomes.split('"')[3]);
        }
    }, [])

    const showMarkets = (param: string) => {
        setSelectedType(param);
        setIsOpen(false);
    }

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const changeBetPrice = (e: string) => {
        if (Number(e.slice(1))) {
            setBetPrice(Number(e.slice(1)))
        } else {
            setBetPrice(0)
        }
    }

    const showExpireMenu = (param: string) => {
        if (param === 'Custom') {
            setIsCalendar(true);
        } else {
            setSelectedExpire(param);
            setOpenExpire(false);
        }
    }

    const handleDateChange = (date: any) => {
        const diffInMillis: number = date.getTime() - today.getTime();
        const result = Math.ceil(diffInMillis / (1000 * 60 * 60 * 24));
        setIsCalendar(false);
        setSelectedExpire('In ' + result + ' Days');
        setOpenExpire(false);
    }

    return (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black rounded-lg z-[52] pt-5 overflow-scroll hide-scroll block lg:hidden px-[20px]">
            <div className="w-[173px] h-[173px] bg-[#BDFF00] rounded-full blur-[150px] absolute top-[150px] left-[-200px]"></div>
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
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
                    <CloseIcon
                        className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1"
                        onClick={onClose}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mt-5">
                <div className="flex gap-2">
                    <p
                        className={`text-base px-3 rounded-full font-semibold ${isBuy ? 'bg-neutral-300 text-black' : 'bg-black text-white'}`}
                        onClick={() => setIsBuy(true)}
                    >
                        Buy
                    </p>
                    <p
                        className={`text-base px-3 rounded-full font-semibold ${isBuy ? 'bg-black text-white' : 'bg-neutral-300 text-black'}`}
                        onClick={() => setIsBuy(false)}
                    >
                        Sell
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <div>
                            <button className="text-md text-white flex justify-end items-center gap-1 w-[100px]" onClick={toggleCollapse}>
                                <span>{selectedType}</span>
                                {
                                    isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                                }
                            </button>
                        </div>
                        {isOpen &&
                            <div className="absolute shadow-xl w-full bg-neutral-900 top-[35px] rounded-lg flex flex-col z-50 overflow-hidden">
                                {
                                    ['Markets', 'Limit', 'AMM'].map((ele, idx) => (
                                        <p
                                            className="text-sm text-white hover:bg-neutral-800 cursor-pointer px-3 py-2"
                                            onClick={() => showMarkets(ele)}
                                            key={idx}
                                        >
                                            {ele}
                                        </p>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className="relative">
                        <SettingsIcon
                            className="text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1"
                            onClick={() => setIsSetting(!isSetting)}
                        />
                        {isSetting &&
                            <div className="absolute top-[30px] right-0 border border-neutral-900 rounded-lg bg-black w-[300px] z-50 p-3">
                                <p className="text-md text-white">Default order type</p>
                                <div className="flex gap-2 mt-3">
                                    {
                                        ['Market', 'Limit', 'AMM'].map((ele, idx) => (
                                            <p
                                                className={`flex-1 font-semibold py-2 text-xs text-center rounded-lg cursor-pointer ${settingMarket === ele ? 'bg-[#BCFF00] text-black' : 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]'}`}
                                                onClick={() => setSettingMarket(ele)}
                                                key={idx}
                                            >
                                                {ele}
                                            </p>
                                        ))
                                    }
                                </div>
                                <p className="text-md text-white mt-3">Slippage tolerance</p>
                                <div className="flex gap-2 mt-3">
                                    {
                                        [0.1, 0.5, 1].map((ele, idx) => (
                                            <p
                                                className={`flex-1 font-semibold py-2 text-xs text-center rounded-lg cursor-pointer ${tolerance === ele ? 'bg-[#BCFF00] text-black' : 'bg-[rgba(188,255,0,0.1)] text-[#BCFF00]'}`}
                                                onClick={() => setTolerance(ele)}
                                                key={idx}
                                            >
                                                {ele}%
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                {
                    isYes ?
                        <div
                            className="flex items-center gap-1"
                            onClick={() => setIsYes(false)}
                        >
                            <p className="text-base text-[#BFF816]">{yesText}</p>
                            <SyncAltIcon className="text-[17px] text-[#BFF816]" />
                        </div>
                        :
                        <div
                            className="flex items-center gap-1"
                            onClick={() => setIsYes(true)}
                        >
                            <p className="text-base text-[#FF0000]">{noText}</p>
                            <SyncAltIcon className="text-[17px] text-[#FF0000]" />
                        </div>
                }
                {
                    selectedType === 'Markets' &&
                    <div className="flex gap-2">
                        <p className="text-sm text-neutral-500">$0.00</p>
                        <p className="text-sm text-neutral-500">Max</p>
                    </div>
                }
                {
                    selectedType === 'Limit' &&
                    <div className="flex gap-2">
                        <p className="text-sm text-neutral-500">To win:</p>
                        <p className="text-sm text-[#BFF816]">$10</p>
                    </div>
                }
            </div>
            {
                selectedType === 'Limit' ?
                    <div className="mt-5">
                        <div className="flex items-center">
                            <div className="flex-1 flex justify-between items-end">
                                <p className="text-md text-white">Limit Price</p>
                            </div>
                            <div className="relative flex-1 mt-2">
                                <p className="absolute left-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">-</p>
                                <input type="text" className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-neutral-900 text-white" />
                                <p className="absolute right-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">+</p>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="flex-1 flex justify-between items-end">
                                <p className="text-md text-white mt-3">Shares</p>
                            </div>
                            <div className="relative flex-1 mt-2">
                                <p className="absolute left-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">-</p>
                                <input type="text" className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-neutral-900 text-white" />
                                <p className="absolute right-[6px] top-[6px] w-[30px] h-[30px] rounded-md cursor-pointer flex justify-center items-center text-white bg-neutral-800">+</p>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="flex-1 text-md text-white mt-5">Set Expiration</p>
                            <div className="relative flex-1 pt-4">
                                <div>
                                    <button
                                        className="text-md text-white flex justify-end items-center gap-1 w-full"
                                        onClick={() => setOpenExpire(!openExpire)}
                                    >
                                        <span>{selectedExpire}</span>
                                        {
                                            isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                                        }
                                    </button>
                                </div>
                                {openExpire &&
                                    <div className="absolute shadow-xl w-full bg-neutral-900 top-[50px] rounded-lg flex flex-col z-50 overflow-hidden">
                                        {
                                            ['Until Cancelled', 'End of day', 'Custom'].map((ele, idx) => (
                                                <p
                                                    className="text-sm text-white hover:bg-neutral-800 cursor-pointer px-3 py-2"
                                                    onClick={() => showExpireMenu(ele)}
                                                    key={idx}
                                                >
                                                    {ele}
                                                </p>
                                            ))
                                        }
                                    </div>
                                }
                                {
                                    isCalendar &&
                                    <div className="absolute shadow-xl bg-neutral-900 top-[50px] right-0 rounded-lg flex flex-col z-50 overflow-hidden">
                                        <Calendar
                                            onChange={handleDateChange}
                                            value={today}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mt-5">
                        <input
                            type="text"
                            className="w-full px-[40px] py-2 rounded-md text-center focus-visible:outline-none bg-black text-neutral-500 text-3xl"
                            value={'$' + betPrice}
                            onChange={(e) => changeBetPrice(e.target.value)}
                        />
                        <p className="text-xs text-neutral-500 text-center mt-3">
                            {
                                isYes ? Math.round(market.bestAsk * 100) : Math.round((1 - market.bestBid) * 100)
                            }
                            {`¢`} per shared
                        </p>
                    </div>
            }
            {
                isConnected ?
                    <button
                        className="w-full bg-[#BCFF00] text-black font-semibold py-2 text-base rounded-lg mt-5"
                    >
                        {isBuy ? "Buy" : "Sell"}
                    </button>
                    :
                    <div className="flex justify-center mt-5">
                        <ConnectButton />
                    </div>
            }
        </div>
    )
}

export default MobileBetMarket;