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
} from "@/redux/features/analytics/analytic.api";
import { useTheme } from "@/hooks/useTheme";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

export default function GetAnalytics() {
  const { data: monthlyData } = useGetMonthlyShipmentsQuery({});
  const { data: distributionData } = useGetStatusDistributionQuery({});
  const { data: trendsData } = useGetParcelTrendsQuery({});
  const { data } = useGetParcelOverviewQuery({});
  const { theme } = useTheme();
  const overviewData = data?.data;
  //console.log(overviewData);

  const labelColor = theme === "dark" ? "#fff" : "#000";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
  const borderColor =
    theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  // Monthly Shipments Line Chart
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
      x: {
        ticks: { color: labelColor },
        grid: { color: gridColor, borderColor },
      },
      y: {
        ticks: { color: labelColor },
        grid: { color: gridColor, borderColor },
      },
    },
  };

  // Status Distribution Pie Chart
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

  // Parcel Trends Bar Chart (Month-wise by Status)
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
        return entry ? Number(entry.count) : ''; // ✅ FIX: use number instead of ''
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
      x: {
        ticks: { color: labelColor },
        grid: { color: gridColor, borderColor },
      },
      y: {
        ticks: { color: labelColor },
        grid: { color: gridColor, borderColor },
      },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 px-5 mb-28">

      {/* Parcel Overview */}
      <div className="w-full">
        <h2 className="font-semibold text-lg mb-2">Parcel Overview</h2>
        <div className="overflow-x-auto w-full">
          <div className="bg-background overflow-hidden rounded-md border w-full">
            <Table className="w-full table-fixed">
              <TableBody>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Delivered</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.delivered}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">In Transit</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.inTransit}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Pending</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.pending}</TableCell>
                </TableRow>
                <TableRow className="border-b border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Canceled</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.canceled}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Total</TableCell>
                  <TableCell className="py-2 text-center">{overviewData?.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="lg:flex justify-between items-start gap-8 my-16 lg:my-28">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">Status Distribution</h2>
          <Pie data={distributionChartData} options={distributionChartOptions} />
        </div>

        <div className="w-full lg:h-[400px] mt-16 lg:mt-0">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">Parcel Trends (Month-wise)</h2>
          <Bar data={trendsChartData as any} options={trendsChartOptions} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 dark:text-white">Monthly Shipments (Current Year)</h2>
        <Line data={monthlyChartData} options={monthlyChartOptions} />
      </div>
    </div>

  );
}
