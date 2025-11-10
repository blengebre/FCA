import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://dummyjson.com";

interface ProductForm {
  title: string;
  description: string;
  price: number | "";
  stock: number | "";
  brand: string;
  category: string;
  image?: string;
}

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      brand: form.brand,
      category: form.category,
      thumbnail: form.image || "https://via.placeholder.com/150",
    };
    await axios.post(`${API_BASE_URL}/products/add`, payload);

    toast.success("✅ Product added successfully!"); // <-- Toast added here

    navigate("/"); // Redirect to home or products page
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to add product."); // <-- Error toast
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 dark:text-white">
      
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <select name="category" value={form.category} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select Category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
          </select>
        </div>
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button type="submit" disabled={loading} className={`w-full py-3 mt-4 rounded-xl font-bold text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} transition-colors`}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

