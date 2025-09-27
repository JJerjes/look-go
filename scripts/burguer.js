const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('#nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open')
    menuBtn.classList.toggle('open')
})