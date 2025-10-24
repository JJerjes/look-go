// document.addEventListener("DOMContentLoaded", async () => {
//     const productosGuardados = localStorage.getItem("productosSeleccionados");
//     window.productosSeleccionados = productosGuardados ? JSON.parse(productosGuardados) : [];

//     // controlarVisibilidadModal();

//     const contenedor = document.getElementById("contenedor-productos");
//     const basePath = window.basePath || ""; // Definido en el HTML

//     const path = window.location.pathname;
//     let categoria = '';

//     if (path.includes('capuchas')) {
//         categoria = 'capuchas';
//     } else if (path.includes('lenceria')) {
//         categoria = 'lencerias';
//     } else if (path.includes('moda')) {
//         categoria = 'modas';
//     } else {
//         console.error('No se pudo determinar la categoría desde la URL');
//         contenedor.innerHTML = '<p>Categoría no encontrada.</p>';
//         return;
//     }

//     try {

//         console.log('fetch URL:', `${basePath}data/${categoria}.json`);

//         // Usa basePath también en el fetch para asegurar compatibilidad
//         const respuesta = await fetch(`${basePath}data/${categoria}.json`);
//         const productos = await respuesta.json();

//         productos.forEach(producto => {
//             const card = document.createElement("article");
//             card.classList.add("producto");

//             let etiquetaHTML = '';
//             if (producto.preventa) {
//                 etiquetaHTML = `<span class="etiqueta-preventa">PRE-VENTA</span>`;
//             } else if (producto.oferta) {
//                 etiquetaHTML = `<span class="etiqueta-oferta">NUEVO</span>`;
//             }

//             // const ofertaHTML = producto.oferta
//             //     ? `<span class="etiqueta-oferta">NUEVO</span>`
//             //     : "";

//             const precioAnteriorHTML = producto.precioAnterior
//                 ? `<span class="precio-anterior">S/ ${producto.precioAnterior.toFixed(2)}</span>`
//                 : "";

//             // Usa basePath para la imagen también
//             card.innerHTML = `
//                 <img src="${basePath}${producto.imagen}" alt="${producto.nombre}" class="catalogo-img">
//                 <h3>${producto.nombre}</h3>
//                 ${etiquetaHTML}
//                 <p class="descripcion">${producto.descripcion}</p>
//                 <p class="precio">
//                     ${precioAnteriorHTML}
//                     <span class="precio-actual">S/ ${producto.precio.toFixed(2)}</span>
//                 </p>
//                 ${producto.tallas ? `
//                     <label for="talla-${producto.id}" class="talla-label">Tallas:</label>
//                     <select id="talla-${producto.id}" class="select-talla">
//                         <option value="">Seleccione Talla</option>
//                         ${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
//                     </select>
//                 ` : ''}

//                 ${producto.stock !== undefined ? `
//                     <p class="stock">Stock disponible: <strong>${producto.stock}</strong></p>
//                     <label for="cantidad-${producto.id}">Cantidad:</label>

//                     <input type="number" id="cantidad-${producto.id}" class="cantidad-pedido" min="1" max="${producto.stock}" value="1">



//                 ` : ''}

//                 <button class="button-capucha">Elegir</button>
//             `;

//             contenedor.appendChild(card);

//             const botonElegir = card.querySelector('.button-capucha');
//             botonElegir.addEventListener('click', () => {
//                 const selectTalla = card.querySelector('.select-talla');
//                 const tallaSeleccionada = selectTalla ? selectTalla.value : null;

//                 if (selectTalla && !tallaSeleccionada) {
//                     alert('Por favor, seleccione una talla antes de agregar el producto.');
//                     return;
//                 }

//                 const inputCantidad = card.querySelector('.cantidad-pedido');
//                 const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

//                 if (cantidad < 1 || isNaN(cantidad)) {
//                     alert('Por favor, ingrese una cantidad válida.');
//                     return;
//                 }

//                 if (producto.preventa && (categoria === 'capuchas' || categoria === 'lenceria')) {
//                     const productoReserva = {
//                         ...producto,
//                         talla: tallaSeleccionada || null,
//                         cantidad,
//                         reserva: true,
//                         pagoAdelantado: producto.precio * cantidad * 0.5
//                     };
//                     agregarProductoSeleccionado(productoReserva);
//                     alert(`Has agregado una reserva de ${cantidad} unidad(es) de ${producto.nombre}.\nSe requiere un pago adelantado de S/ ${(producto.precio * cantidad * 0.5).toFixed(2)}.`);
//                     return;
//                 }

//                 // Verificar stock disponible considerando lo que ya tiene el cliente en el carrito
//                 const totalEnCarrito = window.productosSeleccionados
//                     .filter(p => p.id === producto.id && p.talla === tallaSeleccionada)
//                     .reduce((acc, p) => acc + p.cantidad, 0);

//                 const stockDisponible = producto.stock - totalEnCarrito;

//                 if (cantidad > stockDisponible) {
//                     alert(`No puedes agregar este producto.\nQuedan ${stockDisponible} productos en stock.`);
//                     return;
//                 }

//                 const productoConTallaYCantidad = { ...producto, talla: tallaSeleccionada || null, cantidad };
//                 agregarProductoSeleccionado(productoConTallaYCantidad);
//             });

//             // botonElegir.addEventListener('click', () => {
//             //     const selectTalla = card.querySelector('.select-talla');
//             //     const tallaSeleccionada = selectTalla ? selectTalla.value : null;

//             //     if (selectTalla && !tallaSeleccionada) {
//             //         alert('Por favor, seleccione una talla antes de agregar el producto.');
//             //         return;
//             //     }

//             //     if (producto.stock <= 0) {
//             //         alert('Este producto está agotado.');
//             //         return;
//             //     }

//             //     const productoConTalla = { ...producto, talla: tallaSeleccionada || null }
//             //     agregarProductoSeleccionado(productoConTalla);
//             // });
//         });

//         actualizarListaSeleccionados()

//     } catch (error) {
//         console.error("Error al cargar el catálogo:", error);
//         contenedor.innerHTML = "<p>Error al cargar productos.</p>";
//     }
// });

// function agregarProductoSeleccionado(producto) {
//     const seleccionados = window.productosSeleccionados;
//     // Revisar si ya existe el producto con la misma talla
//     const indiceExistente = seleccionados.findIndex(p => p.id === producto.id && p.talla === producto.talla);
//     if (indiceExistente > -1) {
//         seleccionados[indiceExistente].cantidad += producto.cantidad;
//     } else {
//         seleccionados.push(producto);
//     }
//     localStorage.setItem("productosSeleccionados", JSON.stringify(seleccionados));
//     actualizarListaSeleccionados();
// }


// // function agregarProductoSeleccionado(producto) {
// //     window.productosSeleccionados.push(producto);
// //     localStorage.setItem("productosSeleccionados", JSON.stringify(window.productosSeleccionados));
// //     actualizarListaSeleccionados();
// // }

// function actualizarListaSeleccionados() {
//     const lista = document.querySelector('#lista-seleccionados');
//     const totalElemento = document.querySelector('#total-precio');

//     if (!lista || !totalElemento) return;

//     lista.innerHTML = "";
//     let total = 0;

//     window.productosSeleccionados.forEach((producto, index) => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//             ${producto.nombre}${producto.talla ? ` (talla: ${producto.talla})` : ''} - ${producto.cantidad} unidad(es) - S/ ${(producto.precio * producto.cantidad).toFixed(2)}
//             <button class="eliminar-producto" data-index="${index}">✕</button>
//         `;
//         lista.appendChild(li);
//         total += producto.precio * producto.cantidad;
//     });

//     totalElemento.textContent = `Total: S/ ${total.toFixed(2)}`;

//     document.querySelectorAll(".eliminar-producto").forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             const index = Number(e.target.getAttribute('data-index'));
//             window.productosSeleccionados.splice(index, 1);
//             localStorage.setItem("productosSeleccionados", JSON.stringify(window.productosSeleccionados));
//             actualizarListaSeleccionados();
//             // controlarVisibilidadModal();
//         });
//     });
//     // controlarVisibilidadModal();
//     if (window.mostrarModal) window.mostrarModal();

// }

document.addEventListener("DOMContentLoaded", async () => {
    const productosGuardados = localStorage.getItem("productosSeleccionados");
    window.productosSeleccionados = productosGuardados ? JSON.parse(productosGuardados) : [];

    const contenedor = document.getElementById("contenedor-productos");
    const basePath = window.basePath || "";

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
        const respuesta = await fetch(`${basePath}data/${categoria}.json`);
        const productos = await respuesta.json();

        productos.forEach(producto => {
            const card = document.createElement("article");
            card.classList.add("producto");

            let etiquetaHTML = '';
            if (producto.preventa) {
                etiquetaHTML = `<span class="etiqueta-preventa">PRE-VENTA</span>`;
            } else if (producto.oferta) {
                etiquetaHTML = `<span class="etiqueta-oferta">NUEVO</span>`;
            }

            const precioAnteriorHTML = producto.precioAnterior
                ? `<span class="precio-anterior">S/ ${producto.precioAnterior.toFixed(2)}</span>`
                : "";

            // Mensaje informativo de pre-venta
            const infoPreventaHTML = producto.preventa ? `
                <p class="info-preventa">
                    Este producto es PRE-VENTA. Al realizar el pedido, se requiere un pago adelantado del 50%.
                    La información de pago será enviada por WhatsApp.
                </p>
            ` : '';

            card.innerHTML = `
                <img src="${basePath}${producto.imagen}" alt="${producto.nombre}" class="catalogo-img">
                <h3>${producto.nombre}</h3>
                ${etiquetaHTML}
                <p class="descripcion">${producto.descripcion}</p>
                ${infoPreventaHTML}
                <p class="precio">
                    ${precioAnteriorHTML}
                    <span class="precio-actual">S/ ${producto.precio.toFixed(2)}</span>
                </p>
                ${producto.tallas ? `
                    <label for="talla-${producto.id}" class="talla-label">Tallas:</label>
                    <select id="talla-${producto.id}" class="select-talla">
                        <option value="">Seleccione Talla</option>
                        ${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
                    </select>
                ` : ''}

                ${producto.stock !== undefined ? `
                    <p class="stock">Stock disponible: <strong>${producto.stock}</strong></p>
                    <label for="cantidad-${producto.id}">Cantidad:</label>
                    <input type="number" id="cantidad-${producto.id}" class="cantidad-pedido" min="1" max="${producto.stock}" value="1">
                ` : ''}

                <button class="button-capucha">Elegir</button>
            `;

            contenedor.appendChild(card);

            const botonElegir = card.querySelector('.button-capucha');
            botonElegir.addEventListener('click', () => {
                const selectTalla = card.querySelector('.select-talla');
                const tallaSeleccionada = selectTalla ? selectTalla.value : null;

                if (selectTalla && !tallaSeleccionada) {
                    alert('Por favor, seleccione una talla antes de agregar el producto.');
                    return;
                }

                const inputCantidad = card.querySelector('.cantidad-pedido');
                const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

                if (cantidad < 1 || isNaN(cantidad)) {
                    alert('Por favor, ingrese una cantidad válida.');
                    return;
                }

                if (producto.preventa) {
                    const pagoAdelantado = producto.precio * cantidad * 0.5;
                    const productoReserva = {
                        ...producto,
                        talla: tallaSeleccionada || null,
                        cantidad,
                        reserva: true,
                        pagoAdelantado
                    };
                    agregarProductoSeleccionado(productoReserva);
                    alert(`Has agregado una reserva de ${cantidad} unidad(es) de ${producto.nombre}.\nSe requiere un pago adelantado de S/ ${pagoAdelantado.toFixed(2)}.\nRecibirás la información de pago por WhatsApp.`);
                    return;
                }

                // Verificar stock disponible considerando lo que ya tiene el cliente en el carrito
                const totalEnCarrito = window.productosSeleccionados
                    .filter(p => p.id === producto.id && p.talla === tallaSeleccionada)
                    .reduce((acc, p) => acc + p.cantidad, 0);

                const stockDisponible = producto.stock - totalEnCarrito;

                if (cantidad > stockDisponible) {
                    alert(`No puedes agregar este producto.\nQuedan ${stockDisponible} productos en stock.`);
                    return;
                }

                const productoConTallaYCantidad = { ...producto, talla: tallaSeleccionada || null, cantidad };
                agregarProductoSeleccionado(productoConTallaYCantidad);
            });
        });

        actualizarListaSeleccionados();

    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    }
});

function agregarProductoSeleccionado(producto) {
    const seleccionados = window.productosSeleccionados;
    const indiceExistente = seleccionados.findIndex(p => p.id === producto.id && p.talla === producto.talla);
    if (indiceExistente > -1) {
        seleccionados[indiceExistente].cantidad += producto.cantidad;
    } else {
        seleccionados.push(producto);
    }
    localStorage.setItem("productosSeleccionados", JSON.stringify(seleccionados));
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
            ${producto.nombre}${producto.talla ? ` (talla: ${producto.talla})` : ''} - ${producto.cantidad} unidad(es) - S/ ${(producto.precio * producto.cantidad).toFixed(2)}
            <button class="eliminar-producto" data-index="${index}">✕</button>
        `;
        lista.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = `Total: S/ ${total.toFixed(2)}`;

    document.querySelectorAll(".eliminar-producto").forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = Number(e.target.getAttribute('data-index'));
            window.productosSeleccionados.splice(index, 1);
            localStorage.setItem("productosSeleccionados", JSON.stringify(window.productosSeleccionados));
            actualizarListaSeleccionados();
        });
    });

    if (window.mostrarModal) window.mostrarModal();
}
