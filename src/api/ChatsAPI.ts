import { User } from './AuthAPI';
import BaseAPI from './BaseAPI';

export interface Chat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User;
        time: string;
        content: string;
    }
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    headers: Record<string, string> = { 'Content-Type': 'application/json' };

    read(): Promise<Chat[]> {
        return this.http.get('', { headers: this.headers });
    }

    create(title: string) {
        return this.http.post('', { data: title, headers: this.headers });
    }

    update = undefined;
    delete = undefined;
}

export default new ChatsAPI();
