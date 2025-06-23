"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchData } from "@/util/api";
import { TagInterface } from "@/interfaces/tag.interface";

const NavbarTabMenu = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tags, setTags] = useState<TagInterface[]>([]);

  useEffect(() => {
    getTags();
  }, [])

  const getTags = async () => {
    const _tags = await fetchData('https://polymarket.com/api/tags/filtered?tag=100221&status=active');
    const _updatedTags: TagInterface[] = [];

    _tags.forEach((_tag: TagInterface) => {
      if (_tag.publishedAt && _tag.slug !== 'sports') {
        _tag.link = '/markets/' + _tag.slug;
        _updatedTags.push(_tag);
      } else {
        if (_tag.slug !== 'all') {
          _tag.link = '/' + _tag.slug;
          _updatedTags.push(_tag);
        }
      }
    });
    setTags(_updatedTags);
  }

  return (
    <div className="pt-5 flex gap-5 overflow-x-scroll hide-scroll whitespace-nowrap">
      <Link href='/markets'>
        <p
          className={`
              text-white text-base cursor-pointer leading-3 
              ${pathname === '/markets' && searchParams.toString() !== '_s=startDate&ascending=false' ?
              "pb-[10px] border-b-[2px] border-G0"
              :
              "pb-[12px] hover:pb-[10px] hover:border-b-[2px] hover:border-lime-700"
            }`}
        >
          All
        </p>
      </Link>
      <Link href='/markets?_s=startDate&ascending=false'>
        <p
          className={`
              text-white text-base cursor-pointer leading-3 
              ${pathname === '/markets' && searchParams.toString() === '_s=startDate&ascending=false' ?
              "pb-[10px] border-b-[2px] border-G0"
              :
              "pb-[12px] hover:pb-[10px] hover:border-b-[2px] hover:border-lime-700"
            }`}
        >
          New
        </p>
      </Link>
      {tags?.map((tag: TagInterface, idx) => (
        <Link href={tag.link} key={idx}>
          <p
            className={`
              text-white text-base cursor-pointer leading-3 
              ${pathname === tag.link || pathname + "?" + searchParams.toString() === tag.slug ?
                "pb-[10px] border-b-[2px] border-G0"
                :
                "pb-[12px] hover:pb-[10px] hover:border-b-[2px] hover:border-lime-700"
              }`}
          >
            {tag.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default NavbarTabMenu;
