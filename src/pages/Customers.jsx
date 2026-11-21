import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9876543210",
      orders: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "9876543211",
      orders: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      email: "arjun@gmail.com",
      phone: "9876543212",
      orders: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha@gmail.com",
      phone: "9876543213",
      orders: 5,
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);
  };

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your customers
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Phone
              </th>

              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Orders
              </th>

              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {customer.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {customer.email}
                    </p>
                  </div>
                </td>

                <td className="p-4 text-slate-600">
                  {customer.phone}
                </td>

                <td className="p-4 text-slate-600">
                  {customer.orders}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/customers/${customer.id}`)
                      }
                      className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(customer.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No customers found.
          </div>
        )}
      </div>
    </main>
  );
}

export default Customers;