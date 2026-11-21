const orders = [
  {
    id: "#FD1001",
    customer: "Rahul Sharma",
    restaurant: "Spice Kitchen",
    amount: "₹850",
    status: "Delivered",
    date: "Oct 5, 2026",
  },
  {
    id: "#FD1002",
    customer: "Priya Reddy",
    restaurant: "Food Palace",
    amount: "₹620",
    status: "Pending",
    date: "Oct 5, 2026",
  },
  {
    id: "#FD1003",
    customer: "Arjun Kumar",
    restaurant: "Burger House",
    amount: "₹450",
    status: "Delivered",
    date: "Oct 4, 2026",
  },
  {
    id: "#FD1004",
    customer: "Sneha Rao",
    restaurant: "Biryani Point",
    amount: "₹1,250",
    status: "Cancelled",
    date: "Oct 4, 2026",
  },
  {
    id: "#FD1005",
    customer: "Vikram Singh",
    restaurant: "Pizza Hub",
    amount: "₹780",
    status: "Pending",
    date: "Oct 3, 2026",
  },
];

function RecentOrders() {
  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Orders
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Latest food delivery orders
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Order ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Restaurant
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">

            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium text-slate-800">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {order.customer}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {order.restaurant}
                </td>

                <td className="px-6 py-4 font-medium text-slate-800">
                  {order.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-500 text-sm">
                  {order.date}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;