import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Setting = () => {

    const [emailNotify, setEmailNotify] = useState(false);
    const [appNotify, setAppNotify] = useState(false);
    const [desktopNotify, setDesktopNotify] = useState(false);
    const [betNotify, setBetNotify] = useState(false);
    const [customRPC, setCustomRPC] = useState(false);
    const [gas, setGas] = useState('low');

    return (
        <div className='container px-[20px] py-[50px] max-w-[1000px] mx-auto'>
            <div className='border border-neutral-700 rounded-lg p-[20px] flex flex-col gap-2'>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <p className='bg-neutral-700 w-[20px] lg:w-[25px] h-[20px] lg:h-[25px] flex justify-center items-center rounded-sm font-bold'>M</p>
                        <p className="text-sm lg:text-lg text-white">
                            Email Notifications
                        </p>
                    </div>
                    <div
                        className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${emailNotify ? "bg-[#BFF816]" : "bg-gray-300"
                            }`}
                        onClick={() => setEmailNotify(!emailNotify)}
                    >
                        <div
                            className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${emailNotify ? "translate-x-[13px]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <div className='bg-neutral-700 w-[20px] lg:w-[25px] h-[20px] lg:h-[25px] flex justify-center items-center rounded-sm font-bold'>
                            <NotificationsIcon className='text-[17px]' />
                        </div>
                        <p className="text-sm lg:text-lg text-white">
                            In-App Notifications
                        </p>
                    </div>
                    <div
                        className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${appNotify ? "bg-[#BFF816]" : "bg-gray-300"
                            }`}
                        onClick={() => setAppNotify(!appNotify)}
                    >
                        <div
                            className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${appNotify ? "translate-x-[13px]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <div className='bg-neutral-700 w-[20px] lg:w-[25px] h-[20px] lg:h-[25px] flex justify-center items-center rounded-sm font-bold'>
                            <NotificationsIcon className='text-[17px]' />
                        </div>
                        <p className="text-sm lg:text-lg text-white">
                            Desktop Push Notifications
                        </p>
                    </div>
                    <div
                        className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${desktopNotify ? "bg-[#BFF816]" : "bg-gray-300"
                            }`}
                        onClick={() => setDesktopNotify(!desktopNotify)}
                    >
                        <div
                            className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${desktopNotify ? "translate-x-[13px]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <div className='bg-neutral-700 w-[20px] lg:w-[25px] h-[20px] lg:h-[25px] flex justify-center items-center rounded-sm font-bold'>
                            <NotificationsIcon className='text-[17px]' />
                        </div>
                        <p className="text-sm lg:text-lg text-white">
                            Bet Reminders
                        </p>
                    </div>
                    <div
                        className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${betNotify ? "bg-[#BFF816]" : "bg-gray-300"
                            }`}
                        onClick={() => setBetNotify(!betNotify)}
                    >
                        <div
                            className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${betNotify ? "translate-x-[13px]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </div>
            </div>
            <div className='border border-neutral-700 rounded-lg p-[20px] mt-5'>
                <p className='text-md lg:text-2xl text-white'>Gas Setting</p>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-sm lg:text-lg text-white">
                        Use A Custom RPC
                    </p>
                    <div
                        className={`relative w-[30px] h-[15px] mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${customRPC ? "bg-[#BFF816]" : "bg-gray-300"
                            }`}
                        onClick={() => setCustomRPC(!customRPC)}
                    >
                        <div
                            className={`bg-black w-[11px] h-[11px] rounded-full shadow-md transform transition-transform duration-300 ${customRPC ? "translate-x-[13px]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </div>
                {
                    customRPC &&
                    <div className='mt-4 flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm lg:text-lg text-white'>Low Gas</p>
                            <div
                                className='w-[18px] h-[18px] rounded-full border border-neutral-700 flex justify-center items-center'
                                onClick={() => setGas('low')}
                            >
                                {
                                    gas === 'low' && <div className='w-[8px] h-[8px] bg-[#BFF816] rounded-full'></div>
                                }
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm lg:text-lg text-white'>Medium Gas</p>
                            <div
                                className='w-[18px] h-[18px] rounded-full border border-neutral-700 flex justify-center items-center'
                                onClick={() => setGas('medium')}
                            >
                                {
                                    gas === 'medium' && <div className='w-[8px] h-[8px] bg-[#BFF816] rounded-full'></div>
                                }
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm lg:text-lg text-white'>High Gas</p>
                            <div
                                className='w-[18px] h-[18px] rounded-full border border-neutral-700 flex justify-center items-center'
                                onClick={() => setGas('high')}
                            >
                                {
                                    gas === 'high' && <div className='w-[8px] h-[8px] bg-[#BFF816] rounded-full'></div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Setting