import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "../types/hooks"; // Typed selector

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

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const darkMode = useAppSelector((state) => state.ui.darkMode);

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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        const p = res.data;
        setForm({
          title: p.title || "",
          description: p.description || "",
          price: p.price || "",
          stock: p.stock || "",
          brand: p.brand || "",
          category: p.category || "",
          image: p.thumbnail || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product details.");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

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
      await axios.patch(`${API_BASE_URL}/products/${id}`, payload);
      toast.success("Product updated successfully!");
      navigate(`/product/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-20">Loading product...</p>;

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className={`max-w-2xl mx-auto space-y-4 p-6 rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
          <select name="category" value={form.category} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600">
            <option value="">Select Category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
          </select>
        </div>
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />

        <button type="submit" disabled={loading} className={`w-full p-3 rounded-xl font-bold text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

