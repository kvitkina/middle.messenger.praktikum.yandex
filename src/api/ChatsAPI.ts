import { User } from './AuthAPI';
import BaseAPI from './BaseAPI';

export interface ChatData {
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

export interface TitleData {
    title: string;
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    headers: Record<string, string> = { 'Content-Type': 'application/json' };

    read(): Promise<ChatData[]> {
        return this.http.get('', { headers: this.headers });
    }

    create(data: TitleData) {
        return this.http.post('', { data, headers: this.headers });
    }

    addUsersToChat(users: User[], chatId: number) {
        return this.http.put('/users', {data: { users, chatId },  headers: this.headers});
    }

    deleteUsersFromChat(users: User[], chatId: number) {
        return this.http.delete('/users', {data: { users, chatId },  headers: this.headers});
    }

    update = undefined;
    delete = undefined;
}

export default new ChatsAPI();
