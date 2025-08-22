"use client";

import { useEffect, useState } from "react";
import "../../styles/_cart.scss";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import productClass from "../../handler/product.handler";
import { useCart } from "../../context/context";

export default function Cart() {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const [preferenceId, setpreferenceId] = useState();
  const { setCartQ, cartQ } = useCart();
  initMercadoPago("APP_USR-c7585f35-a932-4cf4-8929-852f805bb4b7", {
    locale: "es-UY",
  });

  useEffect(() => {
    const getCart = localStorage.getItem("lamiroca_cart");
    if (!getCart) {
      return;
    } else {
      const cartParsed = JSON.parse(getCart);
      setCart(cartParsed);
    }
  }, []);

  useEffect(() => {
    const getCart = localStorage.getItem("lamiroca_cart");
    if (!getCart) {
      return;
    } else {
      const parsed = JSON.parse(getCart);
      const array = [];
      parsed.forEach((element) => {
        array.push(element.price);
      });
      const suma = array.reduce(
        (acumulador, valorActual) => acumulador + valorActual,
        0
      );
      setTotal(suma);
    }
  }, []);

  const deleteFromCart = (event) => {
    const getCart = localStorage.getItem("lamiroca_cart");
    if (!getCart) {
      alert("nada");
    } else {
      const parsed = JSON.parse(getCart);
      const pIndex = parsed.findIndex((item) => item.id === event.target.id);
      parsed.splice(pIndex, 1);
      localStorage.setItem("lamiroca_cart", JSON.stringify(parsed));
      setCartQ((prev) => prev - 1);
      window.location.reload();
    }
  };

  const deleteAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const buy = async () => {
    const getCart = localStorage.getItem("lamiroca_cart");
    const parsed = JSON.parse(getCart);
    const getId = await productClass.pay(parsed);
    if (getId) {
      setpreferenceId(getId.preferenceId);
    }
  };

  return (
    <div className="cart">
      <div className="cart_container">
        {cart ? (
          cart.map((item) => (
            <div className="cart_item" key={item.id}>
              <div className="data_cont">
                <img src={item.image}></img>
                <div className="data">
                  <h3>{item.name}</h3>
                  <p style={{ color: "green" }} className="price">
                    ${item.price} UYU
                  </p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              </div>
              <img
                onClick={deleteFromCart}
                className="delete_img"
                src="/delete.png"
              ></img>
            </div>
          ))
        ) : (
          <p>No hay productos</p>
        )}
        <div className="options">
          <p>Total: ${total}</p>
          <div className="data">
            <img width={26} onClick={deleteAll} src="/delete.png"></img>
            <button onClick={buy}>Comprar</button>
            {preferenceId && (
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )}
          </div>
        </div>
      </div>
      <div className="intermedium_section">
        <p>
          Contactanos para saber acerca de nuestra metodologia, remates y
          enviós, los precios de las publicaciónes son negociables.
        </p>
        <button>Contactar</button>
      </div>
    </div>
  );
}
