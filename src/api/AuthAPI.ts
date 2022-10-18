import BaseAPI from './BaseAPI';

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface User {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    display_name: string;
    avatar: string;
    id: number;
}
export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    headers: Record<string, string> = { 'Content-Type': 'application/json' };

    signin(data: SigninData) {
        return this.http.post('/signin', { data, headers: this.headers });
    }

    signup(data: SignupData) {
        return this.http.post('/signup', { data, headers: this.headers });
    }

    read(): Promise<User> {
        return this.http.get('/user', { headers: this.headers });
    }

    logout() {
        return this.http.post('/logout', { headers: this.headers });
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new AuthAPI();
