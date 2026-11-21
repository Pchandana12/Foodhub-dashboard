
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import FoodItems from "./pages/FoodItems";
import Restaurants from "./pages/Restaurants";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ApiPractice from "./pages/ApiPractice";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/food-items" element={<FoodItems />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/api-practice" element={<ApiPractice />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
