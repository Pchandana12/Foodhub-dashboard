import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 24000 },
  { month: "Jul", revenue: 32000 },
  { month: "Aug", revenue: 38000 },
  { month: "Sep", revenue: 35000 },
  { month: "Oct", revenue: 42000 },
  { month: "Nov", revenue: 48000 },
  { month: "Dec", revenue: 52000 },
];

function RevenueChart() {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Revenue Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monthly revenue performance
        </p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0f172a"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;