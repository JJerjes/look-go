// const menuBtn = document.querySelector('#menu');
// const nav = document.querySelector('#nav');
// const body = document.body;

// menuBtn.addEventListener('click', () => {
//     menuBtn.classList.toggle('open')
//     nav.classList.toggle('open')
//     body.classList.toggle('menu-open')
// })

// // Cierra el menú cuando haces clic en un enlace del nav
// document.querySelectorAll('.nav a').forEach(link => {
//     link.addEventListener('click', () => {
//         document.getElementById('menu').classList.remove('open');
//         document.getElementById('nav').classList.remove('open');
//         document.body.classList.remove('menu-open');

//         // Elimina el margen dinámico en el <main>
//         document.querySelector('main').style.marginTop = '';
//     });
// });


const menuBtn = document.getElementById('menu');
const nav = document.getElementById('nav');
const body = document.body;
const main = document.querySelector('main');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
    body.classList.toggle('menu-open');

    if (body.classList.contains('menu-open')) {
        const header = document.querySelector('header');
        const navHeight = nav.offsetHeight;
        const headerHeight = header.offsetHeight;
        const totalHeight = headerHeight + navHeight;
        main.style.marginTop = `${totalHeight}px`;
    } else {
        main.style.marginTop = '';
    }
});

// 👇 Este bloque cierra el menú al hacer clic en cualquier enlace
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        nav.classList.remove('open');
        body.classList.remove('menu-open');
        main.style.marginTop = '';
    });
});
