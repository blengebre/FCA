import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FavContext } from "../Context/FavContext";
import axios from "axios";
import { Heart, ArrowLeft, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_BASE_URL = "https://dummyjson.com";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const fav = useContext(FavContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-300">
        Loading product...
      </p>
    );

  const isFav = fav?.favorites.some((f) => f.id === product.id);

  const handleFavorite = () => {
    fav?.toggleFavorite(product);
    toast.success(
      isFav
        ? "Removed from favorites!"
        : "Added to favorites!"
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-500"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-80 object-contain rounded-xl"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold mb-4">
              {product.category}
            </span>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-green-500 mb-2">
              ${product.price}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleFavorite}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
                isFav ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isFav ? (
                <>
                  <Heart className="inline mr-2" size={18} /> Remove from Favorites
                </>
              ) : (
                <>
                  <Heart className="inline mr-2" size={18} /> Add to Favorites
                </>
              )}
            </button>

            <Link
              to={`/edit-product/${product.id}`}
              className="w-full py-3 rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center gap-2"
            >
              <Edit size={18} /> Edit Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
