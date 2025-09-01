import GetAnalytics from "@/utils/GetAnalytics";

export default function Analytics() {

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 px-5 mb-28">
      <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-16">ANALYTICS</h1>
      <GetAnalytics />
    </div>

  );
}
