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
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleUpdateTreasure = async (formData: FormData) => {
    if (!selectedTreasure) {
      console.error("No treasure selected for update.");
      return;
    }

    console.log("Updating treasure with ID:", selectedTreasure._id);

    try {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("Token not found");
      }

      if (!formData.get("treasureImage")) {
        formData.delete("treasureImage");
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.patch(
        `http://localhost:1010/promoter/update-treasures/${selectedTreasure._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Success:", response.data);
      setIsDialogOpen(false);
      toast.success("Treasure updated successfully!");
    } catch (error) {
      console.error("Update failed");
      toast.error("Something went wrong while updating.");
    }
  };

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

  const handleDeleteTreasure = async (selectedTreasure: any) => {
    if (!selectedTreasure) {
      console.log("no treasure selected");
    }
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token in headers");
      }
      let response = await axios.delete(
        `http://localhost:1010/promoter/delete-treasures/${selectedTreasure._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Treasure delete successfully");
    } catch (error) {
      toast.error("Couldn't delete treasure.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 shadow-md">
        <PromoterNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center border shadow-md rounded-xl">
          <div className="flex items-center space-x-3">
            <Store className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Promote Treasures
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              onClick={() => {
                setSelectedTreasure(null);
                setIsDialogOpen(true);
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Add Treasure
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <TreasureForm
                  treasure={selectedTreasure}
                  onSubmit={
                    selectedTreasure
                      ? handleUpdateTreasure
                      : handleCreateTreasure
                  }
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4 overflow-auto">
            {treasures?.length === 0
              ? Array(5)
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
              : treasures?.map((treasure: Treasure) => (
                  <div
                    key={treasure._id}
                    className="rounded-lg overflow-hidden border shadow-md"
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        {treasure.treasureImage ? (
                          <img
                            src={`http://localhost:1010${treasure.treasureImage}`}
                            alt={treasure.treasureName}
                            className="h-full aspect-video"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg font-medium">
                            {treasure.treasureName}
                          </h2>
                          <p className="text-sm  text-slate-500 dark:text-slate-300">
                            Treasure Location: {treasure.treasureLocation}
                          </p>
                          <p className="text-sm  text-slate-500 dark:text-slate-300">
                            Opening Hours: {treasure.openingTime} -{" "}
                            {treasure.closingTime}
                          </p>
                          <p className="text-sm  text-slate-500 dark:text-slate-300">
                            Type: {treasure.treasureType}
                          </p>
                        </div>
                        <div className=" flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setSelectedTreasure(treasure);
                              setIsDialogOpen(true);
                            }}
                            className="text-blue-600 border border-blue-600 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              handleDeleteTreasure(treasure);
                            }}
                            className="text-red-600 border border-red-600 hover:bg-red-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            Delete
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
