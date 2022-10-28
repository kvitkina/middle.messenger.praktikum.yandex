import API, { PasswordData, User, UserAPI } from '../api/UserAPI';
import store from '../utils/Store';
import AuthController from './AuthController';

class UserController {
    private readonly api: UserAPI;
    constructor() {
        this.api = API;
    }

    async updateUser(data: User) {
        try {
            await this.api.updateUser(data);

            await AuthController.fetchUser();
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async updatePassword(data: PasswordData) {
        try {
            await this.api.updatePassword(data);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async updateAvatar(data: FormData) {
        try {
            await this.api.updateAvatar(data);

            await AuthController.fetchUser();
        } catch (e: any) {
            console.log(e.reason);
        }
    }
}

export default new UserController();
