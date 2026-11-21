
import { useState } from "react";

const initialFoodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    restaurant: "Biryani Point",
    category: "Biryani",
    price: 250,
    available: true,
  },
  {
    id: 2,
    name: "Chicken Burger",
    restaurant: "Burger House",
    category: "Burgers",
    price: 180,
    available: true,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    restaurant: "Pizza Hub",
    category: "Pizza",
    price: 320,
    available: true,
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    restaurant: "Spice Kitchen",
    category: "North Indian",
    price: 220,
    available: false,
  },
  {
    id: 5,
    name: "Veg Fried Rice",
    restaurant: "Food Palace",
    category: "Chinese",
    price: 160,
    available: true,
  },
  {
    id: 6,
    name: "Masala Dosa",
    restaurant: "South Tiffins",
    category: "South Indian",
    price: 120,
    available: true,
  },
];

function FoodItems() {
  const [foodItems, setFoodItems] = useState(initialFoodItems);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingFood, setEditingFood] = useState(null);

  const [newFood, setNewFood] = useState({
    name: "",
    restaurant: "",
    category: "",
    price: "",
    available: true,
  });

  // Search
  const filteredFoodItems = foodItems.filter((food) => {
    const searchText = search.toLowerCase();

    return (
      food.name.toLowerCase().includes(searchText) ||
      food.restaurant.toLowerCase().includes(searchText) ||
      food.category.toLowerCase().includes(searchText)
    );
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewFood({
      ...newFood,
      [name]: value,
    });
  };

  // Open Add Food form
  const handleAddClick = () => {
    setEditingFood(null);

    setNewFood({
      name: "",
      restaurant: "",
      category: "",
      price: "",
      available: true,
    });

    setShowForm(true);
  };

  // Open Edit form
  const handleEdit = (food) => {
    setEditingFood(food);

    setNewFood({
      name: food.name,
      restaurant: food.restaurant,
      category: food.category,
      price: food.price,
      available: food.available,
    });

    setShowForm(true);
  };

  // Delete Food
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedFoodItems = foodItems.filter(
      (food) => food.id !== id
    );

    setFoodItems(updatedFoodItems);
  };

  // Add or Update Food
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newFood.name ||
      !newFood.restaurant ||
      !newFood.category ||
      !newFood.price
    ) {
      alert("Please fill all fields.");
      return;
    }

    // EDIT FOOD
    if (editingFood) {
      const updatedFoodItems = foodItems.map((food) =>
        food.id === editingFood.id
          ? {
              ...food,
              name: newFood.name,
              restaurant: newFood.restaurant,
              category: newFood.category,
              price: Number(newFood.price),
              available: newFood.available,
            }
          : food
      );

      setFoodItems(updatedFoodItems);
    }

    // ADD NEW FOOD
    else {
      const newItem = {
        id: Date.now(),
        name: newFood.name,
        restaurant: newFood.restaurant,
        category: newFood.category,
        price: Number(newFood.price),
        available: newFood.available,
      };

      setFoodItems([...foodItems, newItem]);
    }

    // Reset form
    setNewFood({
      name: "",
      restaurant: "",
      category: "",
      price: "",
      available: true,
    });

    setEditingFood(null);
    setShowForm(false);
  };

  return (
    <main className="p-8">

      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Food Items
          </h2>

          <p className="text-slate-500 mt-1">
            Manage food items available on FoodHub.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="px-5 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
        >
          + Add Food
        </button>

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {editingFood ? "Edit Food" : "Add New Food"}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {editingFood
                  ? "Update the food item details."
                  : "Enter the food item details below."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingFood(null);
              }}
              className="text-slate-500 hover:text-slate-800 text-xl"
            >
              ✕
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Food Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Food Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={newFood.name}
                  onChange={handleInputChange}
                  placeholder="Enter food name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Restaurant */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Restaurant
                </label>

                <input
                  type="text"
                  name="restaurant"
                  value={newFood.restaurant}
                  onChange={handleInputChange}
                  placeholder="Enter restaurant name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={newFood.category}
                  onChange={handleInputChange}
                  placeholder="Example: Biryani"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={newFood.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

            </div>

            {/* Availability */}
            <div className="mt-5">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={newFood.available}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      available: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />

                <span className="text-sm font-medium text-slate-700">
                  Food is available
                </span>

              </label>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                type="submit"
                className="px-5 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
              >
                {editingFood ? "Save Changes" : "Add Food"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingFood(null);
                }}
                className="px-5 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition"
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
          placeholder="Search food, restaurant or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400"
        />

      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredFoodItems.map((food) => (

          <div
            key={food.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
          >

            {/* Food Name */}
            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {food.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {food.restaurant}
                </p>
              </div>

              <span className="text-3xl">
                🍔
              </span>

            </div>

            {/* Category + Price */}
            <div className="mt-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Category
                </p>

                <p className="font-medium text-slate-700">
                  {food.category}
                </p>
              </div>

              <div className="text-right">

                <p className="text-sm text-slate-500">
                  Price
                </p>

                <p className="text-lg font-bold text-slate-800">
                  ₹{food.price}
                </p>

              </div>

            </div>

            {/* Status + Actions */}
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  food.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {food.available ? "Available" : "Unavailable"}
              </span>

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() => handleEdit(food)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(food.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* No Results */}
      {filteredFoodItems.length === 0 && (

        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center mt-6">

          <p className="text-slate-500">
            No food items found.
          </p>

        </div>

      )}

    </main>
  );
}

export default FoodItems;

