import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export default function PromoterNavbar() {
  return (
    <div className="py-4 px-6 shadow-md rounded-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold">Urban Discovories</h1>
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
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
          </AvatarFallback>
        </Avatar>
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
      </div>
      <div className="hidden lg:flex lg:justify-end lg:gap-4">
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
              <SheetDescription>
                map all the notifications from the api here
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ModeToggle />
        <Avatar>
          <AvatarImage>
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
          </AvatarImage>
          <AvatarFallback>
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
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
