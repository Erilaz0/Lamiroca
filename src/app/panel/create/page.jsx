"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Swal from "sweetalert2";
import productClass from "../../../handler/product.handler.js";

const CLOUD_NAME = "ddrymuqfl";
const UPLOAD_PRESET = "dm_images";

export default function CreateAntique() {
  const { register, handleSubmit, reset } = useForm();
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Selecciona al menos una imagen");

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (!data.secure_url) {
          Swal.fire({
            text: "Error al subir una imagen",
            icon: "error",
            confirmButtonText: "Ok",
          });
          return;
        }

        uploadedUrls.push(data.secure_url);
      } catch (error) {
        Swal.fire({
          text: "Error al subir imagen",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }

    setImageUrls(uploadedUrls);
    Swal.fire({
      text: "Todas las imágenes fueron subidas correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const onSubmit = async (data) => {
    if (imageUrls.length === 0) {
      Swal.fire({
        text: "Sube al menos una imagen antes de enviar",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    const antique = {
      ...data,
      images: imageUrls.map((url) => ({ image: url })),
      createdAt: new Date().toISOString(),
      views: 0,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(antique),
      });

      if (res.ok) {
        Swal.fire({
          text: "Antique creado correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
        setFiles([]);
        setImageUrls([]);
      } else {
        Swal.fire({
          text: "Error al crear el producto",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      Swal.fire({
        text: "Error del servidor",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const onSubmitLogin = async (data) => {
    const login = await productClass.handleLogin(data.user, data.password);
    if (login.message && login.message === "200OK") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  };

  return (
    <div>
      {authorized === true && (
        <div style={{ margin: "auto", padding: 20, minHeight: "1000px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              gap: "20px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="photo_icon" style={{ cursor: "pointer" }}>
              <Image
                alt="add_photo_icon"
                src="/add_photo.png"
                width={80}
                height={80}
              />
            </label>
            <input
              id="photo_icon"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <button type="button" onClick={handleUpload}>
              Subir imágenes
            </button>

            <input
              placeholder="Nombre"
              {...register("name", { required: true })}
            />
            <input
              placeholder="Descripción"
              {...register("description", { required: true })}
            />
            <input
              placeholder="Año"
              type="number"
              {...register("year", { valueAsNumber: true })}
            />
            <input placeholder="País" {...register("country")} />
            <input placeholder="Categoría" {...register("category")} />
            <input
              placeholder="Precio"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />

            <input
              placeholder="Alto (cm)"
              type="number"
              {...register("height", { valueAsNumber: true })}
            />
            <input
              placeholder="Ancho (cm)"
              type="number"
              {...register("width", { valueAsNumber: true })}
            />
            <input
              placeholder="Peso (kg)"
              type="number"
              {...register("weight", { valueAsNumber: true })}
            />
            <input placeholder="Material" {...register("material")} />
            <input placeholder="Estado" {...register("state")} />
            <input
              placeholder="Vistas"
              type="number"
              {...register("views", { valueAsNumber: true })}
            />
            <input
              placeholder="Stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />

            <button type="submit" style={{ marginTop: 10 }}>
              Crear Antique
            </button>
          </form>
        </div>
      )}
      {authorized === false && (
        <div style={{ minHeight: "1000px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "300px",
              gap: "10px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <input placeholder="USUARIO" {...register("user")}></input>
            <input placeholder="CONTRASEÑA" {...register("password")}></input>
            <button
              style={{
                width: "80px",
                backgroundColor: "rgb(200, 80, 80)",
                color: "#ffffff",
              }}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
