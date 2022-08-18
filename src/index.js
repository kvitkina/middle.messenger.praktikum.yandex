// import template from './index.hbs';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import Error500Page from './pages/Error500';
import Error404Page from './pages/Error404';
import ChatsPage from './pages/Chats';

window.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById("app");
    
    if(window.location.pathname === '/404') {
        app.innerHTML = Error404Page;
    }
    if(window.location.pathname === '/500') {
        app.innerHTML = Error500Page;
    }
    if(window.location.pathname === '/') {
        app.innerHTML = LoginPage;
    }
    if(window.location.pathname === '/signin') {
        app.innerHTML = RegistrationPage;
    }
    if(window.location.pathname === '/chats') {
        app.innerHTML = ChatsPage;
    }    
})
