import { Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx";
import Cart from "./pages/Cart.jsx";
import Favorites from "./pages/Favorites.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}
