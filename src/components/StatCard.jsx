function StatCard({ title, value, icon, change }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

          <p className="text-sm text-green-600 mt-2">
            {change}
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>

    </div>
  );
}

export default StatCard;