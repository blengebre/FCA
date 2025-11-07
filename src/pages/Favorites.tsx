import { useContext } from "react";
import { FavContext } from "../Context/FavContext";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Favorites() {
  const fav = useContext(FavContext);
  const navigate = useNavigate();
  const favorites = fav?.favorites || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft size={18} /> Back to Products
          </button>
        </div>

        {favorites.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-lg">No favorites yet 😢 — Add some from the products page.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-transform">
                <img src={item.image} alt={item.title} className="w-full h-48 object-contain mb-4 rounded-lg" />
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-green-500 font-bold mb-2">${item.price}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{item.category}</p>
                <div className="flex gap-2">
                  <Link to={`/product/${item.id}`} className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">View</Link>
                  <button onClick={() => fav?.toggleFavorite(item)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center transition-colors">
                    <Heart className="mr-1" size={18} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
