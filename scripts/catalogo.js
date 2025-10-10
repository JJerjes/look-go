document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-productos");

    const path = window.location.pathname;
    let categoria = '';

    if (path.includes('capuchas')) {
        categoria = 'capuchas';
    } else if (path.includes('lenceria')) {
        categoria = 'lencerias';
    } else if (path.includes('moda')) {
        categoria = 'modas';
    } else {
        console.error('No se pudo determinar la categoria desde la URL');
        contenedor.innerHTML = '<p>Categoría no encontrada.</p>'
        return;
    }

    try {
        const respuesta = await fetch(`/data/${categoria}.json`);
        const productos = await respuesta.json();

        productos.forEach(producto => {
            const card = document.createElement("article");
            card.classList.add("producto");

            const ofertaHTML = producto.oferta
                ? `<span class="etiqueta-oferta">OFERTA</span>`
                : "";

            const precioAnteriorHTML = producto.precioAnterior
                ? `<span class="precio-anterior">S/ ${producto.precioAnterior.toFixed(2)}</span>`
                : "";

            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="catalogo-img">
                ${ofertaHTML}
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">
                    ${precioAnteriorHTML}
                    <span class="precio-actual">S/ ${producto.precio.toFixed(2)}</span>
                </p>
                <button class="button-capucha">Elegir</button>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    }
});
