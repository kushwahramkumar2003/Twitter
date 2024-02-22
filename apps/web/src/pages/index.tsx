import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import React, { useCallback } from "react";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphClient } from "../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

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
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        return toast.error("Google token not found");
      }
      // const { verifyGoogleToken } = await graphClient.request(
      const response = await graphClient.request(verifyUserGoogleTokenQuery, {
        token: googleToken,
      });

      console.log("response --> ", response);

      console.log("verifyGoogleToken --> ", response.verifyGoogleToken);
      const { verifyGoogleToken } = response;

      if (!verifyGoogleToken) {
        return toast.error("User not found");
      }

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        localStorage.setItem("__twitter_token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-22 relative">
          <div
            className="text-2xl
          hover:bg-gray-800 rounded-full
           p-4 h-fit cursor-pointer transition-all w-fit"
          >
            <BsTwitter />
          </div>
          <div className={"mt-1 text-xl pr-4"}>
            <ul>
              {SidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className={
                    "flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  }
                >
                  <span className="text-3xl">{item.icon} </span>
                  <span>{item.title} </span>
                </li>
              ))}
            </ul>
            <div className={"mt-5 px-3"}>
              <button
                className={
                  "bg-[#1d9bf0] rounded-full w-full text-lg font-semibold py-2 px-4"
                }
              >
                Tweet
              </button>
            </div>
          </div>
          <div className="mt-5 absolute bottom-5 flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-full p-4">
            {user && user?.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full "
              />
            )}
            {user && (
              <div className="item-center">
                <h3 className="text-xl">{user?.firstName}</h3>
                <h3 className="text-xl">{user?.lastName}</h3>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] border-gray-600  h-screen overflow-scroll">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="bg-slate-700 rounded-lg ">
              <h1 className={"my-2 text-2xl"}>New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
