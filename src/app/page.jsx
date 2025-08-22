"use client";

import Image from "next/image";
import "../styles/_presentation.scss";
import { useEffect } from "react";

/*
cookies admin
readme
*/

export default function Main() {
  const wpp = (numero, mensaje) => {
    const mensajeenc = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numero}?text=${mensajeenc}`, "_blank");
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    const elements = document.querySelectorAll(".appear");
    elements.forEach(
      (elemento) => {
        observer.observe(elemento);
      },
      {
        rootMargin: "0px", // Ajusta el margen si lo deseas
        threshold: 0.3, // Activar cuando el 10% del elemento sea visible
      }
    );
  }, []);

  return (
    <div className="global">
      <div className="presentation">
        <Image
          alt="statue"
          height={500}
          width={350}
          src="/godess.png"
          className="hidden appear"
        ></Image>
        <div className="text_cont hidden appear">
          <h1>Bienvenido/a a Lamiroca Antguedades</h1>
          <p>
            Nuestra casa de antigüedades es un refugio para los amantes de la
            historia y el encanto atemporal. Cada pieza que encontrará aquí ha
            sido cuidadosamente seleccionada, no solo por su belleza, sino por
            la historia que guarda y el alma que transmite.{" "}
          </p>
          <button
            onClick={() => {
              window.location.href = "/productos";
            }}
          >
            Explorar
          </button>
        </div>
      </div>
      <div className="services">
        <div className="service">
          <Image
            alt="personas restaurando antiguedad"
            width={250}
            height={250}
            src="/rest.jpg"
            className="hidden appear"
          ></Image>
          <div className="text_cont">
            <h3 className="hidden appear">Restauraciones</h3>
            <p className="hidden appear">
              Realizamos restauraciones en antiguedades de todo material, año y
              estado.
            </p>
          </div>
        </div>
        <div className="service">
          <Image
            alt="calculadora"
            className="hidden appear"
            width={250}
            height={250}
            src="/taz.jpg"
          ></Image>
          <div className="text_cont">
            <h3 className="hidden appear">Tazaciones</h3>
            <p className="hidden appear">
              Contactanos para saber el precio de tu objeto, ¿es adorno o una
              joya invaluable?, nosotros lo sabremos.
            </p>
          </div>
        </div>
        <div className="service">
          <Image
            alt="mazo"
            className="hidden appear"
            width={250}
            height={250}
            src="/sub.jpg"
          ></Image>
          <div className="text_cont">
            <h3 className="hidden appear">Subastas</h3>
            <p className="hidden appear">
              No te pierdas de nuestras subastas anuales y con ellas la
              posibiliad de comprar objetos invaluables a un bajo costo.
            </p>
          </div>
        </div>
      </div>
      <div className="intermedium_section">
        <p>
          Contactanos para saber acerca de nuestra metodologia, remates y
          enviós, los precios de las publicaciónes son negociables.
        </p>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            wpp("091910895", "Hola!");
          }}
        >
          Contactar
        </button>
      </div>
    </div>
  );
}
