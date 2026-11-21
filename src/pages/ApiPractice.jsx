
import { useEffect, useState } from "react";

function ApiPractice() {
  // Recipes and search
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  // POST form
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    cuisine: "",
    prepTimeMinutes: "",
  });

  // PUT edit form
  const [editingId, setEditingId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({
    name: "",
    cuisine: "",
    prepTimeMinutes: "",
  });

  // Loading states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Messages
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");

  const [retryCount, setRetryCount] = useState(0);

  // GET API - Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/recipes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        setRecipes(data.recipes);
      } catch (err) {
        setError("Could not load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [retryCount]);

  // Handle POST form inputs
  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // POST API - Add recipe
  const handleAddRecipe = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setSubmitError("");
      setSuccess("");

      const response = await fetch(
        "https://dummyjson.com/recipes/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newRecipe.name.trim(),
            cuisine: newRecipe.cuisine.trim(),
            prepTimeMinutes: Number(
              newRecipe.prepTimeMinutes
            ),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const data = await response.json();

      setRecipes((prevRecipes) => [
        data,
        ...prevRecipes,
      ]);

      setNewRecipe({
        name: "",
        cuisine: "",
        prepTimeMinutes: "",
      });

      setSuccess("Recipe added successfully!");
    } catch (err) {
      setSubmitError(
        "Could not add recipe. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing a recipe
  const handleEditClick = (recipe) => {
    setEditingId(recipe.id);

    setEditRecipe({
      name: recipe.name || "",
      cuisine: recipe.cuisine || "",
      prepTimeMinutes: recipe.prepTimeMinutes ?? "",
    });

    setSuccess("");
    setSubmitError("");
  };

  // Handle edit form inputs
  const handleEditChange = (e) => {
    setEditRecipe({
      ...editRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // PUT API - Update recipe
  const handleUpdateRecipe = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setSubmitError("");
      setSuccess("");

      const response = await fetch(
        `https://dummyjson.com/recipes/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editRecipe.name.trim(),
            cuisine: editRecipe.cuisine.trim(),
            prepTimeMinutes: Number(
              editRecipe.prepTimeMinutes
            ),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const data = await response.json();

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === editingId
            ? { ...recipe, ...data }
            : recipe
        )
      );

      setEditingId(null);

      setSuccess("Recipe updated successfully!");
    } catch (err) {
      setSubmitError(
        "Could not update recipe. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  // DELETE API - Delete recipe
  const handleDeleteRecipe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      setSubmitError("");
      setSuccess("");

      const response = await fetch(
        `https://dummyjson.com/recipes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      await response.json();

      // Remove recipe from React state
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );

      setSuccess("Recipe deleted successfully!");
    } catch (err) {
      setSubmitError(
        "Could not delete recipe. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Search recipes
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  // Loading UI
  if (loading) {
    return (
      <main className="p-8">
        <p className="text-slate-600">
          Loading recipes...
        </p>
      </main>
    );
  }

  // GET API error
  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => setRetryCount((prev) => prev + 1)}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="p-8">

      {/* Heading */}
      <h2 className="mb-2 text-2xl font-bold text-slate-800">
        FoodHub API Practice
      </h2>

      <p className="mb-6 text-slate-500">
        Practice GET, POST, PUT and DELETE REST API operations.
      </p>

      {/* POST Form */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">

        <h3 className="mb-4 text-xl font-bold text-slate-800">
          Add New Recipe
        </h3>

        <form onSubmit={handleAddRecipe}>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <input
              type="text"
              name="name"
              placeholder="Recipe name"
              value={newRecipe.name}
              onChange={handleChange}
              className="rounded-lg border p-3"
              required
            />

            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine (e.g. Indian)"
              value={newRecipe.cuisine}
              onChange={handleChange}
              className="rounded-lg border p-3"
              required
            />

            <input
              type="number"
              name="prepTimeMinutes"
              placeholder="Preparation time"
              min="1"
              value={newRecipe.prepTimeMinutes}
              onChange={handleChange}
              className="rounded-lg border p-3"
              required
            />

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Adding Recipe..." : "+ Add Recipe"}
          </button>

        </form>
      </div>

      {/* Success message */}
      {success && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
          {success}
        </p>
      )}

      {/* Error message */}
      {submitError && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
          {submitError}
        </p>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-slate-300 p-3 md:w-96"
      />

      {/* Recipe count */}
      <p className="mb-4 text-slate-500">
        Total recipes: {filteredRecipes.length}
      </p>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {filteredRecipes.map((recipe) => (

          <div
            key={recipe.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >

            {editingId === recipe.id ? (

              // EDIT FORM
              <form onSubmit={handleUpdateRecipe}>

                <h3 className="mb-4 font-bold text-slate-800">
                  Edit Recipe
                </h3>

                <input
                  type="text"
                  name="name"
                  value={editRecipe.name}
                  onChange={handleEditChange}
                  placeholder="Recipe name"
                  className="mb-3 w-full rounded-lg border p-3"
                  required
                />

                <input
                  type="text"
                  name="cuisine"
                  value={editRecipe.cuisine}
                  onChange={handleEditChange}
                  placeholder="Cuisine"
                  className="mb-3 w-full rounded-lg border p-3"
                  required
                />

                <input
                  type="number"
                  name="prepTimeMinutes"
                  value={editRecipe.prepTimeMinutes}
                  onChange={handleEditChange}
                  placeholder="Preparation time"
                  min="1"
                  className="mb-3 w-full rounded-lg border p-3"
                  required
                />

                <div className="flex gap-2">

                  <button
                    type="submit"
                    disabled={updating}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="rounded-lg bg-slate-200 px-4 py-2 text-slate-700"
                  >
                    Cancel
                  </button>

                </div>
              </form>

            ) : (

              // RECIPE DETAILS
              <>
                <h3 className="text-lg font-bold text-slate-800">
                  {recipe.name}
                </h3>

                <p className="mt-2 text-slate-500">
                  Cuisine: {recipe.cuisine || "Not specified"}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Prep time: {recipe.prepTimeMinutes ?? "N/A"} minutes
                </p>

                {/* EDIT AND DELETE BUTTONS */}
                <div className="mt-4 flex flex-wrap gap-2">

                  <button
                    onClick={() => handleEditClick(recipe)}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                  >
                    Edit Recipe
                  </button>

                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    disabled={deletingId === recipe.id}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === recipe.id
                      ? "Deleting..."
                      : "Delete Recipe"}
                  </button>

                </div>
              </>

            )}

          </div>

        ))}

      </div>

      {/* No results */}
      {filteredRecipes.length === 0 && (
        <p className="mt-6 text-slate-500">
          No recipes found. Try another name.
        </p>
      )}

    </main>
  );
}

export default ApiPractice;
