import template from './index.hbs';

window.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById("app");

    app.innerHTML = template({ variable: 'Ку-ку!'});
})
