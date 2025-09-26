import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MarketInterface } from '@/interfaces/market.interface';
import { apiURL, axiosData } from '@/util/api';
import { HistoryPriceChildInterface, HistoryPriceInterface } from '@/interfaces/history-prices.interface';
import CustomTooltip from './CustomTooltip';
import { graphTimeFrame } from '@/util/graphTimeFrame';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

interface PropsInterface {
    market: MarketInterface;
}

const EventGraph: React.FC<PropsInterface> = ({ market }) => {

    const [activeTimeFrame, setActiveTimeFrame] = useState(4);
    const [history, setHistory] = useState<HistoryPriceChildInterface[]>([]);
    const [activeData, setActiveData] = useState<HistoryPriceChildInterface | undefined>(undefined);
    const [activeDataNo, setActiveDataNo] = useState<HistoryPriceChildInterface | undefined>(undefined);
    const [isClient, setIsClient] = useState(false);
    const [isYes, setIsYes] = useState(true);
    const [isNo, setIsNo] = useState(false);
    const [isSetting, setIsSetting] = useState(false);
    const [xaxis, setXaxis] = useState(true);
    const [yaxis, setYAxis] = useState(true);
    const [horizontalGrid, setHorizontalGrid] = useState(true);
    const [verticalGrid, setVerticalGrid] = useState(false);
    const [decimal, setDecimal] = useState(false);
    const [autoScale, setAutoScale] = useState(true);
    const [tooltip, setTooltip] = useState(true);

    useEffect(() => {
        getHistoryData();
    }, [activeTimeFrame, isYes])

    const getHistoryData = async () => {
        const _history1: HistoryPriceInterface = await axiosData(apiURL.clobAPI + '/prices-history?interval=' + graphTimeFrame[activeTimeFrame].slug + '&market=' + market.clobTokenIds.split('"')[1] + '&fidelity=' + graphTimeFrame[activeTimeFrame].fidelity);
        const _history2: HistoryPriceInterface = await axiosData(apiURL.clobAPI + '/prices-history?interval=' + graphTimeFrame[activeTimeFrame].slug + '&market=' + market.clobTokenIds.split('"')[3] + '&fidelity=' + graphTimeFrame[activeTimeFrame].fidelity);
        const _history: HistoryPriceChildInterface[] = _history1.history.map(item1 => {
            const item2 = _history2.history.find(item => item.t === item1.t);
            return item2 ? { t: item1.t, p1: item1.p, p2: item2.p } : null;
        }).filter((item): item is HistoryPriceChildInterface => item !== null);
        if (activeTimeFrame < 3) {
            const _customizedHistory = _history.map((item: HistoryPriceChildInterface) => ({
                ...item,
                customT: new Date(item.t * 1000).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }),
            }));
            setHistory(_customizedHistory);
        } else {
            const _customizedHistory = _history.map((item: HistoryPriceChildInterface) => ({
                ...item,
                customT: new Date(item.t * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                }),
            }));
            setHistory(_customizedHistory);
        }
        setIsClient(true);
    }

    const handleMouseMove = (event: any) => {
        const _activeData: HistoryPriceChildInterface = event.activePayload ? event.activePayload[0].payload : history[0];
        if (isYes) {
            setActiveData(_activeData);
        } else {
            setActiveDataNo(_activeData);
        }
    }

    const handleMouseLeave = () => {
        setActiveData(undefined);
    }

    const changeGraph = () => {
        if ((isYes && isNo) || (!isYes && !isNo)) {
            setIsYes(true);
            setIsNo(false);
        } else {
            setIsYes(!isYes);
            setIsNo(!isNo);
        }
    }

    const renderUpDownPercent = (a: boolean, b: number, c: number) => {
        if (a) {
            return (
                <p className='text-xs lg:text-sm text-[#BFF816]'>
                    <ArrowUpwardOutlinedIcon className='text-[20px] p-1 text-[#BFF816]' />
                    {decimal ? Math.floor((b - c) * 10000) / 100 : Math.floor((b - c) * 100)}%
                </p>
            )
        } else {
            return (
                <p className='text-xs lg:text-sm text-[#FF0000]'>
                    <ArrowDownwardOutlinedIcon className='text-[20px] p-1 text-[#FF0000]' />
                    {decimal ? Math.floor((b - c) * 10000) / 100 : Math.floor((b - c) * 100)}%
                </p>
            )
        }
    }

    const renderToogleSetting = (title: string, status: boolean, func: (value: boolean) => void) => {
        return (
            <div className="flex justify-between mt-2">
                <p className="text-sm text-white">{title}</p>
                <div
                    className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${status ? "bg-[#BFF816]" : "bg-gray-300"
                        }`}
                    onClick={() => func(!status)}
                >
                    <div
                        className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${status ? "translate-x-[13px]" : "translate-x-0"
                            }`}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            {
                isClient &&
                <div>
                    <p className='text-sm lg:text-md text-neutral-400'>
                        {isYes ? market?.outcomes.split('"')[1] : market?.outcomes.split('"')[3]}
                    </p>
                    <div className='flex items-end'>
                        <p className='text-lg lg:text-2xl text-[#BFF816]'>
                            {isYes ?
                                decimal ?
                                    activeData ? Math.floor(activeData?.p1 * 10000) / 100 : Math.floor(history[history.length - 1].p1 * 10000) / 100
                                    :
                                    activeData ? Math.floor(activeData?.p1 * 100) : Math.floor(history[history.length - 1].p1 * 100)
                                :
                                decimal ?
                                    activeDataNo ? Math.floor(activeDataNo?.p2 * 10000) / 100 : Math.floor(history[history.length - 1].p2 * 10000) / 100
                                    :
                                    activeDataNo ? Math.floor(activeDataNo?.p2 * 100) : Math.floor(history[history.length - 1].p2 * 100)
                            }
                            % chance
                        </p>
                        {
                            isYes ?
                                activeData ?
                                    activeData.p1 - history[history.length - 1].p1 < 0 ?
                                        renderUpDownPercent(false, history[history.length - 1].p1, activeData.p1)
                                        :
                                        renderUpDownPercent(true, activeData.p1, history[history.length - 1].p1)
                                    :
                                    history[0].p1 - history[history.length - 1].p1 < 0 ?
                                        renderUpDownPercent(true, history[history.length - 1].p1, history[0].p1)
                                        :
                                        renderUpDownPercent(false, history[0].p1, history[history.length - 1].p1)
                                :
                                isNo && activeDataNo ?
                                    activeDataNo.p2 - history[history.length - 1].p2 < 0 ?
                                        renderUpDownPercent(false, history[history.length - 1].p2, activeDataNo.p2)
                                        :
                                        renderUpDownPercent(true, activeDataNo.p2, history[history.length - 1].p2)
                                    :
                                    history[0].p2 - history[history.length - 1]?.p2 < 0 ?
                                        renderUpDownPercent(true, history[history.length - 1].p2, history[0].p2)
                                        :
                                        renderUpDownPercent(false, history[0].p2, history[history.length - 1]?.p2)
                        }
                    </div>
                    <div className='w-full h-[400px] mt-5'>
                        {
                            (isYes || isNo) &&
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={history}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                    onMouseMove={(event) => handleMouseMove(event)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <CartesianGrid strokeDasharray="0" stroke='#757575' strokeWidth={0.2} horizontal={horizontalGrid} vertical={verticalGrid} />
                                    {
                                        xaxis && <XAxis dataKey="customT" />
                                    }
                                    {
                                        yaxis && <YAxis domain={autoScale ? ['auto', 'auto'] : [0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                                    }
                                    {
                                        tooltip &&
                                        <Tooltip content={<CustomTooltip outcomes={isYes ? market?.outcomes.split('"')[1] : market?.outcomes.split('"')[3]} />} />
                                    }
                                    {
                                        isYes && <Line type="monotone" dataKey="p1" stroke="#BFF816" dot={false} />
                                    }
                                    {
                                        isNo && <Line type="monotone" dataKey="p2" stroke="#FF0000" dot={false} />
                                    }
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-1 items-center'>
                            {
                                graphTimeFrame.map((time, idx) => (
                                    <p
                                        className={`text-xs lg:text-sm hover:bg-neutral-800 px-2 py-1 cursor-pointer rounded-md leading-[14px] ${idx === activeTimeFrame ? 'bg-white text-black' : 'text-neutral-400'}`}
                                        onClick={() => setActiveTimeFrame(time.id)}
                                        key={idx}
                                    >
                                        {time.label}
                                    </p>
                                ))
                            }
                        </div>
                        <div className='flex gap-1 relative'>
                            <SyncAltOutlinedIcon
                                className='text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1'
                                onClick={changeGraph}
                            />
                            <SettingsIcon
                                className='text-[28px] text-neutral-400 cursor-pointer rounded-md hover:bg-neutral-800 p-1'
                                onClick={() => setIsSetting(!isSetting)}
                            />
                            {
                                isSetting &&
                                <div className='absolute bg-black shadow-lg bottom-[30px] right-0 border border-neutral-800 rounded-lg px-4 py-3 w-[250px] h-[350px] overflow-scroll hide-scroll'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-base text-white'>Chart Setting</p>
                                        <CloseIcon className='text-[14px] text-white cursor-pointer' onClick={() => setIsSetting(false)} />
                                    </div>
                                    <div>
                                        <p className='text-white mt-4'>Outcomes</p>
                                        {renderToogleSetting('Yes', isYes, setIsYes)}
                                        {renderToogleSetting('No', isNo, setIsNo)}
                                        <p className='text-white mt-4'>Display</p>
                                        {renderToogleSetting('XAxis', xaxis, setXaxis)}
                                        {renderToogleSetting('YAxis', yaxis, setYAxis)}
                                        {renderToogleSetting('Horizontal Grid', horizontalGrid, setHorizontalGrid)}
                                        {renderToogleSetting('Vertical Grid', verticalGrid, setVerticalGrid)}
                                        {renderToogleSetting('Decimals', decimal, setDecimal)}
                                        <p className='text-white mt-4'>Interactivity</p>
                                        {renderToogleSetting('Autoscale', autoScale, setAutoScale)}
                                        {renderToogleSetting('Tooltip', tooltip, setTooltip)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default EventGraph;