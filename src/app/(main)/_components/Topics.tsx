'use client'

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlugInterface } from "@/interfaces/slug.interface";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MovingIcon from '@mui/icons-material/Moving';

interface PropsInterface {
    slugs: SlugInterface[]
}

const Topics: React.FC<PropsInterface> = ({ slugs }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const scrollRef = useRef<HTMLDivElement>(null);

    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setIsStart(scrollLeft === 0);
            setIsEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    const scrollToRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft + 700,
                behavior: 'smooth'
            });
            checkScrollPosition();
        }
    }

    const scrollToLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft - 700,
                behavior: 'smooth'
            });
            checkScrollPosition();
        }
    }

    useEffect(() => {
        checkScrollPosition();

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    const redirectPage = (param: string) => {
        if (param === 'top') {
            router.push(pathname);
        } else if (param === 'new') {
            router.push(pathname + '?_s=startDate&ascending=false');
        } else {
            router.push(pathname + '?topic=' + param);
        }
    }

    return (
        <div className="relative mt-5">
            {
                !isStart &&
                <div className="hidden lg:block absolute top-0 left-0 bg-black pe-4">
                    <button
                        className="rounded-full outline-none w-[26px] xl:w-[32px] h-[26px] xl:h-[32px] bg-neutral-900 hover:bg-neutral-800 flex justify-center items-center px-1"
                        onClick={scrollToLeft}
                    >
                        <KeyboardArrowLeftIcon className="text-white" />
                    </button>
                </div>
            }
            <div className="flex-1 flex gap-3 w-full overflow-x-scroll hide-scroll" ref={scrollRef}>
                <button
                    className={`
                        text-xs xl:text-sm font-medium rounded-md outline-none flex items-center justify-center gap-2 whitespace-nowrap px-5 py-1
                        ${!searchParams.toString() ? 'bg-[#BFF816] text-black' : 'bg-neutral-900 hover:bg-neutral-800 text-white'}
                    `}
                    onClick={() => redirectPage('top')}
                >
                    <MovingIcon />Top
                </button>
                <button
                    className={`
                        text-xs xl:text-sm font-medium rounded-md outline-none flex items-center justify-center gap-2 whitespace-nowrap px-5 py-1
                        ${searchParams.get('_s') === 'startDate' && searchParams.get('ascending') === 'false' ? 'bg-[#BFF816] text-black' : 'bg-neutral-900 hover:bg-neutral-800 text-white'}
                    `}
                    onClick={() => redirectPage('new')}
                >
                    New
                </button>
                {
                    slugs?.map((slug, idx) => (
                        <button
                            className={`
                                rounded-md outline-none flex items-center justify-center gap-2 whitespace-nowrap text-xs xl:text-sm font-medium px-5 py-1
                                ${searchParams.get('topic') === slug.slug ? 'bg-[#BFF816] text-black' : 'bg-neutral-900 hover:bg-neutral-800 text-white'}
                            `}
                            onClick={() => redirectPage(slug.slug)}
                            key={idx}
                        >
                            {slug.label}
                        </button>
                    ))
                }
            </div>
            {
                !isEnd &&
                <div className="hidden lg:block absolute top-0 right-0 bg-black ps-4">
                    <button
                        className="rounded-full outline-none w-[26px] xl:w-[32px] h-[26px] xl:h-[32px] bg-neutral-900 hover:bg-neutral-800 flex justify-center items-center px-1"
                        onClick={scrollToRight}
                    >
                        <KeyboardArrowRightIcon className="text-white" />
                    </button>
                </div>
            }
        </div>
    )
}

export default Topics;