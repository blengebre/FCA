import { useEffect, useState, useContext } from "react";
import { Heart, Plus } from "lucide-react";
import { FavContext } from "../Context/FavContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API_BASE_URL_ from "../services/Apic";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Product() {
  const fav = useContext(FavContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<string | number>("");
  const [maxPrice, setMaxPrice] = useState<string | number>("");
  const location = useLocation();

  function limitTitle(title: string) {
    return title.length > 25 ? title.substring(0, 20) + "..." : title;
  }

  function limitDesc(description: string) {
    return description.length > 100 ? description.substring(0, 80) + "..." : description;
  }

  // Fetch products
  useEffect(() => {
    axios.get(`${API_BASE_URL_}/products`)
      .then((res) => {
        setProducts(res.data.products || res.data);
        setAllProducts(res.data.products || res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter by query param category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam && allProducts.length) {
      setProducts(allProducts.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase()));
    } else if (!categoryParam && allProducts.length) {
      setProducts(allProducts);
    }
  }, [location.search, allProducts]);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setProducts(allProducts);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="font-bold text-4xl mb-2">Our Products</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Explore top-quality products at the best prices</p>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <li>
              <span className="font-semibold mb-1 block">Search</span>
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => {
                  const search = e.target.value.toLowerCase();
                  setProducts(allProducts.filter(p => p.title.toLowerCase().includes(search)));
                }}
                className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </li>

            {/* Categories */}
            <li>
              <span className="font-semibold mb-1 block">Category</span>
              <select
                className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => {
                  const value = e.target.value;
                  setProducts(value === "all" ? allProducts : allProducts.filter(p => p.category.toLowerCase() === value));
                }}
              >
                <option value="all">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
              </select>
            </li>

            {/* Sort */}
            <li>
              <span className="font-semibold mb-1 block">Sort By</span>
              <select
                className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => {
                  const sorted = [...allProducts];
                  if (e.target.value === "Name") sorted.sort((a, b) => a.title.localeCompare(b.title));
                  if (e.target.value === "a-z") sorted.sort((a, b) => a.price - b.price);
                  if (e.target.value === "z-a") sorted.sort((a, b) => b.price - a.price);
                  if (e.target.value === "rate") sorted.sort((a, b) => b.rating.rate - a.rating.rate);
                  setProducts(sorted);
                }}
              >
                <option value="Name">Name A-Z</option>
                <option value="a-z">Price Low-High</option>
                <option value="z-a">Price High-Low</option>
                <option value="rate">Rating</option>
              </select>
            </li>

            {/* Price */}
            <li>
              <span className="font-semibold mb-1 block">Price Range</span>
              <div className="flex gap-3 mt-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <button onClick={clearFilters} className="text-blue-600 dark:text-blue-400 underline mt-2">Clear Filters</button>
            </li>
          </ul>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const isFav = fav?.favorites.some(f => f.id === p.id);
            return (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-700 text-white">{p.category}</span>
                <img src={p.image || "https://via.placeholder.com/250"} alt={p.title} className="mt-3 w-full h-48 object-contain rounded-lg" />
                <Link to={`/product/${p.id}`} className="block text-lg font-bold mt-3 hover:underline">{limitTitle(p.title)}</Link>
                <p className="mt-1 text-green-500 font-bold text-lg">${p.price}</p>
                <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">{limitDesc(p.description)}</p>
                <div className="flex items-center mt-3 gap-2">
                  <Heart className={`cursor-pointer ${isFav ? "text-red-500" : "text-gray-400"}`} size={18} onClick={() => fav?.toggleFavorite(p)} />
                  <span>{isFav ? "Remove" : "Add"} to favorites</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Button */}
      <button onClick={() => navigate("/add-product")} className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  );
}

export default Product;
