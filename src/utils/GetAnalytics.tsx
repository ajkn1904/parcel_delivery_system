/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  useGetMonthlyShipmentsQuery,
  useGetParcelOverviewQuery,
  useGetParcelTrendsQuery,
  useGetStatusDistributionQuery,
  useGetReceiverDeliveryPerformanceQuery,
  useGetReceiverSuccessMetricsQuery,
} from "@/redux/features/analytics/analytic.api";
import { useTheme } from "@/hooks/useTheme";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { SkeletonCard } from "./SkeletonCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function GetAnalytics() {
  const { data: monthlyData, isLoading } = useGetMonthlyShipmentsQuery({});
  const { data: distributionData, isLoading: distributionLoading } = useGetStatusDistributionQuery({});
  const { data: trendsData, isLoading: trendsLoading } = useGetParcelTrendsQuery({});
  const { data, isLoading: parcelOverviewLoading } = useGetParcelOverviewQuery({});
  const { data: receiverPerformance, isLoading: performanceLoading } = useGetReceiverDeliveryPerformanceQuery({});
  const { data: receiverSuccess, isLoading: successLoading } = useGetReceiverSuccessMetricsQuery({});
  const { theme } = useTheme();
  const { data: user } = useUserInfoQuery(undefined)
  const userRole = user?.data?.role
  //console.log(userRole);


  const overviewData = data?.data;

  const labelColor = theme === "dark" ? "#fff" : "#000";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
  const borderColor =
    theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  // ---------------- Monthly Shipments Line Chart ----------------
  const monthlyChartData = {
    labels: monthlyData?.data.map((item: any) => String(item._id)) || [],
    datasets: [
      {
        label: "Monthly Shipments",
        data: monthlyData?.data.map((item: any) => Number(item.count)) || [],
        fill: false,
        borderColor: "#4BC0C0",
        backgroundColor: "#4BC0C0",
        tension: 0.2,
      },
    ],
  };
  const monthlyChartOptions = {
    plugins: {
      datalabels: {
        anchor: "end" as const,
        align: "top" as const,
        color: labelColor,
        font: { weight: 700 },
        formatter: (value: number) => value,
      },
      legend: { labels: { color: labelColor } },
    },
    scales: {
      x: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
      y: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
    },
  };

  // ---------------- Status Distribution Pie Chart ----------------
  const statusColorMap: Record<string, string> = {
    Requested: "#FFCE56",
    "In Transit": "#9966FF",
    Delivered: "#4BC0C0",
    Returned: "#FF9F40",
    Approved: "#36A2EB",
    Canceled: "#FF6384",
  };

  const distributionChartData = {
    labels: distributionData?.data.map((item: any) => String(item.status)) || [],
    datasets: [
      {
        label: "Status Distribution",
        data: distributionData?.data.map((item: any) => Number(item.count)) || [],
        backgroundColor:
          distributionData?.data.map(
            (item: any) => statusColorMap[String(item.status)] || "#999999"
          ) || [],
      },
    ],
  };

  const distributionChartOptions = {
    plugins: {
      datalabels: { color: labelColor, font: { weight: 700 } },
      legend: { labels: { color: labelColor } },
    },
  };

  // ---------------- Parcel Trends Bar Chart ----------------
  const uniqueMonths = trendsData
    ? Array.from(new Set(trendsData.data.map((item: any) => String(item.month))))
    : [];
  const uniqueStatuses = trendsData
    ? Array.from(new Set(trendsData.data.map((item: any) => String(item.status))))
    : [];

  const statusColors: Record<string, string> = {
    Delivered: "#36A2EB",
    Canceled: "#FF6384",
    Returned: "#FFCE56",
  };

  const trendsChartData = {
    labels: uniqueMonths,
    datasets: uniqueStatuses.map((status) => ({
      label: status,
      data: uniqueMonths.map((month) => {
        const entry = trendsData?.data.find(
          (item: any) => String(item.month) === month && String(item.status) === status
        );
        return entry ? Number(entry.count) : 0;
      }),
      backgroundColor: statusColors[(status as any)] || "#4BC0C0",
    })),
  };

  const trendsChartOptions = {
    plugins: {
      datalabels: { color: labelColor, font: { weight: 700 } },
      legend: { labels: { color: labelColor } },
    },
    scales: {
      x: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
      y: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
    },
  };


  // ---------------- Receiver Success Metrics (Pie) ----------------
  const successData = receiverSuccess?.data || {};
  const successChartData = {
    labels: ["Delivered", "Canceled", "Returned"],
    datasets: [
      {
        label: "Receiver Success Metrics",
        data: [
          Number(successData.delivered) || 0,
          Number(successData.canceled) || 0,
          Number(successData.returned) || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };
  const successChartOptions = {
    plugins: {
      datalabels: { color: labelColor, font: { weight: 700 } },
      legend: { labels: { color: labelColor } },
    },
  };

  // ---------------- Receiver Delivery Performance (Bar) ----------------
  const perfDataArray = receiverPerformance?.data?.[0]?.performance || [];

  const perfTrendChartData = {
    labels: perfDataArray.map((item: any) => String(item.month)) || [],
    datasets: [
      {
        label: "Total Delivered",
        data: perfDataArray.map((item: any) => Number(item.onTime + item.late) || 0),
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "On Time",
        data: perfDataArray.map((item: any) => Number(item.onTime) || 0),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Late",
        data: perfDataArray.map((item: any) => Number(item.late) || 0),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const perfTrendChartOptions = {
    plugins: {
      datalabels: { color: labelColor, font: { weight: 700 } },
      legend: { labels: { color: labelColor } },
    },
    scales: {
      x: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
      y: { ticks: { color: labelColor }, grid: { color: gridColor, borderColor } },
    },
  };

  if (isLoading || distributionLoading || successLoading || performanceLoading || trendsLoading || parcelOverviewLoading) {
    return <SkeletonCard />
  }
  return (
    <div className="">
      <div className="w-full">
        <h2 className="font-semibold text-lg mb-2 uppercase">Parcel Overview</h2>
        <div className="overflow-x-auto w-full">
          <div className="bg-background overflow-hidden rounded-md border w-full">
            <Table className="w-full table-fixed dark:bg-gray-900">
              <TableBody>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-semibold">Delivered</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.delivered}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-semibold">In Transit</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.inTransit}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-semibold">Pending</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.pending}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-semibold">Canceled</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.canceled}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-semibold">Total</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {
        userRole === 'admin' || userRole === 'sender' ?
          <div className="lg:flex justify-between items-start gap-8 my-16 lg:my-28">
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-3 dark:text-white uppercase">Status Distribution</h2>
              <Pie data={distributionChartData} options={distributionChartOptions} />
            </div>

            <div className="w-full lg:h-[400px] mt-16 lg:mt-0">
              <h2 className="text-lg font-semibold mb-3 dark:text-white uppercase">Parcel Trends (Month-wise)</h2>
              <Bar data={trendsChartData as any} options={trendsChartOptions} className="bg-gray-50 dark:bg-gray-900 rounded-md p-2" />
            </div>
          </div>
          :
          <></>
      }


      {/* Receiver Only */}
      {
        userRole === 'receiver' ?
          <div className="lg:flex justify-between items-start gap-8 my-16">
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-3 dark:text-white uppercase">Success Metrics</h2>
              <Pie data={successChartData} options={successChartOptions} />
            </div>

            <div className="w-full lg:h-[400px] mt-16 lg:mt-0">
              <h2 className="text-lg font-semibold mb-3 dark:text-white uppercase">Delivery Performance</h2>
              <Bar data={perfTrendChartData} options={perfTrendChartOptions} className="bg-gray-50 dark:bg-gray-900 rounded-md p-2" />
            </div>
          </div>
          :
          <></>
      }

      <div>
        <h2 className="text-lg font-semibold mb-3 dark:text-white uppercase">Monthly Shipments (Current Year)</h2>
        <Line data={monthlyChartData} options={monthlyChartOptions} className="bg-gray-50 dark:bg-gray-900 p-5 rounded-md" />
      </div>


    </div>
  );
}
