'use client'

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { sportsTags } from "../_util/sportstags";

const MobileSportsTags = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const movePage = (param: string) => {
        const tag = searchParams.get('tag');
        const newParams = new URLSearchParams(searchParams);

        if (tag) {
            newParams.set('tag', param); // Update the existing tag parameter
        } else {
            newParams.append('tag', param); // Set the tag parameter if it doesn't exist
        }

        router.push(`?${newParams.toString()}`);
    };

    return (
        <div className="flex gap-1 w-full overflow-x-scroll hide-scroll px-[10px] py-[15px] block lg:hidden shadow-md">
            <div className="flex gap-2 items-center cursor-pointer p-3 rounded-lg">
                <div className="w-[20px] h-[20px] rounded-md">
                    <Image src='/assets/img/icons/live.svg' alt="" className="h-[20px]" width={100} height={100} />
                </div>
                <p className="text-white text-base">Live</p>
            </div>
            <div className="flex gap-2 items-center cursor-pointer p-3 rounded-lg">
                <div className="w-[20px] h-[20px] rounded-md">
                    <Image src='/assets/img/icons/soon.svg' alt="" className="h-[20px]" width={100} height={100} />
                </div>
                <p className="text-white text-base">Soon</p>
            </div>
            {
                sportsTags.map((tag, idx) => (
                    <div
                        className="flex gap-2 items-center cursor-pointer p-3 rounded-lg"
                        onClick={() => movePage(tag.slug)}
                        key={idx}
                    >
                        <div className="w-[20px] h-[20px] rounded-md bg-top bg-no-repeat bg-cover"
                            style={{ backgroundImage: 'url(/assets/img/sports/' + tag.image + ')' }} />
                        <p className="text-white text-base whitespace-nowrap">{tag.label}</p>
                    </div>
                ))
            }
            <div className="flex gap-2 items-center cursor-pointer p-3 rounded-lg">
                <div className="w-[20px] h-[20px] rounded-md">
                    <Image src='/assets/img/icons/other.svg' alt="" className="h-[20px]" width={100} height={100} />
                </div>
                <p className="text-white text-base">Others</p>
            </div>
        </div>
    )
}

export default MobileSportsTags;