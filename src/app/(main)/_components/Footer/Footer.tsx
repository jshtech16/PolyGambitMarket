import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const footerItems = [
    {
      lable: "Markets",
      items: [
        {
          label: "Politics",
          link: "",
        },
        {
          label: "Crypto",
          link: "",
        },
        {
          label: "Sports",
          link: "",
        },
        {
          label: "Middle East",
          link: "",
        },
        {
          label: "Pop Culture",
          link: "",
        },
        {
          label: "Business",
          link: "",
        },
      ],
    },
    {
      lable: "Resources",
      items: [
        {
          label: "Contact",
          link: "/contact",
        },
        {
          label: "Learn",
          link: "",
        },
        {
          label: "Developers",
          link: "",
        },
        {
          label: "Blog",
          link: "",
        },
        {
          label: "Elections",
          link: "",
        },
      ],
    },
  ];

  return (
    <div className="bg-black">
      <div className="bg-black bg-bg-gradient flex flex-col xl:flex-row gap-[20px] border-t border-[#505050] px-[20px] sm:px-[42px] pt-[28px] xl:pt-[48px] pb-[80px]">
        <div className="flex-1 flex flex-col items-center xl:items-start">
          <Image
            src="/assets/img/logo_footer.png"
            alt=""
            className="w-auto h-auto cursor-pointer"
            width={100}
            height={100}
          />
          <p className="text-base lg:text-2xl text-white font-bold mt-[22px] xl:mt-[32px]">
            Legal Disclaimer
          </p>
          <p className="text-xs lg:text-lg text-[#909090] w-50 mt-0 xl:mt-4">
            Gambit is a decentralized betting platform.
          </p>
          <p className="text-xs lg:text-lg text-[#909090] w-full md:w-[60%] text-center xl:text-start">
            Betting involves risk, and users should only wager what they can
            afford to lose. Ensure you comply with your local laws and
            regulations regarding online gambling.
          </p>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-1">
            {footerItems.map((footerItem, idx) => (
              <div className="flex flex-col gap-3 flex-1" key={idx}>
                <p className="text-base lg:text-2xl text-white font-bold mb-1">
                  {footerItem.lable}
                </p>
                {footerItem.items.map((item, jdx) => (
                  <Link
                    href={item.link}
                    className="text-xs lg:text-lg text-white cursor-pointer mt-1"
                    key={jdx}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center flex-1">
            <p className="text-base lg:text-2xl text-white font-bold">
              Join the community
            </p>
            <div className="flex gap-[5px] xl:gap-[10px] mt-4">
              <Link
                href="https://x.com/gambitmarkets?s=21&t=79KHC_scqRsG6xPlnKJOYg"
                className="text-xs lg:text-lg text-white cursor-pointer mt-1"
              >
                <Image
                  src="/assets/img/icons/twitter.png"
                  alt=""
                  className="cursor-pointer w-[25px] h-[25px]"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                href="https://t.co/T57WLwuTmx"
                className="text-xs lg:text-lg text-white cursor-pointer mt-1"
              >
                <Image
                  src="/assets/img/icons/discord.svg"
                  alt=""
                  className="cursor-pointer w-[25px] h-[25px]"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                href="https://t.me/gambitcommunity"
                className="text-xs lg:text-lg text-white cursor-pointer mt-1"
              >
                <Image
                  src="/assets/img/icons/telegram.svg"
                  alt=""
                  className="cursor-pointer w-[25px] h-[25px]"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[20px] sm:px-[42px] h-[50px] xl:h-[80px] flex items-center justify-between">
        <p className="text-xs xl:text-sm text-white">
          © 2024 Gambit. All rights reserved.
        </p>
        <div className="flex gap-[10px] sm:gap-[25px]">
          <p className="text-xs xl:text-sm text-white">Terms</p>
          <p className="text-xs xl:text-sm text-white">Privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
