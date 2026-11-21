
import { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("foodhub_users");

      if (savedUsers !== null) {
        return JSON.parse(savedUsers);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }

    return [
      { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "Customer", status: "Active" },
      { id: 2, name: "Priya Reddy", email: "priya@gmail.com", role: "Customer", status: "Active" },
      { id: 3, name: "Arjun Kumar", email: "arjun@gmail.com", role: "Admin", status: "Inactive" },
      { id: 4, name: "Sneha Patel", email: "sneha@gmail.com", role: "Customer", status: "Active" },
      { id: 5, name: "Kiran Reddy", email: "kiran@gmail.com", role: "Restaurant Owner", status: "Inactive" },
    ];
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Save users in LocalStorage
  useEffect(() => {
    localStorage.setItem("foodhub_users", JSON.stringify(users));
  }, [users]);

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      role: "Customer",
    });

    setEditingUserId(null);
    setShowForm(false);
  };

  // Add or Update User
  const handleSaveUser = (e) => {
    e.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert("Please enter name and email");
      return;
    }

    if (editingUserId !== null) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          String(user.id) === String(editingUserId)
            ? {
                ...user,
                name: newUser.name.trim(),
                email: newUser.email.trim(),
                role: newUser.role,
              }
            : user
        )
      );

      alert("User updated successfully!");
    } else {
      const user = {
        id: Date.now(),
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        status: "Active",
      };

      setUsers((prevUsers) => [...prevUsers, user]);

      alert("User added successfully!");
      setCurrentPage(1);
    }

    resetForm();
  };

  // Edit User
  const handleEdit = (user) => {
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setEditingUserId(user.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // View User Details
  const handleView = (user) => {
    setSelectedUser(user);
  };

  // Delete User
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );

      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    }
  };

  // Toggle Active / Inactive
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );

    setSelectedUser((prevUser) =>
      prevUser?.id === id
        ? {
            ...prevUser,
            status: prevUser.status === "Active" ? "Inactive" : "Active",
          }
        : prevUser
    );
  };

  // Search and Role / Status Filtering
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      user.status === filter ||
      user.role === filter;

    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Keep current page valid after deleting or filtering users
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Pagination buttons
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalPages)
    );
  };

  // Statistics
  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all FoodHub users
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add User
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Active Users</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {activeUsers}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Inactive Users</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {inactiveUsers}
          </h2>
        </div>

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-xl font-bold mb-4">
            {editingUserId !== null ? "Edit User" : "Add New User"}
          </h2>

          <form onSubmit={handleSaveUser}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={newUser.name}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />

              <select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
                <option value="Restaurant Owner">Restaurant Owner</option>
              </select>

            </div>

            <div className="flex gap-3 mt-4">

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                {editingUserId !== null ? "Update User" : "Save User"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-5 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-lg"
        >
          <option value="All">All Users</option>

          <optgroup label="Status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </optgroup>

          <optgroup label="Role">
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Restaurant Owner">Restaurant Owner</option>
          </optgroup>
        </select>

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="border-t">

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.role}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">

                      <button
                        type="button"
                        onClick={() => handleView(user)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(user.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Toggle
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="bg-white rounded-xl shadow mt-5 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-gray-600 text-sm">
            Showing{" "}
            {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>

          </div>
        </div>
      )}

      {/* View User Details Popup */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold text-slate-800">
                User Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ×
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-semibold text-slate-800">
                  {selectedUser.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email Address</p>
                <p className="font-semibold text-slate-800">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-semibold text-slate-800">
                  {selectedUser.role}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Account Status</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedUser.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">User ID</p>
                <p className="font-semibold text-slate-800">
                  {selectedUser.id}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-6"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default UserManagement;
