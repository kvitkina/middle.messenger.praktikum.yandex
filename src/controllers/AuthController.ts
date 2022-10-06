import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import Router from '../utils/Router';
import store from '../utils/Store';
import { Routes } from '../utils/types';

class AuthController {
    private readonly api: AuthAPI;
    constructor() {
        this.api = API;
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();

            Router.go(Routes.Chats);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            Router.go(Routes.Chats);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.read();
            store.set('user', user);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    // async fetchUser() {
    //     await this.api.read()
    //         .then((res: any): void => {
    //             if (res.status === 200) {
    //                 console.log(res);
    //                 const user = res.response;
    //                 store.set('user', user);
    //                 if (window.location.pathname === Routes.Login) {
    //                     Router.go(Routes.Chats);
    //                 }
    //             }
    //         })
    //         .catch((e: any) => {
    //             console.error(e);
    //         });
    // }

    async logout() {
        try {
            await this.api.logout();

            Router.go(Routes.Login);
        } catch (e: any) {
            console.error(e.reason);
        }
    }
}

export default new AuthController();
