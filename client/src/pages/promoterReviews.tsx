import PromoterNavbar from "@/components/promoterNavbar";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface Treasure {
  name: string;
  positiveReviews: number;
  negativeReviews: number;
  status: string;
}

export default function PromoterReview() {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreasures = async () => {
      try {
        const token = localStorage.getItem("Authorization")?.split(" ")[1];

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          "http://localhost:1010/promoter/treasure-table",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTreasures(data.treasures || []);
      } catch (error) {
        console.error("Error fetching treasures:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTreasures();

    let interval = setInterval(fetchTreasures, 2000);

    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 bg-white shadow-md dark:bg-black">
        <PromoterNavbar />
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <Skeleton count={20} height={40} />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white dark:bg-blue-800">
                  <th className="p-3 border dark:border-gray-600">
                    Treasure Name
                  </th>
                  <th className="p-3 border dark:border-gray-600">
                    Good Reviews
                  </th>
                  <th className="p-3 border dark:border-gray-600">
                    Bad Reviews
                  </th>
                  <th className="p-3 border dark:border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {treasures.length > 0 ? (
                  treasures.map((treasure) => (
                    <tr
                      className="border-b-2 last:border-0 even:bg-muted/100 dark:even:bg-gray-700"
                      key={treasure.name}
                    >
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.name}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.positiveReviews}
                      </td>
                      <td className="p-3 border dark:border-gray-600">
                        {treasure.negativeReviews}
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
                        {treasure.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
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
