import { Routes, Route } from "react-router-dom";
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

function App() {

  const darkMode = useAppSelector((state) => state.ui.darkMode);
  return (
  
    <>
       <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Shop</h1>
          <DarkModeToggle />
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
    
    </>
  );
}

export default App;
