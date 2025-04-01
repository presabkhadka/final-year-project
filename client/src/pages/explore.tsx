import Navbar from "@/components/navbar";
import axios from "axios";
import { Clock, MapPin, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Explore() {
  interface Treasure {
    _id: string;
    treasureName: string;
    treasureLocation: string;
    treasureType: string;
    openingTime: string;
    closingTime: string;
    owner: string;
    visitors: number;
    treasureContact: string;
    treasureDescription: string;
    treasureImage?: {
      data: Uint8Array;
    };
  }

  const [treasures, setTreasures] = useState<Treasure[]>([]);

  useEffect(() => {
    const fetchTreasures = async () => {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      let response = await axios.get(
        "http://localhost:1010/explorer/fetch-treasures",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreasures(response.data.treasures);
    };
    fetchTreasures();
    let interval = setInterval(fetchTreasures, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      <div className="bg-white shadow-md dark:bg-black top-0 sticky z-50">
        <Navbar />
      </div>

      {/* Hero Section - Fixed Layout */}
      <div className="relative w-full min-h-[40vh] overflow-hidden">
        <img
          src="/banner.jpeg"
          alt="banner image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <h1 className="text-white text-4xl font-bold">Explore it all</h1>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treasures.map((treasure) => (
            <div
              key={treasure._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-muted/80"
            >
              <div className="relative h-48">
                <img
                  src={`http://localhost:1010${treasure.treasureImage}`}
                  alt={treasure.treasureName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-muted/80 px-3 py-1 rounded-full">
                  <span className="flex items-center gap-1">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-sm font-medium">
                      {treasure.visitors}
                    </span>
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {treasure.treasureName}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 dark:text-white mb-2">
                  <MapPin size={18} />
                  <span>{treasure.treasureLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-white mb-2">
                  <Clock size={18} />
                  <span>
                    {treasure.openingTime} - {treasure.closingTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-white mb-4">
                  <Phone size={18} />
                  <span>{treasure.treasureContact}</span>
                </div>

                <p className="text-gray-600 dark:text-white mb-4">
                  {treasure.treasureDescription}
                </p>

                <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-orange-500 dark:text-white">
                  {treasure.treasureType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
