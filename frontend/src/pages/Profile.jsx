import { useEffect, useMemo, useState } from "react";
import { mockOrders, mockProfile } from "../data/mockData.js";
import { getOrders, getProfile } from "../services/api.js";

const languageOptions = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
];

export default function Profile() {
  const [profile, setProfile] = useState(mockProfile);
  const [orders, setOrders] = useState(mockOrders);
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return mockProfile.language;
    }
    return window.localStorage.getItem("1st-shop-language") || mockProfile.language;
  });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [profileData, ordersData] = await Promise.all([
          getProfile(),
          getOrders(),
        ]);
        if (isMounted) {
          setProfile(profileData);
          setOrders(ordersData);
        }
      } catch (error) {
        if (isMounted) {
          setProfile(mockProfile);
          setOrders(mockOrders);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("1st-shop-language", language);
    }
  }, [language]);

  const loyaltyLabel = useMemo(() => profile.loyalty ?? "Classic", [profile]);

  return (
    <div className="px-6 pb-24 pt-8">
      <h1 className="text-lg font-semibold tracking-[0.2em]">Профиль</h1>
      <div className="mt-6 rounded-3xl border border-lux-sand bg-white p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Клиент</p>
        <h2 className="mt-2 text-lg font-semibold">{profile.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
        <p className="mt-3 text-xs text-gray-400">Уровень лояльности</p>
        <p className="text-sm font-semibold text-lux-gold">{loyaltyLabel}</p>
      </div>

      <div className="mt-6 rounded-3xl border border-lux-sand bg-white p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Язык</p>
        <div className="mt-4 grid gap-3">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => setLanguage(option.code)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                language === option.code
                  ? "border-lux-ink bg-lux-ink text-white"
                  : "border-lux-sand text-gray-500"
              }`}
            >
              <span>{option.label}</span>
              {language === option.code ? "✓" : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          История заказов
        </h2>
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-lux-sand bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className="rounded-full border border-lux-sand px-3 py-1 text-xs">
                  {order.status}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                {order.items.map((item) => (
                  <li key={item.name}>
                    {item.name} · {item.qty} шт.
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold">
                {order.total.toLocaleString("ru-RU")} ₽
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
