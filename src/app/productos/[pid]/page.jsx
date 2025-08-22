"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import productClass from "../../../handler/product.handler";
import "../../../styles/_id.scss";
import "swiper/css";
import "swiper/css/navigation"; // si usás navegación
import "swiper/css/pagination"; // si usás paginación
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCart } from "../../../context/context";
import Swal from "sweetalert2";

export default function ByPid() {
  const { pid } = useParams();
  const [product, setProduct] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [slides, setSlides] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { setCartQ, cartQ } = useCart();

  const wpp = (numero, mensaje) => {
    const mensajeenc = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numero}?text=${mensajeenc}`, "_blank");
  };

  useEffect(() => {
    const byPid = async () => {
      const get = await productClass.getByPid(pid);
      setProduct(get.PRODUCT);
      setMainImage(get.PRODUCT.images[0].image);
      const lengthImages = parseInt(Object.keys(get.PRODUCT.images).length);
      if (lengthImages > 3) {
        setSlides(3);
      } else {
        setSlides(parseInt(Object.keys(get.PRODUCT.images).length));
      }
    };
    byPid();
  }, []);

  const changueMain = (image) => {
    setMainImage(image);
  };

  const addToCart = (event) => {
    const verify = localStorage.getItem("lamiroca_cart");
    if (!verify && quantity > 0) {
      const cartArray = [];
      const productObject = {
        id: event.target.id,
        quantity: quantity,
        image: mainImage,
        name: product.name,
        price: product.price,
      };
      cartArray.push(productObject);
      setCartQ((prev) => prev + 1);
      localStorage.setItem("lamiroca_cart", JSON.stringify(cartArray));
    } else if (quantity > 0) {
      const cartParsed = JSON.parse(verify);
      const find = cartParsed.find((item) => item.id === event.target.id);
      if (!find) {
        const productObject = {
          id: event.target.id,
          quantity: quantity,
          image: mainImage,
          name: product.name,
          price: product.price,
        };
        cartParsed.push(productObject);
        setCartQ((prev) => prev + 1);
        localStorage.setItem("lamiroca_cart", JSON.stringify(cartParsed));
      } else {
        const index = cartParsed.findIndex(
          (item) => item.id === event.target.id
        );
        cartParsed[index].quantity = quantity;
        localStorage.setItem("lamiroca_cart", JSON.stringify(cartParsed));
      }
    } else {
      Swal.fire("Añade un producto al carrito");
    }
  };

  const add = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity(quantity);
    }
  };

  const del = () => {
    if (quantity != 0 && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="product_ById">
      <div className="product_container">
        <div className="images">
          {product.images && <img className="mainImage" src={mainImage}></img>}
          <div className="sub_images">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0.6}
              slidesPerView={slides}
              navigation
              pagination={{ clickable: true }}
            >
              {product.images &&
                product.images.map((item, index) => (
                  <SwiperSlide key={item._id || index}>
                    <img
                      onClick={() => {
                        changueMain(item.image);
                      }}
                      src={item.image}
                      alt={`imagen ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className="info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p style={{ color: "green" }}>${product.price} UYU</p>
          <div style={{ display: "flex" }}>
            <img
              style={{ transform: "translateY(11px) translateX(-5px)" }}
              width={30}
              height={30}
              src="/wpp.png"
            ></img>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                wpp("091910895", `Hola!, me interesa ${product.name}`);
              }}
            >
              {" "}
              Consultanos{" "}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              paddingLeft: "0px",
            }}
            className="buttons_q"
          >
            <button onClick={del}>{"-"}</button>
            {quantity}
            <button onClick={add}>{"+"}</button>
          </div>
          <button
            id={product._id}
            onClick={addToCart}
            style={{
              padding: "6px",
              paddingBottom: "10px",
              paddingRight: "15px",
            }}
          >
            Agregar al Baúl
            <img
              style={{ transform: "translateX(8px) translateY(3px)" }}
              width={20}
              height={20}
              src="/baul.png"
            ></img>
          </button>
          <p>Año de Origen: {product.year}</p>
          <p>País de Origen: {product.country}</p>
          <p>Categoria: {product.category}</p>
          <p>
            Medidas: {product.height} x {product.width}{" "}
          </p>
          <p>Peso: {product.weight} </p>
          <p>Material: {product.material} </p>
          <p>Estado: {product.state} </p>
          <p>Stock: {product.stock} </p>
        </div>
      </div>
    </div>
  );
}
