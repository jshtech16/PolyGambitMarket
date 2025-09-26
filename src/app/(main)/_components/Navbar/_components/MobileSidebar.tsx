"use client"

import { useEffect, useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import NavbarDropdownMenu from "./NavbarDropdownMenu";

interface Props {
    visibleSidebar: boolean;
    onClose: () => void
}

const MobileSidebar = ({ visibleSidebar, onClose }: Props) => {

    const [visible, setVisible] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visibleSidebar) {
            setVisible(true);
            document.body.style.overflow = "hidden"
        } else {
            setVisible(false);
            document.body.style.overflow = "";
        }
    }, [visibleSidebar]);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const movePage = () => {
        setVisible(false);
        document.body.style.overflow = "";
        onClose();
    }

    return (
        <div
            className={`w-full h-full fixed top-0 z-[9999] left-[-100%] ${visible ? "animate-mobile-nav-show" : "animate-mobile-nav-hide"}`}
            onClick={(event) => handleClickOutside(event)}
        >
            <div
                ref={sidebarRef}
                className="w-[300px] h-full relative bg-black rounded-r-3xl border border-[#333] pt-5 overflow-x-hidden"
            >
                <div className="w-[173px] h-[173px] bg-[#BDFF00] rounded-full blur-[150px] absolute top-[150px] left-[-200px]"></div>
                <div className="flex justify-end px-[20px]">
                    <div onClick={() => onClose()}>
                        <CloseIcon className="text-gray-400" />
                    </div>
                </div>
                <NavbarDropdownMenu movePage={movePage} />
            </div>
        </div>
    )
}

export default MobileSidebar;
