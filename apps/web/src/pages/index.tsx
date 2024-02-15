import Image from "next/image";

import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import React from "react";
import FeedCard from "@/components/FeedCard";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const SidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-8 px-4">
          <div
            className="text-4xl
          hover:bg-gray-800 rounded-full
           p-4 h-fit cursor-pointer transition-all w-fit"
          >
            <BsTwitter />
          </div>
          <div className={"mt-4 text-2xl pr-4"}>
            <ul>
              {SidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className={
                    "flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-2"
                  }
                >
                  <span>{item.icon} </span>
                  <span>{item.title} </span>
                </li>
              ))}
            </ul>
            <div className={"mt-5 px-3"}>
              <button
                className={
                  "bg-[#1d9bf0] p-4 rounded-full w-full  text-lg font-semibold"
                }
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600  ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
