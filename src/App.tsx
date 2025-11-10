import { Routes, Route, Link } from "react-router-dom";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/productDetail";
import EditProduct from "./pages/EditProduct";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./types/hooks";
import DarkModeToggle from "../src/component/layout/DarkModeToggle";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import { Heart } from "lucide-react"; // ❤️ add this icon

function App() {
  const darkMode = useAppSelector((state) => state.ui.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <header className="p-4 flex justify-between items-center">
          {/* App Title */}
          <h1 className="text-2xl font-bold">My Shop</h1>

          {/* Right side links */}
          <div className="flex items-center gap-4">
            {/* 🖤 Favorites Link */}
            <Link
              to="/favorites"
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Heart size={18} /> Favorites
            </Link>

            {/* 🌙 Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </header>

        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Product />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/edit-product/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
