"use client";

import { useEffect, useRef } from 'react';

interface ProgressBarProps {
    val: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ val }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const valRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const $bar = barRef.current;
        const $val = valRef.current;

        if ($bar && $val) {
            $bar.style.transform = `rotate(${45 + val * 1.8}deg)`;
            $val.innerText = Math.round(val).toString();
        }
    }, [val]);

    return (
        <div className="progress">
            <div className="barOverflow">
                <div className="bar" ref={barRef}
                    style={{
                        borderBottomColor: val < 30 ? 'red' : val > 70 ? '#36B208' : '#00BBFF',
                        borderRightColor: val < 30 ? 'red' : val > 70 ? '#36B208' : '#00BBFF'
                    }}
                ></div>
            </div>
            <p className='text-sm text-white font-medium'>
                <span ref={valRef}>{Math.floor(val)}</span>%
            </p>
            <p className='text-sm text-[#535353]'>Chance</p>
        </div>
    );
};

export default ProgressBar;
