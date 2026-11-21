import { useState } from "react";

const initialRestaurants = [
  {
    id: 1,
    name: "Biryani Point",
    location: "Hyderabad",
    cuisine: "Indian",
    phone: "9876543210",
    status: "Open",
  },
  {
    id: 2,
    name: "Burger House",
    location: "Secunderabad",
    cuisine: "Fast Food",
    phone: "9876543211",
    status: "Open",
  },
  {
    id: 3,
    name: "Pizza Hub",
    location: "Kukatpally",
    cuisine: "Italian",
    phone: "9876543212",
    status: "Closed",
  },
  {
    id: 4,
    name: "Spice Kitchen",
    location: "Madhapur",
    cuisine: "North Indian",
    phone: "9876543213",
    status: "Open",
  },
  {
    id: 5,
    name: "Food Palace",
    location: "Ameerpet",
    cuisine: "Chinese",
    phone: "9876543214",
    status: "Open",
  },
  {
    id: 6,
    name: "South Tiffins",
    location: "Dilsukhnagar",
    cuisine: "South Indian",
    phone: "9876543215",
    status: "Closed",
  },
];

function Restaurants() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    cuisine: "",
    phone: "",
    status: "Open",
  });

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = search.toLowerCase();

    return (
      restaurant.name.toLowerCase().includes(searchText) ||
      restaurant.location.toLowerCase().includes(searchText) ||
      restaurant.cuisine.toLowerCase().includes(searchText)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingRestaurant) {
      setEditingRestaurant({
        ...editingRestaurant,
        [name]: value,
      });
    } else {
      setNewRestaurant({
        ...newRestaurant,
        [name]: value,
      });
    }
  };

  const handleAddRestaurant = (e) => {
    e.preventDefault();

    const restaurant = {
      id: Date.now(),
      name: newRestaurant.name,
      location: newRestaurant.location,
      cuisine: newRestaurant.cuisine,
      phone: newRestaurant.phone,
      status: newRestaurant.status,
    };

    setRestaurants([...restaurants, restaurant]);

    setNewRestaurant({
      name: "",
      location: "",
      cuisine: "",
      phone: "",
      status: "Open",
    });

    setShowForm(false);
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleUpdateRestaurant = (e) => {
    e.preventDefault();

    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === editingRestaurant.id
        ? editingRestaurant
        : restaurant
    );

    setRestaurants(updatedRestaurants);

    setEditingRestaurant(null);
    setShowForm(false);
  };
  const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this restaurant?"
  );

  if (!confirmDelete) {
    return;
  }

  const updatedRestaurants = restaurants.filter(
    (restaurant) => restaurant.id !== id
  );

  setRestaurants(updatedRestaurants);
};

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRestaurant(null);

    setNewRestaurant({
      name: "",
      location: "",
      cuisine: "",
      phone: "",
      status: "Open",
    });
  };

  return (
    <main className="p-8">

      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Restaurants
          </h2>

          <p className="text-slate-500 mt-1">
            Manage restaurants available on FoodHub.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (showForm) {
              handleCancelForm();
            } else {
              setShowForm(true);
            }
          }}
          className="px-5 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
        >
          {showForm ? "Close Form" : "+ Add Restaurant"}
        </button>

      </div>

      {/* Restaurant Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">

          <h3 className="text-lg font-bold text-slate-800 mb-6">
            {editingRestaurant
              ? "Edit Restaurant"
              : "Add New Restaurant"}
          </h3>

          <form
            onSubmit={
              editingRestaurant
                ? handleUpdateRestaurant
                : handleAddRestaurant
            }
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Restaurant Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    editingRestaurant
                      ? editingRestaurant.name
                      : newRestaurant.name
                  }
                  onChange={handleInputChange}
                  placeholder="Enter restaurant name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={
                    editingRestaurant
                      ? editingRestaurant.location
                      : newRestaurant.location
                  }
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Cuisine
                </label>

                <input
                  type="text"
                  name="cuisine"
                  value={
                    editingRestaurant
                      ? editingRestaurant.cuisine
                      : newRestaurant.cuisine
                  }
                  onChange={handleInputChange}
                  placeholder="Example: Indian"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    editingRestaurant
                      ? editingRestaurant.phone
                      : newRestaurant.phone
                  }
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={
                    editingRestaurant
                      ? editingRestaurant.status
                      : newRestaurant.status
                  }
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                type="submit"
                className="px-5 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
              >
                {editingRestaurant
                  ? "Update Restaurant"
                  : "Add Restaurant"}
              </button>

              <button
                type="button"
                onClick={handleCancelForm}
                className="px-5 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search restaurant, location or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
        />

      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredRestaurants.map((restaurant) => (

          <div
            key={restaurant.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
          >

            {/* Restaurant Header */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                  🏪
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {restaurant.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    📍 {restaurant.location}
                  </p>
                </div>

              </div>

            </div>

            {/* Restaurant Details */}
            <div className="mt-6 space-y-3">

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">
                  Cuisine
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {restaurant.cuisine}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">
                  Phone
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {restaurant.phone}
                </span>

              </div>

            </div>

            {/* Status + Edit */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  restaurant.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {restaurant.status}
              </span>

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() => handleEdit(restaurant)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Edit
                </button>

                {/* <button
                  type="button"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  View Details
                </button> */}
                <div className="flex items-center gap-4">

  {/* <button
    type="button"
    onClick={() => handleEdit(restaurant)}
    className="text-sm font-medium text-slate-600 hover:text-slate-900"
  >
    Edit
  </button> */}

  <button
    type="button"
    onClick={() => handleDelete(restaurant.id)}
    className="text-sm font-medium text-red-500 hover:text-red-700"
  >
    Delete
  </button>

</div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* No Results */}
      {filteredRestaurants.length === 0 && (

        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center mt-6">

          <p className="text-slate-500">
            No restaurants found.
          </p>

        </div>

      )}

    </main>
  );
}

export default Restaurants;