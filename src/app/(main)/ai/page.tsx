"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { mainCarousel } from "@/util/carousel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Carousel from "../_components/Carousel";

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-black">
      <div className="container mx-auto px-[20px] pt-[50px] pb-[100px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <ArrowBackIcon
              className="text-white w-6 h-6 cursor-pointer"
              onClick={() => router.back()}
            />
            <div>
              <p className="text-white text-lg lg:text-3xl font-semibold">
                GambleGPT
              </p>
              <p className="text-white text-xs lg:text-base">
                The next generation of best selection
              </p>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#BFF816] px-5 py-2 rounded-lg text-black text-xs lg:text-base font-semibold cursor-pointer"
          >
            Chat With Me
          </button>
        </div>
        <Carousel data={mainCarousel} />
        <div className="flex flex-col lg:flex-row gap-[50px] mt-[50px]">
          <div className="flex-1 flex flex-col items-center justify-between p-[50px] border-gradient">
            <div className="relative w-[100px] lg:w-[200px] h-[65px] lg:h-[130px]">
              <Image src="/assets/img/gambit_ai.png" alt="" fill />
            </div>
            <p className="text-lg lg:text-[28px] text-[#BFF816] text-center">
              🔍 Use our AI tools to:
            </p>
            <p className="text-white text-base lg:text-xl text-center py-[20px]"></p>
            <p>•Get tailored predictions for existing pools.</p>
            <Link href="/ai/betwithai">
              <button className="bg-[#BFF816] text-[#171717] px-5 py-2 rounded-lg font-semibold mt-4">
                Get In!
              </button>
            </Link>
          </div>
          <div className="flex-1 flex flex-col items-center justify-between p-[50px] border-gradient">
            <div className="relative py-[48px] px-1 items-center justify-center">
              <p className="text-lg lg:text-[20px] text-[#BFF816] text-center">
                Conduct real-world research
              </p>
              <p className="text-lg lg:text-[20px] text-[#BFF816] text-center">
                with our platform to:
              </p>
              <div className="absolute left-[-40px] lg:left-[-70px] top-[35px] lg:top-[17px] w-[65px] lg:w-[130px] h-[65px] lg:h-[130px]">
                <Image src="/assets/img/search_ai.png" alt="" fill />
              </div>
            </div>
            <div>
              <p className="text-white text-left text-md lg:text-base mt-3">
                •Find untapped markets across politics, social trends, and pop
                culture.
              </p>
              <p className="text-white text-left text-md lg:text-base mt-3">
                •Launch pools before they take off—capitalize on opportunities
                early.
              </p>
            </div>
            <Link href="/ai/betwithai" className="mt-4">
              <button className="bg-[#BFF816] text-[#171717] px-5 py-2 rounded-lg font-semibold">
                Get In!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
