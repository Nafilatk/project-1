type StatsCardProps = {
  icon: string;
  value: number;
  label: string;
  progress?: number;
  color?: "blue" | "green";
};

export default function StatsCard({
  icon,
  value,
  label,
  progress = 100,
  color = "blue",
}: StatsCardProps) {
  const isGreen = color === "green";

  return (
    <div className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-3 rounded-xl transition-colors ${
            isGreen
              ? "bg-green-100 group-hover:bg-green-200"
              : "bg-blue-100 group-hover:bg-blue-200"
          }`}
        >
          <span
            className={`text-2xl ${
              isGreen ? "text-green-600" : "text-blue-600"
            }`}
          >
            {icon}
          </span>
        </div>

        <div>
          <div className="text-3xl font-bold text-blue-900">{value}</div>
          <div className="text-blue-600 font-medium">{label}</div>
        </div>
      </div>

      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isGreen
              ? "bg-linear-to-r from-green-400 to-green-500"
              : "bg-linear-to-r from-blue-500 to-blue-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
