import BaseAPI from './BaseAPI';

export interface User {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    display_name: string;
    avatar?: string;
    id?: string;
}

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
}

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    headers: Record<string, string> = { 'Content-Type': 'application/json' };

    updateUser(data: User) {
        return this.http.put('/profile', { data, headers: this.headers });
    }

    updatePassword(data: PasswordData) {
        return this.http.put('/password', { data, headers: this.headers });
    }

    updateAvatar(data: FormData) {
        return this.http.put('/profile/avatar', { data });
    }

    create = undefined;
    update = undefined;
    delete = undefined;
    read = undefined;
}

export default new UserAPI();
