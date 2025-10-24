document.addEventListener("DOMContentLoaded", async () => {
    const basePath = window.basePath || "";

    const loadComponent = async (selector, url) => {
        const container = document.querySelector(selector)
        try {
            const res = await fetch(basePath + url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let html = await res.text();
            if (basePath === "../") {
                html = html.replaceAll('href="index.html"', 'href="../index.html"');
                html = html.replaceAll('href="categorias/', 'href="../categorias/');
                html = html.replaceAll('href="styles/', 'href="../styles/');
                html = html.replaceAll('href="images/', 'href="../images/');

                html = html.replaceAll('src="scripts/', 'src="../scripts/');
                html = html.replaceAll('src="images/', 'src="../images/');

                html = html.replaceAll('href="/styles/', 'href="../styles/');
                html = html.replaceAll('href="/images/', 'href="../images/');

                html = html.replaceAll('src="/scripts/', 'src="../scripts/');
                html = html.replaceAll('src="/images/', 'src="../images/');
            }


            container.innerHTML = html;
        } catch (err) {
            console.error(`Error cargando ${url}:`, err);
        }
    };

    await loadComponent("#header-placeholder", "includes/header.html");
    await loadComponent("#footer-placeholder", "includes/footer.html");
    await loadComponent("#modal-placeholder", "includes/modal.html");

    // Aquí ya está cargado el header, ahora corre burguer.js
    const menuButton = document.getElementById("menu");
    const nav = document.getElementById("nav");

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuButton.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });
})

