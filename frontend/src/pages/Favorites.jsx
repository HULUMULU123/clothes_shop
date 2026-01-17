import { useShop } from "../context/ShopContext.jsx";

export default function Favorites() {
  const { favorites, toggleFavorite } = useShop();

  return (
    <div className="px-6 pb-24 pt-8">
      <h1 className="text-lg font-semibold tracking-[0.2em]">Избранное</h1>
      <p className="mt-2 text-sm text-gray-500">
        Ваш персональный бутик с сохраненными образами.
      </p>

      <div className="mt-6 space-y-4">
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-lux-sand p-8 text-center text-sm text-gray-500">
            Пока нет избранных товаров. Добавьте понравившиеся позиции.
          </div>
        ) : (
          favorites.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-3xl border border-lux-sand bg-white p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {product.brand}
                </p>
                <h3 className="mt-1 text-sm font-semibold">{product.name}</h3>
                <p className="mt-2 text-xs text-gray-500">
                  {product.price.toLocaleString("ru-RU")} {product.currency}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                className="rounded-full border border-lux-sand px-3 py-1 text-xs"
              >
                Убрать
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
