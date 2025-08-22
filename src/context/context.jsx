"use client"; // necesario si usás Next.js App Router

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(0);
export const CartProvider = ({ children }) => {
  const [cartQ, setCartQ] = useState(0); // estado global

  useEffect(() => {
    const getCart = localStorage.getItem("lamiroca_cart");
    if (!getCart) {
      setCartQ(0);
    } else {
      const cartParsed = JSON.parse(getCart);
      if (cartParsed.length === 0) {
        setCartQ(0);
      } else {
        setCartQ(cartParsed.length);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartQ, setCartQ }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
