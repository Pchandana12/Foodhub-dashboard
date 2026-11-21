import { useParams, useNavigate } from "react-router-dom";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customers = [
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
  ];

  const customer = customers.find(
    (customer) => customer.id === Number(id)
  );

  if (!customer) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Customer Not Found
        </h1>

        <button
          onClick={() => navigate("/customers")}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back to Customers
        </button>
      </main>
    );
  }

  return (
    <main className="p-8">
      <button
        onClick={() => navigate("/customers")}
        className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to Customers
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
            👤
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {customer.name}
            </h1>

            <p className="text-slate-500">
              Customer ID: #{customer.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium text-slate-800 mt-1">
              {customer.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="font-medium text-slate-800 mt-1">
              {customer.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="font-medium text-slate-800 mt-1">
              {customer.orders}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CustomerDetails;