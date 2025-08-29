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
  useGetParcelTrendsQuery,
  useGetStatusDistributionQuery,
} from "@/redux/features/analytics/analytic.api";
import { useTheme } from "@/hooks/useTheme";

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

export default function Analytics() {
  const { data: monthlyData } = useGetMonthlyShipmentsQuery({});
  const { data: distributionData } = useGetStatusDistributionQuery({});
  const { data: trendsData } = useGetParcelTrendsQuery({});
  const { theme } = useTheme();

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
  // Fixed color mapping
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
    <div className="md:scale-x-(0.90) w-full max-w-6xl mx-auto space-y-10 px-5 mb-28">
      <h1 className="text-4xl font-semibold text-orange-500 dark:text-orange-400">OVERVIEW</h1>
      <div className="lg:flex justify-between items-start gap-8">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">
            Status Distribution
          </h2>
          <Pie data={distributionChartData} options={distributionChartOptions} />
        </div>

        <div className="w-full my-28 lg:my-0 lg:h-[400px]">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">
            Parcel Trends (Month-wise)
          </h2>
          <Bar data={(trendsChartData as any)} options={trendsChartOptions} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 dark:text-white">
          Monthly Shipments
        </h2>
        <Line data={monthlyChartData} options={monthlyChartOptions} />
      </div>
    </div>
  );
}
