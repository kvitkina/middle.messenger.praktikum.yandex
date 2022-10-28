import { User } from '../api/AuthAPI';
import API, { ChatData, ChatsAPI, TitleData } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
    private readonly api: ChatsAPI;
    constructor() {
        this.api = API;
    }

    async fetchChats() {
        try {
            const chats: ChatData[] = await this.api.read();

            chats.map(async (chat) => {
                const token = await this.getToken(chat.id);
                await MessagesController.connect(chat.id, token);
            });

            store.set('chats', chats);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    selectChat(data: ChatData) {
        store.set('selectedChat', data);
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    async createChat(data: TitleData) {
        try {
            await this.api.create(data);
            await this.fetchChats();
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async addUserToChat(users: User[], chatId: number) {
        try {
            await this.api.addUsersToChat(users, chatId);
            await this.fetchChats();
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    async deleteUsersFromChat(users: User[], chatId: number) {
        try {
            await this.api.deleteUsersFromChat(users, chatId);
            await this.fetchChats();
        } catch (e: any) {
            console.error(e.reason);
        }
    }
}

export default new ChatsController();
