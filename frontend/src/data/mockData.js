export const mockProducts = [
  {
    id: 1,
    slug: "cashmere-suit-coffee",
    name: "Кашемировый костюм 1ST",
    brand: "1ST Atelier",
    price: 32900,
    currency: "₽",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    colors: ["Коричневый", "Графит", "Молочный"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Мягкий кашемир с архитектурным силуэтом и продуманной посадкой.",
    category: "Новая коллекция",
  },
  {
    id: 2,
    slug: "merino-polo-midnight",
    name: "Поло из мериноса Midnight",
    brand: "Zegna",
    price: 18400,
    currency: "₽",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    colors: ["Синий", "Слоновая кость"],
    sizes: ["M", "L", "XL", "2XL"],
    description: "Легкая мериносовая пряжа, идеально для многослойных образов.",
    category: "Бестселлеры",
  },
  {
    id: 3,
    slug: "silk-slip-dress",
    name: "Шелковое платье Slip",
    brand: "Loro Piana",
    price: 47900,
    currency: "₽",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    colors: ["Шампань", "Черный"],
    sizes: ["XS", "S", "M"],
    description: "Безупречный сатин с мягким блеском, созданный для вечерних выходов.",
    category: "Вечерняя линия",
  },
  {
    id: 4,
    slug: "linen-set-white",
    name: "Льняной сет Riviera",
    brand: "Brioni",
    price: 25600,
    currency: "₽",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
    colors: ["Белый", "Песочный"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Архитектурная простота и воздухопроницаемость для летнего сезона.",
    category: "Лето",
  },
];

export const mockOrders = [
  {
    id: "ORD-1042",
    date: "2024-08-12",
    status: "Доставлен",
    total: 51300,
    items: [
      { name: "Кашемировый костюм 1ST", qty: 1 },
      { name: "Поло из мериноса Midnight", qty: 1 },
    ],
  },
  {
    id: "ORD-1033",
    date: "2024-06-28",
    status: "В пути",
    total: 47900,
    items: [{ name: "Шелковое платье Slip", qty: 1 }],
  },
];

export const mockProfile = {
  name: "Арина Волкова",
  email: "arina@1st-shop.ru",
  language: "ru",
  loyalty: "Black",
};
