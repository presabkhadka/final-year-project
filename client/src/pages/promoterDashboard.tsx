import PromoterNavbar from "@/components/promoterNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PromoterDashboard() {
  const [totalTreasure, setTotalTreasure] = useState(0);
  const [goodTreasure, setGoodTreasure] = useState(0);
  const [badTreasure, setBadTreasure] = useState(0);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  // ue for total treasures
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

  // ue for good treasures
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    let fetchGoodTreasure = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/promoter/good-treasures",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoodTreasure(response.data.goodTreasuresLength);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoodTreasure();
    let interval = setInterval(fetchGoodTreasure, 2000);
    return () => clearInterval(interval);
  }, []);

  // ue for bad treasures
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    let fetchGoodTreasure = async () => {
      try {
        let response = await axios.get(
          "http://localhost:1010/promoter/bad-treasures",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBadTreasure(response.data.badTreasuresLenght);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoodTreasure();
    let interval = setInterval(fetchGoodTreasure, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 gap-x-4">
      <div className="col-span-full">
        <PromoterNavbar />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
          <div className="rounded-xl shadow-lg bg-muted/80 flex justify-center items-center hover:shadow-xl min-h-[10rem]">
            <div className="w-full flex flex-col gap-2 py-2 justify-center items-center">
              <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
                Total Treasures
              </h1>
              <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
                {totalTreasure}
              </h1>
            </div>
          </div>

          <div className="rounded-xl shadow-lg bg-muted/80 flex justify-center items-center hover:shadow-xl min-h-[10rem]">
            <div className="w-full flex flex-col gap-2 py-2 justify-center items-center">
              <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
                Total Good Comments
              </h1>
              <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-green-600 dark:text-green-400">
                {goodTreasure}
              </h1>
            </div>
          </div>

          <div className="rounded-xl shadow-lg bg-muted/80 flex justify-center items-center hover:shadow-xl col-span-1 sm:col-span-2 md:col-span-1 min-h-[10rem]">
            <div className="w-full flex flex-col gap-2 py-2 justify-center items-center">
              <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200">
                Total Bad Comments
              </h1>
              <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl text-red-600 dark:text-red-400">
                {badTreasure}
              </h1>
            </div>
          </div>
          <div className="col-span-full">
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
