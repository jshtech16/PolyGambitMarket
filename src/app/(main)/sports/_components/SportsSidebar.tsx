'use client'

import Image from "next/image";
import { sportsTags } from "../_util/sportstags";

const SportsSidebar = () => {

    const movePage = (param: string) => {
        window.location.href = '/sports?tag=' + param;
    };

    return (
        <div className="flex flex-col gap-2 w-[200px] hidden lg:block">
            <div className="flex gap-2 items-center cursor-pointer hover:bg-neutral-900 p-3 rounded-lg">
                <Image src='/assets/img/icons/live.svg' alt="" className="w-[30px]" width={100} height={100} />
                <p className="text-white text-lg">Live</p>
            </div>
            <div className="flex gap-2 items-center cursor-pointer hover:bg-neutral-900 p-3 rounded-lg">
                <Image src='/assets/img/icons/soon.svg' alt="" className="w-[30px]" width={100} height={100} />
                <p className="text-white text-lg">Soon</p>
            </div>
            <div className="w-full border-t my-5"></div>
            {
                sportsTags.map((tag, idx) => (
                    <div
                        className="flex gap-2 items-center cursor-pointer hover:bg-neutral-900 p-3 rounded-lg"
                        onClick={() => movePage(tag.slug)}
                        key={idx}
                    >
                        <div className="w-[30px] h-[30px] rounded-md bg-top bg-no-repeat bg-cover"
                            style={{ backgroundImage: 'url(/assets/img/sports/' + tag.image + ')' }} />
                        <p className="text-white text-lg">{tag.label}</p>
                    </div>
                ))
            }
            <div className="flex gap-2 items-center cursor-pointer hover:bg-neutral-900 p-3 rounded-lg">
                <Image src='/assets/img/icons/other.svg' alt="" className="w-[30px]" width={100} height={100} />
                <p className="text-white text-lg">Others</p>
            </div>
        </div>
    )
}

export default SportsSidebar;