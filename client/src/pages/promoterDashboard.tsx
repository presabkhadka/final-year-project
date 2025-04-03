import PromoterNavbar from "@/components/promoterNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  RadialBarChart,
  PolarRadiusAxis,
  Label,
  RadialBar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Crown, MessageSquare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PromoterDashboard() {
  interface TopTreasuers {
    _id: string;
    treasureName: string;
    treasureLocation: string;
    treasureType: string;
  }

  const [totalTreasure, setTotalTreasure] = useState(0);
  const [goodTreasure, setGoodTreasure] = useState(0);
  const [badTreasure, setBadTreasure] = useState(0);
  const [topTreasure, setTopTreasure] = useState<TopTreasuers[]>([]);

  const dynamicChartData = [
    { type: "Positive Reviews", goodCount: goodTreasure },
    { type: "Negative Reviews", badCount: badTreasure },
  ];
  const dynamicChartDataRadial = [
    {
      type: "Good Treasures",
      goodReviews: goodTreasure,
      badReviews: badTreasure,
    },
  ];

  const dynamicChartConfig = {
    good: {
      label: "Good Treasures",
      color: "hsl(var(--chart-1))",
    },
    bad: {
      label: "Bad Treasures",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  // ue for total treasures
  useEffect(() => {
    let fetchTotalTreasure = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const cleanedToken = token?.split(" ")[1];
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

  // ue for top treasures
  useEffect(() => {
    const fetchTopTreasure = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("no authorization token in headers");
        }

        const response = await axios.get(
          "http://localhost:1010/promoter/top-treasures",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopTreasure(response.data.topTreasure);
      } catch (error) {
        throw new Error("couldn't fetch top treasure");
      }
    };
    fetchTopTreasure();
    let interval = setInterval(fetchTopTreasure, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 gap-x-4">
      <div className="col-span-full">
        <div className="bg-white shadow-md dark:bg-black sticky top-0 z-50">
          <PromoterNavbar />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
          <div className="rounded-xl shadow-lg  flex justify-center items-center hover:shadow-xl min-h-[10rem] border hover:border-green-500">
            {totalTreasure === 0 ? (
              <Skeleton height={100} width="80%" />
            ) : (
              <div className="w-full flex flex-col gap-2 py-2 px-4 items-center">
                <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200 self-start">
                  Total Treasures
                </h1>
                <div className="w-full flex justify-between items-center text-green-500">
                  <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl">
                    {totalTreasure}
                  </h1>
                  <Crown />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl shadow-lg  flex justify-center items-center hover:shadow-xl min-h-[10rem] border hover:border-purple-500">
            {goodTreasure === 0 ? (
              <Skeleton height={100} width="80%" />
            ) : (
              <div className="w-full flex flex-col gap-2 py-2 px-4 justify-center items-center">
                <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200 self-start">
                  Total Good Comments
                </h1>
                <div className="w-full flex justify-between items-center text-purple-500">
                  <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl">
                    {goodTreasure}
                  </h1>
                  <MessageSquare />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl shadow-lg  flex justify-center items-center hover:shadow-xl col-span-1 sm:col-span-2 md:col-span-1 min-h-[10rem] border hover:border-red-500">
            {badTreasure === 0 ? (
              <Skeleton height={100} width="80%" />
            ) : (
              <div className="w-full flex flex-col gap-2 py-2 px-4 justify-center items-center">
                <h1 className="font-bold text-xl sm:text-2xl md:text-2xl text-gray-800 dark:text-gray-200 self-start">
                  Total Bad Comments
                </h1>
                <div className="w-full flex justify-between items-center text-red-500">
                  <h1 className="font-semibold text-2xl sm:text-2xl md:text-3xl">
                    {badTreasure}
                  </h1>
                  <MessageSquare />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full p-4">
          <div className="col-span-full md:col-span-8 rounded-xl shadow-lg hover:shadow-xl border hover:border-orange-500">
            {dynamicChartData.length === 0 ? (
              <Skeleton height={300} width="100%" />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Ratings Chart</CardTitle>
                </CardHeader>
                <CardContent className="rounded-xl">
                  <ChartContainer config={dynamicChartConfig}>
                    <BarChart accessibilityLayer data={dynamicChartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={true}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                      />
                      <Bar
                        dataKey="goodCount"
                        fill="var(--color-good)"
                        radius={4}
                      />
                      <Bar
                        dataKey="badCount"
                        fill="var(--color-bad)"
                        radius={4}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="col-span-full md:col-span-4 rounded-xl shadow-lg hover:shadow-xl border hover:border-blue-500">
            {dynamicChartData.length === 0 ? (
              <Skeleton height={300} width="100%" />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Radial Chart</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 items-center">
                  <ChartContainer
                    config={dynamicChartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                  >
                    <RadialBarChart
                      data={dynamicChartDataRadial}
                      endAngle={180}
                      innerRadius={80}
                      outerRadius={130}
                    >
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) - 16}
                                    className="fill-foreground text-2xl font-bold"
                                  >
                                    Reviews
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 4}
                                    className="fill-muted-foreground"
                                  >
                                    Comparision
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </PolarRadiusAxis>
                      <RadialBar
                        dataKey="goodReviews"
                        stackId="a"
                        cornerRadius={5}
                        fill="var(--color-good)"
                        className="stroke-transparent stroke-2"
                      />
                      <RadialBar
                        dataKey="badReviews"
                        fill="var(--color-bad)"
                        stackId="a"
                        cornerRadius={5}
                        className="stroke-transparent stroke-2"
                      />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="col-span-full flex flex-col gap-2">
            <div className="shadow-lg p-4 border rounded-lg hover:border-pink-500">
              <h1 className="font-bold text-2xl text-center">Top Treasures</h1>
            </div>
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-blue-500 text-white dark:bg-blue-800">
                  <TableHead className="p-3 border dark:border-gray-600">
                    Treasure Name
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Treasure Location
                  </TableHead>
                  <TableHead className="p-3 border dark:border-gray-600">
                    Treasure Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTreasure.length > 0 ? (
                  topTreasure.map((treasure) => (
                    <TableRow
                      className="border-b-2 last:border-0 even:bg-muted/100 dark:even:bg-gray-700"
                      key={treasure._id}
                    >
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureName}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureLocation}
                      </TableCell>
                      <TableCell className="p-3 border dark:border-gray-600">
                        {treasure.treasureType}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
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
      </div>
    </div>
  );
}
