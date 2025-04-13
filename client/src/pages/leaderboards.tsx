import Navbar from "@/components/navbar";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

function Leaderboards() {
  interface Promoters {
    userName: string;
    points: number;
  }

  const [promoters, setPromoters] = useState<Promoters[]>([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("no token found in headers");
      }
      const response = await axios.get(
        "http://localhost:1010/explorer/leaderboards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPromoters(response.data.ranking);
    };
    fetchLeaderboards();
    let interval = setInterval(fetchLeaderboards, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="top-0 z-50 sticky overflow-hidden bg-white shadow-md dark:bg-black">
        <Navbar />
      </div>

      <div className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("https://external-preview.redd.it/GB5Adyp5zzQcoI4Jpbgf8tKfJ6GxgHmT8NHgtcrpi3o.png?auto=webp&s=5061d0c1e9c2aa20f503796ed065bef4ddbd363f")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-bold text-white text-center mb-2">
            Promoter
          </h2>
          <h3 className="text-5xl font-bold text-white text-center">
            Leaderboards
          </h3>
        </div>
      </div>

      <div className="flex-grow overflow-auto dark:bg-muted/80">
        <div className="container mx-auto shadow-md">
          <Table className="w-full table-auto bg-white dark:bg-muted/80 rounded-lg">
            <TableHeader>
              <TableRow className="bg-green-500 text-black shadow-md">
                <TableHead className="p-3  border">Ranking</TableHead>
                <TableHead className="p-3  border">Name</TableHead>
                <TableHead className="p-3  border">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoters.length > 0 ? (
                promoters.map((promoter, index) => (
                  <TableRow
                    className="border-b-2 last:border-0  even:bg-slate-600"
                    key={index}
                  >
                    <TableCell className="p-3 ">{index + 1}</TableCell>
                    <TableCell className="p-3 ">{promoter?.userName}</TableCell>
                    <TableCell className="p-3 ">{promoter.points}</TableCell>
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
      </div>

      <footer className="bg-black text-white mt-auto border-t">
        <div className="container mx-auto px-6">
          <div className="py-8 text-center">
            <p>&copy; 2025 Urban Discoveries. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Leaderboards;
