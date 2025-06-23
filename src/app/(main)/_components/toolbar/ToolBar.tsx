import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';

const sortByList = ['Trending', 'Liquidity', 'Volume', 'Newest', 'Ending soon', 'Ended Recently', 'Competitive'];

const ToolBar = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState('');
    const [watchlist, setWatchlist] = useState(false);
    const [status, setStatus] = useState('All');
    const [statusOpen, setStatusOpen] = useState(false);
    const [sortBy, setSortBy] = useState(sortByList[0]);
    const [sortByOpen, setSortByOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get('_q')) {
            setSearchValue(String(searchParams.get('_q')));
        }

        if (searchParams.get('watchlist')) {
            setWatchlist(true);
        }

        if (searchParams.get('closed') === 'false') {
            setStatus('Active');
        } else if (searchParams.get('closed') === 'true') {
            setStatus('Resolved');
        }

        if (searchParams.get('_s') === 'liquidity') {
            setSortBy('Liquidity');
        } else if (searchParams.get('_s') === 'volume') {
            setSortBy('volume');
        } else if (searchParams.get('_s') === 'startDate') {
            setSortBy('Newest');
        } else if (searchParams.get('_s') === 'endDate') {
            setSortBy('Ending soon');
        } else if (searchParams.get('_s') === 'closedTime') {
            setSortBy('Ended Recently');
        } else if (searchParams.get('_s') === 'competitive') {
            setSortBy('Competitive');
        }
    }, [])

    useEffect(() => {
        setStatusOpen(false);
        setSortByOpen(false);
        const newParams = new URLSearchParams(searchParams);
        if (searchValue) {
            if (searchParams.get('_q')) {
                newParams.set('_q', searchValue);
            } else {
                newParams.append('_q', searchValue);
            }
        } else {
            newParams.delete('_q');
        }
        router.push(`?${newParams.toString()}`);
    }, [searchValue]);

    const removeSearchValue = () => {
        setSearchValue('');
    }

    useEffect(() => {
        setStatusOpen(false);
        setSortByOpen(false);
        const newParams = new URLSearchParams(searchParams);
        if (watchlist) {
            if (searchParams.get('watchlist')) {
                newParams.set('watchlist', 'true');
            } else {
                newParams.append('watchlist', 'true');
            }
        } else {
            if (searchParams.get('watchlist')) {
                newParams.delete('watchlist');
            }
        }
        router.push(`?${newParams.toString()}`);
    }, [watchlist]);

    const handleStatusDropdown = () => {
        setStatusOpen(!statusOpen);
        setSortByOpen(false);
    }

    const handleStatusChange = (_status: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (_status === 'Active') {
            if (searchParams.get('closed')) {
                newParams.set('closed', 'false');
            } else {
                newParams.set('closed', 'false');
            }
        } else if (_status === 'Resolved') {
            if (searchParams.get('closed')) {
                newParams.set('closed', 'true');
            } else {
                newParams.append('closed', 'true');
            }
        } else {
            if (searchParams.get('closed')) {
                newParams.delete('closed');
            }
        }
        router.push(`?${newParams.toString()}`);

        setStatus(_status);
    }

    const handleSortByDropdown = () => {
        setStatusOpen(false);
        setSortByOpen(!sortByOpen);
    }

    const handleSortByChange = (_sortBy: string, _sortBySlug: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (searchParams.get('_s')) {
            newParams.set('_s', _sortBySlug);
        } else {
            newParams.append('_s', _sortBySlug);
        }

        if (searchParams.get('ascending')) {
            if (_sortBy === 'Ending soon') {
                newParams.set('ascending', 'true');
            } else {
                newParams.set('ascending', 'false');
            }
        } else {
            if (_sortBy === 'Ending soon') {
                newParams.append('ascending', 'true');
            } else {
                newParams.append('ascending', 'false');
            }
        }

        if (_sortBy === 'Ended Recently') {
            if (searchParams.get('closed')) {
                newParams.set('closed', 'true');
            } else {
                newParams.append('closed', 'true');
            }
        } else {
            if (searchParams.get('closed')) {
                newParams.delete('closed');
            }
        }

        router.push(`?${newParams.toString()}`);
        setSortBy(_sortBy);
    }

    const renderStatus = () => {
        return (
            <div
                className="flex-1 flex items-center gap-1 border border-neutral-700 rounded-lg px-4 py-2 relative lg:w-[150px] cursor-pointer"
                onClick={handleStatusDropdown}
            >
                <p className="text-sm text-white flex-1 text-center cursor-pointer">{status}</p>
                {
                    statusOpen ?
                        <KeyboardArrowUpIcon />
                        :
                        <KeyboardArrowDownIcon />
                }
                {
                    statusOpen &&
                    <div className="absolute left-0 top-[50px] bg-black w-full z-10 border border-neutral-700 rounded-lg px-4 py-2 bg-neutral-900 flex flex-col gap-3">
                        <p
                            className="text-sm text-white text-center cursor-pointer"
                            onClick={() => handleStatusChange('All')}
                        >All</p>
                        <p
                            className="text-sm text-white text-center cursor-pointer"
                            onClick={() => handleStatusChange('Active')}
                        >Active</p>
                        <p
                            className="text-sm text-white text-center cursor-pointer"
                            onClick={() => handleStatusChange('Resolved')}
                        >Resolved</p>
                    </div>
                }
            </div>
        )
    }

    const renderSortByItem = (param: string) => {
        if (param === 'Trending') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <TrendingUpIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Trending', 'volume24hr')}
                    >Trending</p>
                </div>
            )
        } else if (param === 'Liquidity') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <WaterDropOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Liquidity', 'liquidity')}
                    >Liquidity</p>
                </div>
            )
        } else if (param === 'Volume') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <SignalCellularAltOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Volume', 'volume')}
                    >Volume</p>
                </div>
            )
        } else if (param === 'Newest') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <AddOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Newest', 'startDate')}
                    >Newest</p>
                </div>
            )
        } else if (param === 'Ending soon') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <AccessTimeOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Ending soon', 'endDate')}
                    >Ending soon</p>
                </div>
            )
        } else if (param === 'Ended Recently') {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <CheckOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Ended Recently', 'closedTime')}
                    >Ended Recently</p>
                </div>
            )
        } else {
            return (
                <div className="flex gap-3 items-center cursor-pointer">
                    <DeviceHubOutlinedIcon className="bg-white rounded-md text-black" />
                    <p
                        className="text-sm text-white text-center"
                        onClick={() => handleSortByChange('Competitive', 'competitive')}
                    >Competitive</p>
                </div>
            )
        }
    }

    const renderSortBy = () => {
        return (
            <div
                className="flex-1 flex justify-between items-center gap-1 border border-neutral-700 rounded-lg px-4 py-2 relative lg:min-w-[250px] cursor-pointer"
                onClick={handleSortByDropdown}
            >
                {renderSortByItem(sortBy)}
                {
                    sortByOpen ?
                        <KeyboardArrowUpIcon />
                        :
                        <KeyboardArrowDownIcon />
                }
                {
                    sortByOpen &&
                    <div className="absolute left-0 top-[50px] bg-black w-full z-10 border border-neutral-700 rounded-lg px-4 py-2 bg-neutral-900 flex flex-col gap-3">
                        {
                            sortByList.map((item, idx) => (
                                <div key={idx}>
                                    {renderSortByItem(item)}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="pt-5">
            <div className="flex gap-2">
                <div className="relative w-full flex-1">
                    <SearchIcon className="absolute top-2 left-3 text-neutral-700" />
                    <input
                        type="text"
                        className="w-full h-full px-10 py-2 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none"
                        placeholder="Search by market"
                        required
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    {
                        searchValue &&
                        <CloseIcon
                            className="absolute top-[10px] right-2 text-neutral-700 text-[17px]"
                            onClick={removeSearchValue}
                        />
                    }
                </div>
                <div className="hidden lg:flex gap-2">
                    {renderStatus()}
                    {renderSortBy()}
                </div>
                <div className="border border-neutral-700 rounded-lg flex justify-center items-center px-2">
                    {
                        watchlist ?
                            <StarIcon
                                className="text-[#BFF816]"
                                onClick={() => setWatchlist(false)}
                            />
                            :
                            <StarBorderIcon
                                onClick={() => setWatchlist(true)}
                            />
                    }
                </div>
            </div>
            <div className="flex lg:hidden gap-2 mt-5">
                {renderStatus()}
                {renderSortBy()}
            </div>
        </div>
    )
}

export default ToolBar;