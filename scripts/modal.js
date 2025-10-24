document.addEventListener("DOMContentLoaded", () => {
    let intentos = 0;
    const maxIntentos = 50;

    const esperarModal = setInterval(() => {
        const modal = document.getElementById('modal-seleccion');
        const barra = document.getElementById('barra-carrito');
        const btnMinimizar = document.getElementById('minimizar-modal');
        const btnRestaurar = document.getElementById('restaurar-modal');
        const btnHacerPedido = document.getElementById("hacer-pedido");

        if (modal && barra && btnMinimizar && btnRestaurar && btnHacerPedido) {
            clearInterval(esperarModal);

            function restaurarModal() {
                modal.style.display = 'block';
                barra.style.display = 'none';
            }

            function minimizarModal() {
                modal.style.display = 'none';
                barra.style.display = 'flex';
            }

            function controlarVisibilidadModal() {
                if (Array.isArray(window.productosSeleccionados) && window.productosSeleccionados.length > 0) {
                    restaurarModal();
                } else {
                    modal.style.display = 'none';
                    barra.style.display = 'none';
                }
            }

            btnMinimizar.addEventListener('click', minimizarModal);
            btnRestaurar.addEventListener('click', restaurarModal);

            btnHacerPedido.addEventListener('click', () => {
                const productos = Array.isArray(window.productosSeleccionados) ? window.productosSeleccionados : [];

                if (productos.length === 0) {
                    alert('No hay productos seleccionados para hacer el pedido.');
                    return;
                }

                localStorage.setItem('productosSeleccionados', JSON.stringify(productos));

                const totalTexto = document.getElementById('total-precio')?.innerText || '0';
                const total = parseFloat(totalTexto.replace(/[^\d.]/g, '')) || 0;
                localStorage.setItem('totalPrecio', total);

                const basePath = window.basePath || '/';
                window.location.href = basePath + "pages/formulario.html";
            });

            window.mostrarModal = restaurarModal;
            window.controlarVisibilidadModal = controlarVisibilidadModal;

            controlarVisibilidadModal();

        } else {
            if (++intentos >= maxIntentos) {
                clearInterval(esperarModal);
                console.warn('⚠️ No se pudo encontrar el modal o botones tras varios intentos.');
            } else {
                console.log('⏳ Esperando que el modal esté disponible en el DOM...');
            }
        }
    }, 100);
});
