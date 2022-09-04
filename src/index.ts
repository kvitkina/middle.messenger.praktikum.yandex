import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import Error500Page from './pages/Error500';
import Error404Page from './pages/Error404';
import ChatsPage from './pages/Chats';
import ProfilePage from './pages/Profile';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;
    if (window.location.pathname === '/') {
        root.append(LoginPage.getContent()!);
        LoginPage.dispatchComponentDidMount();
    }
    if (window.location.pathname === '/signin') {
        root.append(RegistrationPage.getContent()!);
        RegistrationPage.dispatchComponentDidMount();
    }
    if (window.location.pathname === '/500') {
        root.append(Error500Page.getContent()!);
        Error500Page.dispatchComponentDidMount();
    }
    if (window.location.pathname === '/404') {
        root.append(Error404Page.getContent()!);
        Error404Page.dispatchComponentDidMount();
    }
    if (window.location.pathname === '/profile') {
        root.append(ProfilePage.getContent()!);
        ProfilePage.dispatchComponentDidMount();
    }
    if (window.location.pathname === '/chats') {
        root.append(ChatsPage.getContent()!);
        ChatsPage.dispatchComponentDidMount();
    }
});
