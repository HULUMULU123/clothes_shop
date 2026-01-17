import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="group rounded-3xl bg-white shadow-soft overflow-hidden border border-lux-sand">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-2 text-lg shadow"
          aria-label="Добавить в избранное"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          {product.brand}
        </p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="mt-2 text-base font-medium text-lux-ink">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </span>
          <span className="rounded-full bg-lux-mist px-3 py-1 text-xs text-gray-500">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
