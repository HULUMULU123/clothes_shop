import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import { mockProducts } from "../data/mockData.js";
import { getProduct } from "../services/api.js";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useShop();
  const [product, setProduct] = useState(
    mockProducts.find((item) => item.slug === slug) || mockProducts[0]
  );
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const item = await getProduct(slug);
        if (isMounted) {
          setProduct(item);
          setSelectedColor(item.colors?.[0]);
          setSelectedSize(item.sizes?.[0]);
        }
      } catch (error) {
        const fallback = mockProducts.find((item) => item.slug === slug);
        if (fallback && isMounted) {
          setProduct(fallback);
          setSelectedColor(fallback.colors?.[0]);
          setSelectedSize(fallback.sizes?.[0]);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const isFavorite = useMemo(
    () => favorites.some((item) => item.id === product.id),
    [favorites, product]
  );

  const handleAdd = () => {
    addToCart(product, { color: selectedColor, size: selectedSize });
    navigate("/cart");
  };

  return (
    <div className="pb-24">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-80 w-full object-cover" />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 rounded-full bg-white/80 px-4 py-2 text-sm"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className="absolute right-4 top-4 rounded-full bg-white/80 px-4 py-2 text-sm"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="px-6 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          {product.brand}
        </p>
        <h1 className="mt-2 text-xl font-semibold">{product.name}</h1>
        <p className="mt-3 text-sm text-gray-500">{product.description}</p>
        <p className="mt-4 text-lg font-semibold">
          {product.price?.toLocaleString("ru-RU")} {product.currency}
        </p>
      </div>

      <div className="px-6">
        <div className="rounded-3xl border border-lux-sand bg-white p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Цвет</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colors?.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-4 py-2 text-xs ${
                  selectedColor === color
                    ? "border-lux-ink bg-lux-ink text-white"
                    : "border-lux-sand text-gray-500"
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gray-400">Размер</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.sizes?.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-4 py-2 text-xs ${
                  selectedSize === size
                    ? "border-lux-ink bg-lux-ink text-white"
                    : "border-lux-sand text-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-6 w-full rounded-full bg-lux-ink py-4 text-sm uppercase tracking-[0.3em] text-white"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
