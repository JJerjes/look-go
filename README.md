# 🛍️ Look & Go | Plataforma de E-commerce Multi-Categoría

**[Logo de Look & Go, si ya lo tienes]**

Una tienda virtual moderna y responsiva especializada en la venta de **Lencería**, **Carteras**, **Billeteras** y  **Capuchas** para mujeres. Desarrollada con un enfoque **Mobile First** para garantizar una experiencia de usuario óptima en cualquier dispositivo.

---

## 🎯 Objetivos del Proyecto

* Establecer una plataforma de comercio electrónico funcional y escalable.
* Implementar un diseño **Mobile First** con **CSS Grid/Flexbox** y **Media Queries (`min-width`)** para una total adaptabilidad.
* Simplificar el proceso de compra utilizando un **"Guest Checkout"** (compra como invitado) para maximizar la conversión inicial.
* Aplicar buenas prácticas de programación y separación de responsabilidades (Frontend y Backend).

---

## 💻 Pila Tecnológica (Tech Stack)

| Componente | Tecnología | Notas |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3 | Diseño Responsivo (`min-width`), Normalize.css. |
| **Backend** | Python (Framework: [Django / Flask]) | Gestión de lógica de negocio, manejo de sesiones. |
| **Base de Datos** | SQL ([PostgreSQL / MySQL]) | Almacenamiento de Productos, Pedidos y Detalles. |
| **Control de Versiones** | Git | Repositorio público para control de cambios. |

*(Nota: Remplaza `[Django / Flask]` y `[PostgreSQL / MySQL]` con la tecnología específica que elijas.)*

---

## 💾 Estructura de la Base de Datos (SQL - Resumen)

El proyecto utiliza tres tablas principales para el manejo de transacciones:

1.  **`Producto`**: Almacena información detallada de cada artículo (nombre, precio, stock, categoría).
2.  **`Pedido`**: Registra la información del cliente y la dirección de envío (Checkout como Invitado).
3.  **`DetallePedido`**: Enlaza los productos con los pedidos, registrando la cantidad y el precio final de cada artículo vendido.

---

## ⚙️ Guía de Inicio Rápido (Local Setup)

Sigue estos pasos para poner el proyecto en funcionamiento en tu máquina local:

1.  **Clonar el Repositorio:**
    ```bash
   git clone [https://github.com/JJerjes/look-go.git](https://github.com/JJerjes/look-go.git) 
   cd look-and-go
    ```
2.  **Instalar Dependencias de Python:**
    ```bash
    # Se asume el uso de un entorno virtual (venv)
    python -m venv venv
    source venv/bin/activate  # En Windows usa: venv\Scripts\activate
    pip install -r requirements.txt
    ```
3.  **Configurar Base de Datos:**
    * Asegúrate de tener tu servidor SQL ([PostgreSQL / MySQL]) corriendo.
    * Configura las credenciales en el archivo `settings.py`.
    * Ejecuta las migraciones (si usas Django):
        ```bash
        python manage.py makemigrations
        python manage.py migrate
        ```
4.  **Ejecutar el Servidor:**
    ```bash
    python manage.py runserver
    ```
    El sitio estará accesible en `http://127.0.0.1:8000/`.

---

## ✒️ Autor

**Junior** - Desarrollador de Look & Go.

---

## 📜 Licencia

Este proyecto está bajo la licencia [MIT / Apache / o tu elección].
