"use client";

import { useEffect, useState } from "react";
import productClass from "../../handler/product.handler";
import "../../styles/_products.scss";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [doc, setDoc] = useState({ hasPrevPage: false, hasNextPage: false });
  const [categories, setCategories] = useState([]);
  const [regexValue, setRegexValue] = useState();
  const [type, setType] = useState("none");
  const [value, setValue] = useState();

  useEffect(() => {
    const getFunction = async () => {
      const getP = await productClass.getFiltered(page, value, type);
      setProducts(getP.PRODUCTS.docs);
      setPage(getP.PRODUCTS.page);
      setDoc(getP.PRODUCTS);
    };
    getFunction();
  }, [page, value]);

  useEffect(() => {
    const getFunction = async () => {
      const getP = await productClass.getFiltered(page, value, type);
      setCategories(getP.categories);
    };
    getFunction();
  }, []);

  const handlePage = (page) => {
    setPage(page);
  };

  const filter = async (event) => {
    if (event.target.value === undefined) {
      setType("category");
      setValue(event.target.id);
      setPage(1);
    } else {
      setType("category");
      setValue(event.target.value);
      setPage(1);
    }
  };

  const regexChangue = (event) => {
    const value = event.target.value;
    setRegexValue(value);
  };

  const searchRegex = async () => {
    setPage(1);
    setType("regex");
    setValue(regexValue);
  };

  return (
    <div className="products">
      <div className="filters">
        <div className="search">
          <input onChange={regexChangue} placeholder="Buscar"></input>
          <img
            onClick={searchRegex}
            width={30}
            height={30}
            src="/lupa.png"
          ></img>
        </div>
        <select onChange={filter} id="filter">
          {categories.length > 0 &&
            categories.map((item) => (
              <option key={item} value={item} id={item}>
                {item}
              </option>
            ))}
        </select>
        <div className="cat">
          {categories.length > 0 &&
            categories.map((item) => (
              <div className="op" key={item}>
                <p onClick={filter} key={item} value={item} id={item}>
                  {item}
                </p>
                <img src="/arrow_2.png"></img>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="products_cont">
          {products.length > 0
            ? products.map((item) => (
                <div className="item" key={item._id}>
                  <img
                    alt="antiguedad"
                    loading="lazy"
                    src={item.images[0].image}
                  ></img>
                  <div className="data_product">
                    <p className="name">{item.name}</p>
                    <p className="description">{item.description}</p>
                    <p className="price">${item.price} UYU</p>
                    <button
                      onClick={() => {
                        window.location.href = `/productos/${item._id}`;
                      }}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              ))
            : "no existe"}
        </div>
        <div className="buttons">
          {doc.hasPrevPage ? (
            <button
              onClick={() => {
                handlePage(doc.prevPage);
              }}
            >
              {doc.prevPage}
            </button>
          ) : (
            ""
          )}
          <button className="actualPage">{page}</button>
          {doc.hasNextPage ? (
            <button
              onClick={() => {
                handlePage(doc.nextPage);
              }}
            >
              {doc.nextPage}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
