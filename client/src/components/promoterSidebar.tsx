import { NavLink } from "react-router-dom";
import { CiHome, CiBoxList, CiCirclePlus, CiBellOn } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PromoterSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-4">
          <SidebarContent onClose={() => setIsOpen(false)} />
        </SheetContent>

        <div className="hidden md:flex md:w-64 h-screen fixed bg-background shadow-lg p-4">
          <SidebarContent />
        </div>
      </Sheet>
      
    </div>
  );
}

/* Sidebar Content */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navItems = [
    {
      items: [
        {
          name: "Dashboard",
          icon: <CiHome className="h-5 w-5" />,
          url: "/promoter/dashboard",
        },
        {
          name: "Treasure Reviews",
          icon: <CiBoxList className="h-5 w-5" />,
          url: "/promoter/reports",
        },
        {
          name: "Add Treasure",
          icon: <CiCirclePlus className="h-5 w-5" />,
          url: "/promoter/add-treasure",
        },
      ],
    },
    {
      items: [
        {
          name: "Notifications",
          icon: <CiBellOn className="h-5 w-5" />,
          url: "/promoter/notifications",
        },
        {
          name: "Logout",
          icon: <CiLogout className="h-5 w-5" />,
          url: "/promoter/login",
        },
      ],
    },
  ];

  return (
    <nav className="space-y-6">
      <h1 className="text-2xl font-semibold">Urban Discoveries</h1>
      {navItems.map((section, index) => (
        <div key={index}>
          <ul className="space-y-1">
            {section.items.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.url}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-4 p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
