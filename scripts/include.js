document.addEventListener("DOMContentLoaded", async () => {
    const loadComponent = async (selector, url) => {
        const container = document.querySelector(selector)
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            container.innerHTML = html;
        } catch (err) {
            console.error(`Error cargando ${url}:`, err);
        }
    };

    await loadComponent("#header-placeholder", "/includes/header.html");
    await loadComponent("#footer-placeholder", "/includes/footer.html");

    // Aquí ya está cargado el header, ahora corre burguer.js
    const menuButton = document.getElementById("menu");
    const nav = document.getElementById("nav");

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuButton.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });
})
