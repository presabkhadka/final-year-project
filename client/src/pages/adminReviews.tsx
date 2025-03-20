import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function AdminReviews() {
  interface Treasure {
    treasureName: string;
    owner: {
      _id: string;
      userName: string;
      userEmail: string;
    };
    treasureContact: string;
    treasureType: string;
    status?: string;
  }

  const [treasure, setTreasure] = useState<Treasure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("no token found in the headers");
        }
        let response = await axios.get(
          "http://localhost:1010/admin/treasure-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreasure(response.data.treasures || []);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong while fetching details:", error);
      }
    };
    fetchDetails();
    let interval = setInterval(fetchDetails, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="top-0 sticky z-50 overflow-y-hidden shadow-md">
        <AdminNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <Skeleton count={treasure.length || 5} height={40} />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white dark:bg-blue-800">
                  <th className="p-3 border dark:border-gray-600">
                    Treasure Name
                  </th>
                  <th className="p-3 border dark:border-gray-600">
                    Promoter Name
                  </th>
                  <th className="p-3 border dark:border-gray-600">
                    Contact Number
                  </th>
                  <th className="p-3 border dark:border-gray-600">Email</th>
                  <th className="p-3 border dark:border-gray-600">Type</th>
                  <th className="p-3 border dark:border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {treasure.length > 0 ? (
                  treasure.map((treasure) => (
                    <tr
                      className="border-b-2 last:border-0 even:bg-muted/100 dark:even:bg-gray-700"
                      key={treasure.treasureName}
                    >
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.treasureName}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.owner?.userName || "Unknown"}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.treasureContact}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.owner?.userEmail || "N/A"}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.treasureType}
                      </td>
                      <td
                        className={`p-3 border ${
                          treasure.status === "Good"
                            ? "text-green-500 dark:text-green-400"
                            : treasure.status === "Bad"
                            ? "text-red-500 dark:text-red-400"
                            : "text-yellow-500 dark:text-yellow-400"
                        } dark:border-gray-600`}
                      >
                        {treasure.status || "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center p-4 text-gray-500 dark:text-gray-400"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
