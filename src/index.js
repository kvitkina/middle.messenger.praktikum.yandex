// import template from './index.hbs';
import LoginPage from './pages/Login';

window.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById("app").innerHTML = LoginPage;
    // const app = document.getElementById("app");
    // app.innerHTML = template({ title: 'Ку-ку!'});
})
