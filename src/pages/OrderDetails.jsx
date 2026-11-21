
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("foodhub_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodhub_orders", JSON.stringify(orders));
  }, [orders]);

  const order = orders.find(
    (item) => item.id.replace("#", "") === id
  );

  const updateStatus = (newStatus) => {
    const updatedOrders = orders.map((item) =>
      item.id.replace("#", "") === id
        ? { ...item, status: newStatus }
        : item
    );

    setOrders(updatedOrders);
  };

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  if (!order) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Order Not Found
        </h1>

        <button
          onClick={() => navigate("/orders")}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back to Orders
        </button>
      </main>
    );
  }

  return (
    <main className="p-8">
      <button
        onClick={() => navigate("/orders")}
        className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Orders
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Order Details
            </h1>

            <p className="text-slate-500 mt-1">
              Order ID: {order.id}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${
              statusStyle[order.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">Customer</p>
            <p className="font-medium text-slate-800 mt-1">
              {order.customer}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Restaurant</p>
            <p className="font-medium text-slate-800 mt-1">
              {order.restaurant}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Items</p>
            <p className="font-medium text-slate-800 mt-1">
              {order.items || "Not added yet"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Order Date</p>
            <p className="font-medium text-slate-800 mt-1">
              {order.date}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Payment</p>
            <p className="font-medium text-slate-800 mt-1">
              {order.payment || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Amount</p>
            <p className="text-xl font-bold text-slate-800 mt-1">
              ₹{Number(order.amount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Update Order Status
          </label>

          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="w-full sm:w-64 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
