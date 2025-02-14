import PromoterNavbar from "@/components/promoterNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PromoterDashboard() {
  const [totalTreasure, setTotalTreasure] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    const cleanedToken = token?.split(" ")[1];
    let fetchTotalTreasure = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/promoter/total-treasure",
          {
            headers: {
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );
        setTotalTreasure(response.data.totalTreasure);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalTreasure();

    let interval = setInterval(fetchTotalTreasure, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 gap-x-4">
      <div className="col-span-full">
        <PromoterNavbar />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
          {/* Total Treasures Card */}
          <div className="rounded-2xl shadow-lg bg-muted/80 flex flex-col items-center hover:shadow-xl overflow-hidden min-h-[10rem]">
            <img
              src="../../public/adventure.jpg"
              alt="adventure"
              className="w-full max-h-40 md:max-h-48 rounded-t-2xl"
            />
            <div className="w-full flex flex-col gap-2 py-2 justify-center items-center">
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
                Total Treasures
              </h1>
              <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-indigo-600 dark:text-indigo-400">
                {totalTreasure}
              </h1>
            </div>
          </div>

          {/* Another Card (e.g., Donations, Statistics, etc.) */}
          <div className="rounded-xl shadow-lg bg-muted/80 flex justify-center items-center hover:shadow-xl min-h-[10rem]">
            <h1 className="font-bold text-xl sm:text-2xl">Total Treasure</h1>
          </div>

          {/* Positive Responses */}
          <div className="rounded-xl shadow-lg bg-muted/80 flex justify-center items-center hover:shadow-xl col-span-1 sm:col-span-2 md:col-span-1 min-h-[10rem]">
            <h1 className="font-bold text-xl sm:text-2xl">Positive Response</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
