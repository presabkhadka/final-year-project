import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  interface ExplorerDetails {
    userName?: string;
    userEmail?: string;
  }

  const [explorerDetails, setExplorerDetails] = useState<ExplorerDetails>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // ue for fetching explorer details
  useEffect(() => {
    const fetchExplorerDetails = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No authorization headers found");
        }
        setIsLoggedIn(true);
        let response = await axios.get(
          "http://localhost:1010/explorer/fetch-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExplorerDetails(response.data.explorer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExplorerDetails();
    let interval = setInterval(fetchExplorerDetails, 2000);
    return () => clearInterval(interval);
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("UserRole");
    navigate("/explorer/login");
    setIsLoggedIn(false);
  };

  return (
    <div className="py-4 px-4 md:px-6 shadow-md rounded-lg flex justify-between items-center dark:border">
      <h1 className="text-xl md:text-2xl font-bold">Urban Discoveries</h1>
      <div className="flex gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-lime-300"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/explorer/explore"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-lime-300"
                      }`
                    }
                  >
                    Explore
                  </NavLink>
                  <NavLink
                    to={"/explorer/leaderboards"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-lime-300"
                      }`
                    }
                  >
                    Leaderboards
                  </NavLink>
                  <NavLink
                    to={"/explorer/donation-campaigns"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-lime-300"
                      }`
                    }
                  >
                    Donation Campaigns
                  </NavLink>
                  <NavLink
                    to={"/explorer/contact"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-lime-300"
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                map all the notifications from the api here
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ModeToggle />
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>
                {explorerDetails?.userName?.charAt(0) || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4 shadow-lg rounded-xl border">
            <div className="text-sm">
              <p className="font-semibold">
                {explorerDetails?.userName || "Explorer"}
              </p>
              <p className="text-xs ">
                {explorerDetails?.userEmail || "email@example.com"}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                Log Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="hidden lg:flex lg:gap-2">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/explorer/explore"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Explore
        </NavLink>
        <NavLink
          to={"/explorer/leaderboards"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Leaderboards
        </NavLink>
        <NavLink
          to={"/explorer/donation-campaigns"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Donation Campaigns
        </NavLink>
        <NavLink
          to={"/explorer/contact"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Contact
        </NavLink>
      </div>
      <div className="hidden lg:flex">
        {isLoggedIn ? (
          <div className="flex gap-4 items-center">
            <Sheet>
              <SheetTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>keep notifications here</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <ModeToggle />
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback>
                    {explorerDetails?.userName?.charAt(0) || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    )}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4 shadow-lg rounded-xl border">
                <div className="text-sm">
                  <p className="font-semibold">
                    {explorerDetails?.userName || "Promoter"}
                  </p>
                  <p className="text-xs ">
                    {explorerDetails?.userEmail || "email@example.com"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Log Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                navigate("/explorer/login");
              }}
              className="border px-4 py-2 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/explorer/signup");
              }}
              className="border px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
