import { User } from '../api/AuthAPI';
import API, { ChatData, ChatsAPI, TitleData } from '../api/ChatsAPI';
import store from '../utils/Store';

class ChatsController {
    private readonly api: ChatsAPI;
    constructor() {
        this.api = API;
    }

    async fetchChats(){
        try {
            const chats: ChatData[] = await this.api.read();
            store.set('chats', chats);
        } catch (e: any) {
            console.error(e.reason);
        }
    }

    selectChat(data: ChatData) {
        store.set('selectedChat', data);
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
