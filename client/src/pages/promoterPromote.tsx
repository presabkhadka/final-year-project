import { useEffect, useState } from "react";
import axios from "axios";
import PromoterNavbar from "@/components/promoterNavbar";
import TreasureForm from "./promoterCRUD";
import { Store } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

interface Treasure {
  _id: string;
  treasureName: string;
  treasureLocation: string;
  treasureType: String;
  openingTime: string;
  closingTime: string;
  owner: string;
  treasureImage?: {
    data: Uint8Array;
  };
}

export default function Promote() {
  const [treasures, setTreasures] = useState<Treasure[]>([]);

  useEffect(() => {
    const fetchTreasures = async () => {
      try {
        const token = localStorage.getItem("Authorization")?.split(" ")[1];

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost:1010/promoter/card-details",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.treasures)) {
          setTreasures(response.data.treasures);
        } else {
          console.error("Unexpected response structure", response);
        }
      } catch (error) {
        console.error("Error fetching treasures:", error);
      }
    };

    fetchTreasures();

    const interval = setInterval(fetchTreasures, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTreasure = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];

      const response = await fetch(
        "http://localhost:1010/promoter/add-treasure",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting the form.");
    }
  };

  function arrayBufferToBase64(buffer: any): string {
    if (!buffer) {
      return "";
    }

    // Check if it's an array or array-like object
    const bytes =
      buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 bg-white shadow-md dark:bg-black">
        <PromoterNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center dark:bg-muted/80 shadow-md rounded-lg">
          <div className="flex items-center">
            <Store className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold">Promote Treasures</h1>
          </div>
          <Dialog>
            <DialogTrigger className="border px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400">
              Add
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <TreasureForm onSubmit={handleCreateTreasure} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4 overflow-auto">
            {treasures.length === 0
              ? // Show skeletons if treasures are loading or empty
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="rounded-lg shadow overflow-hidden border"
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <Skeleton height="100%" width="100%" />
                        </div>
                        <div className="w-2/3 p-4">
                          <Skeleton count={2} />
                          <Skeleton width="80%" />
                          <Skeleton width="60%" />
                          <Skeleton width="30%" />
                        </div>
                      </div>
                    </div>
                  ))
              : treasures.map((treasure: Treasure) => (
                  <div
                    key={treasure._id}
                    className="rounded-lg shadow overflow-hidden border"
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        {treasure.treasureImage ? (
                          <img
                            src={`data:image/jpeg;base64,${treasure.treasureImage}`}
                            alt={treasure.treasureName}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="w-2/3 p-4">
                        <h2 className="text-lg font-medium">
                          {treasure.treasureName}
                        </h2>
                        <p className="text-sm mt-2 text-slate-500 dark:text-slate-300">
                          {treasure.treasureLocation}
                        </p>
                        <p className="text-sm mt-2 text-slate-500 dark:text-slate-300">
                          Opening Time: {treasure.openingTime} -{" "}
                          {treasure.closingTime}
                        </p>
                        <p className="text-sm mt-2 text-slate-500 dark:text-slate-300">
                          Type: {treasure.treasureType}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <button className="text-blue-600 border border-blue-600 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md text-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </div>
  );
}
