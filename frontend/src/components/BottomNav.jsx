import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Главная", icon: "⌂" },
  { to: "/favorites", label: "Избранное", icon: "♡" },
  { to: "/cart", label: "Корзина", icon: "👜" },
  { to: "/profile", label: "Профиль", icon: "•" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur border-t border-lux-sand">
      <div className="mx-auto flex max-w-xl items-center justify-between px-6 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs tracking-wide ${
                isActive ? "text-lux-ink" : "text-gray-400"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
