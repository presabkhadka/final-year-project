import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

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
  const [filter, setFilter] = useState("");

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

  const filteredTreasure = treasure.filter(
    (treasure) =>
      treasure.treasureName.toLowerCase().includes(filter.toLowerCase()) ||
      treasure.owner?.userName.toLowerCase().includes(filter.toLowerCase()) ||
      treasure.treasureContact.includes(filter) ||
      treasure.owner?.userEmail.toLowerCase().includes(filter.toLowerCase()) ||
      treasure.treasureType.toLowerCase().includes(filter.toLowerCase()) ||
      treasure.status?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="top-0 sticky z-50 overflow-y-hidden shadow-md">
        <AdminNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <Skeleton count={treasure.length || 5} height={40} />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg flex flex-col gap-2">
            <div className="self-end relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground  bg-muted/80" />
              <input
                type="text"
                value={filter}
                className="border rounded-lg p-2 bg-muted/80 outline-none pl-9"
                placeholder="Filter"
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
                    Promoter Name
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Contact Number
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Type
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
                      key={treasure.treasureName}
                    >
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureName}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.owner?.userName || "Unknown"}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureContact}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.owner?.userEmail || "N/A"}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureType}
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
                        {treasure.status || "Pending"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
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
