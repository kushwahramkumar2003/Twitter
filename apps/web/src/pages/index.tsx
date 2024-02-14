import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitter } from "react-icons/bs";
import { BiHomeCircle } from "react-icons/bi";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const SidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div
          className="col-span-3 flex justify-start
         pt-8"
        >
          <div
            className="text-4xl
          hover:bg-gray-800 rounded-full
           p-2 h-fit cursor-pointer transition-all"
          >
            <BsTwitter />
          </div>
          {SidebarMenuItems.map((item) => (
            <li key={item.title}>
              <span>{item.icon} </span>
              <span>{item.title} </span>
            </li>
          ))}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-400"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
