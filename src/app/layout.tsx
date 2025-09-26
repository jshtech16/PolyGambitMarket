import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import Providers from "@/providers";
import Web3ModalProvider from "@/components/CustomWagmiProvider";
import { config } from "@/components/CustomWagmiProvider/config";

import Navbar from "./(main)/_components/Navbar/Navbar";
import MobileFooter from "./(main)/_components/Footer/MobileFooter";
import Footer from "./(main)/_components/Footer/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gambit",
  description: "Gambit app",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={`w-full relative overflow-x-hidden ${poppins.variable}`}>
        <div className="block w-[200px] h-[200px] bg-[#BDFF00] rounded-full blur-[150px] absolute top-[-150px] left-[-50px]"></div>
        <Providers>
          <Web3ModalProvider initialState={initialState}>
            <Navbar />
            {children}
            <MobileFooter />
            <Footer />
          </Web3ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
