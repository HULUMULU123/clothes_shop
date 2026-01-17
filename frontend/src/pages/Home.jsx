import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { mockProducts } from "../data/mockData.js";
import { getProducts } from "../services/api.js";

const categories = ["Все", "Новая коллекция", "Бестселлеры", "Лето", "Вечерняя линия"];

export default function Home() {
  const [products, setProducts] = useState(mockProducts);
  const [activeCategory, setActiveCategory] = useState("Все");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const items = await getProducts();
        if (items.length && isMounted) {
          setProducts(items);
        }
      } catch (error) {
        if (isMounted) {
          setProducts(mockProducts);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "Все") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="space-y-6 pb-24">
      <header className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-full border border-lux-sand bg-white px-4 py-2 text-xs"
          >
            Категории ▾
          </button>
          <h1 className="text-lg font-semibold tracking-[0.3em]">1ST-Shop</h1>
          <button type="button" className="text-xl">
            ⌕
          </button>
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] ${
                activeCategory === category
                  ? "border-lux-ink bg-lux-ink text-white"
                  : "border-lux-sand bg-white text-gray-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <section className="px-6">
        <div className="relative overflow-hidden rounded-[32px] shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1472417583565-62e7bdeda490?auto=format&fit=crop&w=1200&q=80"
            alt="Коллекция"
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute left-6 top-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em]">Весна — Лето</p>
            <h2 className="mt-2 text-2xl font-semibold">1ST Atelier</h2>
            <p className="mt-2 text-sm text-white/80">
              Премиальная база для утонченных образов.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          Бренды
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {["Brioni", "Hermes", "Zegna", "Loro Piana"].map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center rounded-3xl border border-lux-sand bg-lux-mist px-6 py-10 text-sm font-semibold"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          Избранная подборка
        </h2>
        <div className="mt-4 grid gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
