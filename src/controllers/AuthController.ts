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
            return user;
        } catch (e: any) {
            console.error(e.reason);
        }
    }

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
