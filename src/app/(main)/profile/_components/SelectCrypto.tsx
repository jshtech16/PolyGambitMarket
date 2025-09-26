"use client";
import { CHAINS, SUPPORTED_CHAINS } from "@/constant/exchange";
import { Button } from "@nextui-org/button";
import { FixedSizeList as List } from "react-window";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getTokenList } from "@/util/exchange";

import React, { ChangeEventHandler, useEffect } from "react";
import { Avatar, Image, Input, cn, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { SearchIcon } from "./SearchIcon";

import { Token } from "@/util/exchange";

interface SelectCryptoProps {
  showSelectCrypto: () => void;
  selectToken: (token: Token, chain: number) => void;
}

export const SelectCrypto = (props: SelectCryptoProps) => {
  const { selectToken, showSelectCrypto } = props;
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [selectedChain, setSelectedChain] = useState(137);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const backButtonClicked = () => {
    showSelectCrypto();
  };

  const chainSelected = async (chain: number) => {
    setSelectedChain(chain);
  };

  const handleSelectItem = (token: Token) => {
    console.log(token, selectedChain);
    selectToken(token, selectedChain);
    showSelectCrypto();
  };

  function truncateAddress(address: string) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  useEffect(() => {
    const fetchTokenList = async () => {
      setLoading(true);
      setTokens([]);
      const data = await getTokenList(selectedChain);
      const tokens: Token[] = Object.values(data["tokens"]);
      setTokens(tokens);
      setFilteredTokens(tokens);
      setLoading(false);
    };
    fetchTokenList();
  }, [selectedChain]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setFilteredTokens(
      tokens.filter(
        ({ address, name, symbol }) =>
          address.toLowerCase().indexOf(newValue.toLowerCase()) > -1 ||
          name.toLowerCase().indexOf(newValue.toLowerCase()) > -1 ||
          symbol.toLowerCase().indexOf(newValue.toLowerCase()) > -1
      )
    );
  };

  return (
    <>
      <div className="flex flex-row ml-0 w-full items-center">
        <Button
          color="primary"
          variant="light"
          onClick={backButtonClicked}
          className="pl-0 min-w-10"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-500"></ArrowLeftIcon>
        </Button>
        <p className="text-2xl text-white font-bold align-middle text-center w-full">
          Select chain and token
        </p>
      </div>
      <div className="flex flex-row mt-3 justify-between border border-gray-700 rounded-lg">
        {CHAINS.map((chain, index) => {
          return (
            <Button
              isIconOnly
              size="lg"
              color="warning"
              variant="faded"
              aria-label="Take a photo"
              onClick={() => chainSelected(chain)}
              className={cn("bg-inherit border-1 w-16 h-16 p-2", {
                "bg-white/30": selectedChain === chain,
              })}
              key={index}
            >
              <Image
                className="opacity-100 rounded-full"
                alt="Chain"
                src={SUPPORTED_CHAINS[chain]}
              ></Image>
            </Button>
          );
        })}
      </div>
      <div className="mt-5 border p-2 rounded-lg border-gray-700">
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search by token name or address"
          size="sm"
          startContent={<SearchIcon size={18} width={20} height={20} />}
          type="search"
          value={searchValue}
          onChange={handleSearch}
          className="text-white"
        />
      </div>
      <div className="mt-5">
        {loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        <List
          height={300}
          itemCount={filteredTokens.length}
          itemSize={48}
          width={"100%"}
          className="p-1 border border-gray-700 rounded-lg"
        >
          {({ index, style }) => (
            <div
              className="flex gap-2 items-center py-2 px-4"
              style={style}
              onClick={() => handleSelectItem(filteredTokens[index])}
            >
              <Avatar
                alt={filteredTokens[index].symbol}
                className="flex-shrink-0"
                size="lg"
                src={filteredTokens[index].logoURI}
                imgProps={{ className: "opacity-100 w-8" }}
              />
              <div className="flex flex-col">
                <span className="text-lg text-white">
                  {filteredTokens[index].symbol}
                </span>
                <span className="text-tiny text-default-400 text-white text-xs">
                  {truncateAddress(filteredTokens[index].address)}
                </span>
              </div>
            </div>
          )}
        </List>
      </div>
    </>
  );
};
