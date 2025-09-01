import GetAnalytics from "@/utils/GetAnalytics";

export default function History() {
  return (
    <div className="max-w-6xl mx-auto px-5 w-full space-y-10 mb-28">
      <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-16 mt-8">HISTORY</h1>
      <GetAnalytics />
    </div>
  );
}