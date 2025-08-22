"use client";

import Link from "next/link";
import "../styles/_nav.scss";
import { CartProvider, useCart } from "../context/context";
import { useState, useEffect } from "react";
import Footer from "./footer";

function Nav() {
  const { cartQ } = useCart();
  const wpp = (numero, mensaje) => {
    const mensajeenc = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numero}?text=${mensajeenc}`, "_blank");
  };

  return (
    <header style={{ height: "70px" }}>
      <nav>
        <img
          className="logo"
          style={{ transform: "translateX(15px)" }}
          src="/lam.png"
          alt="Logo"
        />
        <ul className="ul_comp">
          <li>
            <a style={{ textDecoration: "none" }} href="/">
              Nosotros
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => {
                wpp("091910895", "hola!");
              }}
            >
              Contacto
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none" }} href="/productos">
              Antiguedades
            </a>
          </li>
        </ul>
        <ul className="ul_resp" style={{ marginTop: "-200px" }}>
          <li>
            <a style={{ textDecoration: "none" }} href="/">
              Nosotros
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                wpp("091910895", "hola!");
              }}
            >
              Contacto
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none", cursor: "pointer" }}
              href="/productos"
            >
              Antiguedades
            </a>
          </li>
        </ul>
        <img className="bars" src="/bar_3.png" width={30} height={30}></img>
        <div className="cart_cont">
          <p>{cartQ}</p>
          <Link href="/carrito">
            <img
              style={{ cursor: "pointer" }}
              src="/baul.png"
              width={35}
              height={35}
              alt="Carrito"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }) {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const bar = document.getElementsByClassName("bars")[0];
      const ul = document.getElementsByClassName("ul_resp")[0];
      if (!bar || !ul) return;

      const toggleMenu = () => {
        if (!isDown) {
          ul.style.marginTop = "190px";
          setIsDown(true);
        } else {
          ul.style.marginTop = "-1000px";
          setIsDown(false);
        }
      };

      bar.addEventListener("click", toggleMenu);

      // Limpieza
      return () => bar.removeEventListener("click", toggleMenu);
    }, 0); // Espera un ciclo de render

    return () => clearTimeout(timeout);
  }, [isDown]);

  return (
    <html lang="es">
      <head />
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
