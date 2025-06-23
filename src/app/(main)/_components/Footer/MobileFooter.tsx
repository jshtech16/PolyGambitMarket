"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileFooter = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="my-footer">
        <div className="footer-item">
          <Link href="/" className="footer-button">
            <div className="footer-button-image">
              <Image
                src={
                  pathname === "/"
                    ? "/assets/img/icons/homeFill.svg"
                    : "/assets/img/icons/home.svg"
                }
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div
            className={`${pathname === "/" ? "text-[#A9FF32]" : "text-white"}`}
          >
            Home
          </div>
        </div>

        <div className="footer-item">
          <Link href="/markets" className="footer-button">
            <div className="footer-button-image">
              <Image
                src={
                  /^\/markets/.test(pathname)
                    ? "/assets/img/icons/marketsFill.svg"
                    : "/assets/img/icons/markets.svg"
                }
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div
            className={`${
              /^\/markets/.test(pathname) ? "text-[#A9FF32]" : "text-white"
            }`}
          >
            Markets
          </div>
        </div>

        <div className="footer-item">
          <Link href="/ai" className="footer-button">
            <div className="footer-button-image">
              <Image
                src={
                  /^\/ai/.test(pathname)
                    ? "/assets/img/icons/chat-fill.png"
                    : "/assets/img/icons/chat.svg"
                }
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div
            className={`${
              /^\/ai/.test(pathname) ? "text-[#A9FF32]" : "text-white"
            }`}
          >
            AI
          </div>
        </div>

        <div className="footer-item">
          <Link href="/search" className="footer-button">
            <div className="footer-button-image">
              <Image
                src={
                  /^\/search/.test(pathname)
                    ? "/assets/img/icons/searchFill.svg"
                    : "/assets/img/icons/search.svg"
                }
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div
            className={`${
              /^\/search/.test(pathname) ? "text-[#A9FF32]" : "text-white"
            }`}
          >
            Search
          </div>
        </div>

        <div className="footer-item">
          <Link href="/profile" className="footer-button">
            <div className="footer-button-image">
              <Image
                src={
                  /^\/profile/.test(pathname)
                    ? "/assets/img/icons/profileFill.svg"
                    : "/assets/img/icons/profile.svg"
                }
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div
            className={`${
              /^\/profile/.test(pathname) ? "text-[#A9FF32]" : "text-white"
            }`}
          >
            Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
