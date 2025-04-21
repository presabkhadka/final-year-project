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
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocket } from "@/context/SocketContext";

export default function PromoterNavbar() {
  interface PromoterDetails {
    userName?: string;
    userEmail?: string;
  }

  interface Notification {
    _id?: string;
    userId?: string;
    message?: string;
  }

  const [promoterDetails, setPromoterDetails] = useState<PromoterDetails>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useSocket();
  let notificationCount;
  if (notifications.length > 0) {
    notificationCount = notifications.length;
  } else {
    notificationCount = 0;
  }

  // ue for fetching promoter details
  useEffect(() => {
    const fetchPromoterDetails = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No authorization headers found");
        }
        let response = await axios.get(
          "http://localhost:1010/promoter/promoter-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromoterDetails(response.data.promoter);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromoterDetails();
  }, []);

  // Fetch existing notifications once on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) throw new Error("No authorization headers found");

        const response = await axios.get(
          "http://localhost:1010/promoter/notifications",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(response.data.notifications ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // handler signature matches what your server emits:
    const handler = (raw: { _id: string; userId: string; message: string }) => {
      const newNoti: Notification = {
        _id: raw._id,
        userId: raw.userId,
        message: raw.message,
      };

      setNotifications((prev) =>
        prev.some((n) => n._id === raw._id) ? prev : [newNoti, ...prev]
      );
    };

    socket.on("donationNotification", handler);
    return () => {
      socket.off("donationNotification", handler);
    };
  }, [socket]);

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("UserRole");
    toast.success("Logged out successfully");
    window.location.href = "/promoter/login";
  };

  const deleteNotifications = async () => {
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No authroization headers");
      }
      let response = await axios.delete(
        "http://localhost:1010/promoter/delete-notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications([]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const renderNotificationContent = () => {
    if (notificationCount == 0) {
      return (
        <div className="py-4 text-center text-gray-500">
          No notifications yet
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
        {notifications.map((note) => (
          <div
            key={note._id}
            className="border p-4 rounded-lg shadow-lg dark:bg-muted/80 hover:border-green-500"
          >
            <p className="font-semibold">{note.message}</p>
          </div>
        ))}
      </div>
    );
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
                    to={"/promoter/dashboard"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-black"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={"/promoter/reviews"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg hover:text-black"
                      }`
                    }
                  >
                    Reviews
                  </NavLink>
                  <NavLink
                    to={"/promoter/promote"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg"
                      }`
                    }
                  >
                    Promote
                  </NavLink>
                  <NavLink
                    to={"/promoter/donation-campaigns"}
                    className={({ isActive }) =>
                      `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
                        isActive
                          ? "text-green-500 text-lg font-semibold"
                          : "text-gray-600 font-semibold text-lg"
                      }`
                    }
                  >
                    Donation Campaigns
                  </NavLink>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <div className="relative">
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full justify-between">
            <div>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription className="pt-4">
                  {renderNotificationContent()}
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* wrap the button in a container that sits at the bottom */}
            {notifications.length > 0 && (
              <div className="mt-auto px-4 pb-4">
                <button
                  onClick={deleteNotifications}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Clear All
                </button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <ModeToggle />
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>
                {promoterDetails?.userName?.charAt(0) || (
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
                {promoterDetails?.userName || "Promoter"}
              </p>
              <p className="text-xs ">
                {promoterDetails?.userEmail || "email@example.com"}
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
          to={"/promoter/dashboard"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/promoter/reviews"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none  cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Reviews
        </NavLink>
        <NavLink
          to={"/promoter/promote"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Promote
        </NavLink>
        <NavLink
          to={"/promoter/donation-campaign"}
          className={({ isActive }) =>
            `flex p-2 items-center gap-4 hover:outline-none hover:text-black cursor-pointer ${
              isActive
                ? "text-green-500 text-lg font-semibold"
                : "text-gray-600 font-semibold text-lg hover:text-lime-300"
            }`
          }
        >
          Donation Campaign
        </NavLink>
      </div>
      <div className="hidden lg:flex lg:justify-end lg:gap-4">
        <Sheet>
          <SheetTrigger>
            <div className="relative">
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full justify-between">
            <div>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription className="pt-4">
                  {renderNotificationContent()}
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* wrap the button in a container that sits at the bottom */}
            {notifications.length > 0 && (
              <div className="mt-auto px-4 pb-4">
                <button
                  onClick={deleteNotifications}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Clear All
                </button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <ModeToggle />
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>
                {promoterDetails?.userName?.charAt(0) || (
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
                {promoterDetails?.userName || "Promoter"}
              </p>
              <p className="text-xs ">
                {promoterDetails?.userEmail || "email@example.com"}
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
    </div>
  );
}
