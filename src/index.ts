import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { Error500Page } from './pages/Error500';
import { Error404Page } from './pages/Error404';
import { ChatsPage } from './pages/Chats';
import { ProfilePage } from './pages/Profile';
import Router from './utils/Router';
import { Routes } from './utils/types';

window.addEventListener('DOMContentLoaded', async() => {
    Router.use(Routes.Login, LoginPage)
        .use(Routes.Error500, Error500Page)
        .use(Routes.Error404, Error404Page)
        .use(Routes.Register, RegistrationPage)
        .use(Routes.Profile, ProfilePage)
        .use(Routes.Chats, ChatsPage);
    Router.start();

    // let isProtectedRoute = true;

    // switch (window.location.pathname) {
    // case Routes.Login:
    // case Routes.Register:
    //     isProtectedRoute = false;
    //     break;
    // }

    // try {
    //     await AuthController.fetchUser();

    //     Router.start();

    //     if (!isProtectedRoute) {
    //         Router.go(Routes.Chats);
    //     }
    // } catch (e) {
    //     Router.start();

    //     if (isProtectedRoute) {
    //         Router.go(Routes.Login);
    //     }
    // }
});
