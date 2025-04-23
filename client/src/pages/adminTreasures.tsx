import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import TreasureGrid from "../components/TreasureGrid";
import {  RefreshCw } from "lucide-react";

interface Treasure {
  _id: string;
  treasureName: string;
  treasureLocation: string;
  treasureDescription: string;
  treasureContact: string;
  treasureType: string;
  openingTime: string;
  closingTime: string;
  treasureImage?: {
    data: Uint8Array;
  };
  owner: string;
  visitors: number;
}

export default function AdminTreasures() {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Fetch treasures
  const fetchTreasures = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("Authorization")?.split(" ")[1];

      if (!token) {
        throw new Error("No authorization headers");
      }

      const response = await axios.get(
        "http://localhost:1010/admin/treasures",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTreasures(response.data.treasures);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      }
    }
  };

  // Initial fetch and set interval
  useEffect(() => {
    fetchTreasures();
    const interval = setInterval(fetchTreasures, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTreasures();
    setTimeout(() => setRefreshing(false), 500);
  };

  // Delete treasure handler
  const handleDelete = async (treasureId: string) => {
    try {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];

      if (!token) {
        throw new Error("No authorization headers");
      }

      await axios.delete(
        `http://localhost:1010/admin/delete-treasure/${treasureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistically update the UI
      setTreasures(treasures.filter((t) => t._id !== treasureId));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="top-0 sticky z-50 overflow-y-hidden shadow-md">
        <AdminNavbar />
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              View and manage all treasures in the system
            </h1>
          </div>

          <div className="flex items-center mt-3 sm:mt-0 space-x-3">
            <button
              onClick={handleRefresh}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700  border  rounded-lg hover:border-green-500 focus:outline-none dark:text-white"
            >
              <RefreshCw
                size={16}
                className={`mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Error alert */}
        {error && (
          <div
            className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <div className="font-medium">Error occurred!</div>
            <div>{error}</div>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <TreasureGrid treasures={treasures} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
