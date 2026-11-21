
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("foodhub_orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // API states
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [updateError, setUpdateError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // GET API - Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setApiError("");

      const [cartsResponse, usersResponse] = await Promise.all([
        fetch("https://dummyjson.com/carts?limit=10"),
        fetch("https://dummyjson.com/users?limit=100"),
      ]);

      if (!cartsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch orders. Please try again.");
      }

      const cartsData = await cartsResponse.json();
      const usersData = await usersResponse.json();

      const formattedOrders = cartsData.carts.map((cart) => {
        const customer = usersData.users.find(
          (user) => user.id === cart.userId
        );

        return {
          id: `#FD${String(1000 + cart.id)}`,
          customer: customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Unknown Customer",
          restaurant: "FoodHub Partner",
          amount: cart.total,
          status: "Pending",
          date: "Not available",
        };
      });

      setOrders(formattedOrders);
    } catch (error) {
      setApiError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch API when page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // Save orders in localStorage
  useEffect(() => {
    if (!loading && !apiError) {
      localStorage.setItem("foodhub_orders", JSON.stringify(orders));
    }
  }, [orders, loading, apiError]);

  // Search and Filter
  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.restaurant.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  // PUT API - Update Order Status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingOrderId(id);
      setUpdateError("");
      setDeleteError("");
      setSuccessMessage("");

      const cartId = Number(id.replace("#FD", "")) - 1000;

      const response = await fetch(
        `https://dummyjson.com/carts/${cartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      const updatedData = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, status: updatedData.status || newStatus }
            : order
        )
      );

      setSuccessMessage(`Order ${id} updated successfully!`);
    } catch (error) {
      setUpdateError(error.message || "Unable to update order.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // DELETE API - Delete Order
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingOrderId(id);
      setDeleteError("");
      setUpdateError("");
      setSuccessMessage("");

      const cartId = Number(id.replace("#FD", "")) - 1000;

      const response = await fetch(
        `https://dummyjson.com/carts/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order.");
      }

      const deletedData = await response.json();

      if (!deletedData.isDeleted) {
        throw new Error("The API did not confirm deletion.");
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );

      setSuccessMessage(`Order ${id} deleted successfully!`);
    } catch (error) {
      setDeleteError(error.message || "Unable to delete order.");
    } finally {
      setDeletingOrderId(null);
    }
  };

  // Status Colors
  const statusColors = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <main className="p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Orders
          </h2>

          <p className="text-slate-500 mt-1">
            Manage and track all food delivery orders.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          Total Orders:{" "}
          <span className="font-bold text-slate-800">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Orders Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

        {/* Search and Filter */}
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between">

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg outline-none"
          >
            <option value="All">All Orders</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        {/* Loading */}
        {loading && (
          <p className="p-8 text-center text-blue-600">
            Loading orders from API...
          </p>
        )}

        {/* GET API Error */}
        {!loading && apiError && (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-3">
              {apiError}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Orders Content */}
        {!loading && !apiError && (
          <>
            {/* API Messages */}
            {updateError && (
              <p className="mx-6 mt-4 text-sm text-red-600">
                {updateError}
              </p>
            )}

            {deleteError && (
              <p className="mx-6 mt-4 text-sm text-red-600">
                {deleteError}
              </p>
            )}

            {successMessage && (
              <p className="mx-6 mt-4 text-sm text-green-600">
                {successMessage}
              </p>
            )}

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Order ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Restaurant</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">

                  {filteredOrders.map((order) => (
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
                        ₹{order.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {order.date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          {/* View */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/orders/${order.id.replace("#", "")}`
                              )
                            }
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            View
                          </button>

                          {/* Update Status */}
                          <select
                            value={order.status}
                            disabled={
                              updatingOrderId === order.id ||
                              deletingOrderId === order.id
                            }
                            onChange={(e) =>
                              updateStatus(order.id, e.target.value)
                            }
                            className="border border-slate-300 rounded-md p-1 text-xs outline-none disabled:opacity-50"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {updatingOrderId === order.id && (
                            <span className="text-xs text-blue-600">
                              Updating...
                            </span>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={
                              deletingOrderId === order.id ||
                              updatingOrderId === order.id
                            }
                            onClick={() => deleteOrder(order.id)}
                            className="text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            {deletingOrderId === order.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <p className="p-8 text-center text-slate-500">
                No orders found.
              </p>
            )}
          </>
        )}

      </div>
    </main>
  );
}

export default Orders;
