# Ecommerce de Antigüedades 🛒

Este es un proyecto de práctica de un ecommerce de antigüedades desarrollado con Next.js. Permite a los usuarios explorar productos, agregarlos al carrito y pagar con Mercado Pago. También incluye un panel de administración básico para gestionar productos.

---

## Descripción

El objetivo de este proyecto fue crear un ecommerce funcional para practicar el desarrollo web completo, incluyendo frontend, backend, autenticación de usuarios y gestión de productos. Está pensado como proyecto personal de aprendizaje.

---

## Características

- Visualización de productos con imágenes y descripción.  
- Búsqueda y filtrado de productos.  
- Carrito de compras con manejo de cantidades.  
- Pago integrado con Mercado Pago (simulado o real según configuración).  
- Sistema de login y cookies para autenticación.  
- Panel de administración para agregar, editar y eliminar productos.  
- Responsive y fácil de usar.  

---

## Tecnologías utilizadas

- **Frontend:** Next.js  
- **Backend:** Node.js  
- **Base de datos:**  
- **Autenticación:** Cookies  
- **Estilos:** CSS/SCSS  
- **Pasarela de pagos:** Mercado Pago  

---

## Instalación

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/tuusuario/ecommerce-antiguedades.git

## Instalar Dependencias
- **npm install

## Levantar proyecto
  npm run dev

## Abrir en el navegador
  http://localhost:3000/

## Panel de Administrador
 path: /panel/create - permite crear productos ( ruta protegida ).

## Variables de Entorno

 MONGOURL = URL a la base de datos MongoDB
 ACCES_TOKEN = Token de acceso de mercado libre.
 USER = Usuario del administrador.
 PASSWORD = Contraseña del administrador.
 KEY = Clave de firmado de las cookies. 