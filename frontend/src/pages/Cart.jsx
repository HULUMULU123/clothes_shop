import { useMemo } from "react";
import { useShop } from "../context/ShopContext.jsx";

export default function Cart() {
  const { cart, removeFromCart } = useShop();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cart]
  );

  return (
    <div className="px-6 pb-24 pt-8">
      <h1 className="text-lg font-semibold tracking-[0.2em]">Корзина</h1>
      <p className="mt-2 text-sm text-gray-500">
        Проверьте размеры, цвет и количество перед оформлением.
      </p>

      <div className="mt-6 space-y-4">
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-lux-sand p-8 text-center text-sm text-gray-500">
            Корзина пуста. Добавьте вещи из каталога.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-4 rounded-3xl border border-lux-sand bg-white p-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.product.name}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Цвет: {item.variant.color} · Размер: {item.variant.size}
                </p>
                <p className="mt-2 text-xs text-gray-500">Кол-во: {item.qty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {(item.product.price * item.qty).toLocaleString("ru-RU")} ₽
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.key)}
                  className="mt-2 text-xs text-gray-400"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-lux-sand bg-lux-mist p-6">
        <div className="flex items-center justify-between text-sm">
          <span>Итого</span>
          <span className="text-lg font-semibold">
            {total.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-full bg-lux-ink py-3 text-sm uppercase tracking-[0.3em] text-white"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
