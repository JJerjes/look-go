document.addEventListener("DOMContentLoaded", async () => {
    const productosGuardados = localStorage.getItem("productosSeleccionados");
    window.productosSeleccionados = productosGuardados ? JSON.parse(productosGuardados) : [];

    // controlarVisibilidadModal();

    const contenedor = document.getElementById("contenedor-productos");
    const basePath = window.basePath || ""; // Definido en el HTML

    const path = window.location.pathname;
    let categoria = '';

    if (path.includes('capuchas')) {
        categoria = 'capuchas';
    } else if (path.includes('lenceria')) {
        categoria = 'lencerias';
    } else if (path.includes('moda')) {
        categoria = 'modas';
    } else {
        console.error('No se pudo determinar la categoría desde la URL');
        contenedor.innerHTML = '<p>Categoría no encontrada.</p>';
        return;
    }

    try {

        console.log('fetch URL:', `${basePath}data/${categoria}.json`);

        // Usa basePath también en el fetch para asegurar compatibilidad
        const respuesta = await fetch(`${basePath}data/${categoria}.json`);
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

            // Usa basePath para la imagen también
            card.innerHTML = `
                <img src="${basePath}${producto.imagen}" alt="${producto.nombre}" class="catalogo-img">
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

            const botonElegir = card.querySelector('.button-capucha');
            botonElegir.addEventListener('click', () => {
                agregarProductoSeleccionado(producto)
            });
        });

        actualizarListaSeleccionados()

    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    }
});

function agregarProductoSeleccionado(producto) {
    window.productosSeleccionados.push(producto);
    localStorage.setItem("productosSeleccionados", JSON.stringify(window.productosSeleccionados));
    actualizarListaSeleccionados();
}

function actualizarListaSeleccionados() {
    const lista = document.querySelector('#lista-seleccionados');
    const totalElemento = document.querySelector('#total-precio');

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";
    let total = 0;

    window.productosSeleccionados.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - S/ ${producto.precio.toFixed(2)}
            <button class="eliminar-producto" data-index="${index}">✕</button>
        `;
        lista.appendChild(li);
        total += producto.precio;
    });

    totalElemento.textContent = `Total: S/ ${total.toFixed(2)}`;

    document.querySelectorAll(".eliminar-producto").forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = Number(e.target.getAttribute('data-index'));
            window.productosSeleccionados.splice(index, 1);
            localStorage.setItem("productosSeleccionados", JSON.stringify(window.productosSeleccionados));
            actualizarListaSeleccionados();
            // controlarVisibilidadModal();
        });
    });
    // controlarVisibilidadModal();
    if (window.mostrarModal) window.mostrarModal();

}
