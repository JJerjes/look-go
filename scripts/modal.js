// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Esperar hasta que el modal esté presente en el DOM
    const esperarModal = setInterval(() => {
        const modal = document.getElementById('modal-seleccion');
        const barra = document.getElementById('barra-carrito');
        const btnMinimizar = document.getElementById('minimizar-modal');
        const btnRestaurar = document.getElementById('restaurar-modal');

        if (modal && barra && btnMinimizar && btnRestaurar) {
            clearInterval(esperarModal); // Ya están disponibles, detenemos la espera

            function restaurarModal() {
                modal.style.display = 'block';
                barra.style.display = 'none';
            }

            function minimizarModal() {
                modal.style.display = 'none';
                barra.style.display = 'flex';
            }

            function controlarVisibilidadModal() {
                if (window.productosSeleccionados && window.productosSeleccionados.length > 0) {
                    restaurarModal();
                } else {
                    modal.style.display = 'none';
                    barra.style.display = 'none';
                }
            }

            btnMinimizar.addEventListener('click', minimizarModal);
            btnRestaurar.addEventListener('click', restaurarModal);

            window.mostrarModal = restaurarModal;
            window.controlarVisibilidadModal = controlarVisibilidadModal;

            controlarVisibilidadModal();

        } else {
            // Si después de varios intentos no encuentra nada, detiene la espera
            console.log('⏳ Esperando que el modal esté disponible en el DOM...');
        }
    }, 100); // Revisa cada 100ms
});
