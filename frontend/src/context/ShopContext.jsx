import { createContext, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

const STORAGE_KEY = "1st-shop-state";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return { cart: [], favorites: [] };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { cart: [], favorites: [] };
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return { cart: [], favorites: [] };
  }
};

export function ShopProvider({ children }) {
  const [state, setState] = useState(getInitialState);

  const persist = (nextState) => {
    setState(nextState);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    }
  };

  const addToCart = (product, variant) => {
    const key = `${product.id}-${variant.color}-${variant.size}`;
    const existing = state.cart.find((item) => item.key === key);
    if (existing) {
      const updated = state.cart.map((item) =>
        item.key === key ? { ...item, qty: item.qty + 1 } : item
      );
      persist({ ...state, cart: updated });
      return;
    }
    const nextCart = [
      ...state.cart,
      {
        key,
        product,
        variant,
        qty: 1,
      },
    ];
    persist({ ...state, cart: nextCart });
  };

  const removeFromCart = (key) => {
    persist({
      ...state,
      cart: state.cart.filter((item) => item.key !== key),
    });
  };

  const toggleFavorite = (product) => {
    const exists = state.favorites.find((item) => item.id === product.id);
    if (exists) {
      persist({
        ...state,
        favorites: state.favorites.filter((item) => item.id !== product.id),
      });
      return;
    }
    persist({ ...state, favorites: [...state.favorites, product] });
  };

  const value = useMemo(
    () => ({
      cart: state.cart,
      favorites: state.favorites,
      addToCart,
      removeFromCart,
      toggleFavorite,
    }),
    [state]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
