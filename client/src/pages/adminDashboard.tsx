import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AdminDashboard() {
  const [explorer, setExplorer] = useState(null);
  const [promoter, setPromoter] = useState(null);
  const [treasure, setTreasure] = useState(null);
  const [campaign, setCampaign] = useState(null);

  // ue for total explorer
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    let fetchTotalExplorer = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/admin/total-explorer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExplorer(response.data.totalExplorers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalExplorer();
    let interval = setInterval(fetchTotalExplorer, 2000);
    return () => clearInterval(interval);
  }, []);

  // ue for total promoter
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    let fetchTotalExplorer = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/admin/total-promoter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromoter(response.data.totalPromoter);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalExplorer();
    let interval = setInterval(fetchTotalExplorer, 2000);
    return () => clearInterval(interval);
  }, []);

  // ue for total treasure
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("No authentication token found");
    }
    let fetchTotalExplorer = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/admin/total-treasure",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreasure(response.data.totalTreasure);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalExplorer();
    let interval = setInterval(fetchTotalExplorer, 2000);
    return () => clearInterval(interval);
  }, []);

  // ue for donation campaigns
  useEffect(() => {
    let fetchCampaigns = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("no token found");
        }

        let response = await axios.get(
          "http://localhost:1010/admin/active-donation-campaigns",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let number = response.data.activeCampaigns.length;
        setCampaign(number);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCampaigns();
    let interval = setInterval(fetchCampaigns, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    {
      label: "Users",
      explorer: explorer ?? 0,
      promoter: promoter ?? 0,
    },
  ];

  const chartConfig = {
    explorer: {
      label: "Explorer",
      color: "hsl(var(--chart-1))",
    },
    promoter: {
      label: "Promoter",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 gap-x-4">
      <div className="col-span-full">
        <div className="bg-white shadow-md dark:bg-black sticky top-0 z-50">
          <AdminNavbar />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4">
          <CardWrapper>
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
              Total Explorer
            </h1>
            <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
              {explorer}
            </h1>
          </CardWrapper>
          <CardWrapper>
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
              Total Promoter
            </h1>
            <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
              {promoter}
            </h1>
          </CardWrapper>
          <CardWrapper>
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
              Total Treasure
            </h1>
            <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
              {treasure}
            </h1>
          </CardWrapper>
          <CardWrapper>
            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
              Donation Campaings
            </h1>
            <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
              {campaign}
            </h1>
          </CardWrapper>
          <div className="col-span-full">
            <Card className="bg-muted/80 dark:bg-black border hover:border-pink-500">
              <CardHeader>
                <CardTitle>User Ratio</CardTitle>
              </CardHeader>
              <CardContent className="rounded-xl">
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="explorer"
                      fill="var(--color-explorer)"
                      radius={4}
                    />
                    <Bar
                      dataKey="promoter"
                      fill="var(--color-promoter)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
  function CardWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="rounded-xl shadow-lg bg-muted/80 dark:bg-black flex flex-col justify-center items-center hover:shadow-xl min-h-[10rem] gap-2 border hover:border-green-500">
        {children}
      </div>
    );
  }
}
