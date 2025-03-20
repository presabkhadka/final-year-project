import PromoterNavbar from "@/components/promoterNavbar";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

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
  const [filter, setFilter] = useState("");

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

  const filteredTreasure = treasures.filter(
    (treasures) =>
      treasures.name.toLowerCase().includes(filter.toLowerCase()) ||
      treasures.positiveReviews.toString().includes(filter) ||
      treasures.negativeReviews.toString().includes(filter) ||
      treasures.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 shadow-md">
        <PromoterNavbar />
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <Skeleton count={treasures.length} height={40} />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg flex flex-col gap-2">
            <div className="self-end relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground  bg-muted/80" />
              <input
                type="text"
                className="border p-2 rounded-lg bg-muted/80 outline-none pl-9"
                placeholder="Filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-blue-500 text-white dark:bg-blue-800">
                  <TableHead className="p-3 border dark:border-gray-600">
                    Treasure Name
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Good Reviews
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Bad Reviews
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreasure.length > 0 ? (
                  filteredTreasure.map((treasure) => (
                    <TableRow
                      className="border-b-2 last:border-0 even:bg-muted/100 dark:even:bg-gray-700"
                      key={treasure.name}
                    >
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.name}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.positiveReviews}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.negativeReviews}
                      </TableCell>
                      <TableCell
                        className={`p-3 border ${
                          treasure.status === "Good"
                            ? "text-green-500 dark:text-green-400"
                            : treasure.status === "Bad"
                            ? "text-red-500 dark:text-red-400"
                            : "text-yellow-500 dark:text-yellow-400"
                        } dark:border-gray-600`}
                      >
                        {treasure.status}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center p-4 text-gray-500 dark:text-gray-400"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
