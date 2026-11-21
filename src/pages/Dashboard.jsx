import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrders";

function Dashboard() {
  return (
    <main className="p-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Overview
        </h2>

        <p className="text-slate-500 mt-1">
          Here's what's happening with your food delivery business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Orders"
          value="1,245"
          icon="📦"
          change="+12.5% this month"
        />

        <StatCard
          title="Total Revenue"
          value="₹85,420"
          icon="💰"
          change="+8.2% this month"
        />

        <StatCard
          title="Customers"
          value="2,450"
          icon="👥"
          change="+15.3% this month"
        />

        <StatCard
          title="Restaurants"
          value="120"
          icon="🏪"
          change="+5.4% this month"
        />

      </div>

      <div className="mt-8">
        <RevenueChart />
      </div>
      <RecentOrders />

    </main>
  );
}

export default Dashboard;