
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">🍔 FoodHub</h2>

      <nav className="space-y-3">

        <Link
          to="/"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/orders"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          📦 Orders
        </Link>

        <Link
          to="/food-items"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          🍔 Food Items
        </Link>

        <Link
          to="/restaurants"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          🏪 Restaurants
        </Link>

        <Link
          to="/customers"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          👥 Customers
        </Link>

        <Link
          to="/user-management"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          👤 User Management
        </Link>
        
<Link to="/api-practice" className="block p-3 rounded-lg hover:bg-slate-700">
  🔌 API Practice
</Link>
        <Link
          to="/settings"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          ⚙️ Settings
        </Link>

      </nav>

      <a
        href="#"
        className="block mt-10 p-3 rounded-lg text-red-400 hover:bg-slate-700"
      >
        🚪 Logout
      </a>
    </aside>
  );
}

export default Sidebar;
