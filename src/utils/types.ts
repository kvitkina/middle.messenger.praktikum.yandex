import { User } from '../api/AuthAPI';
import { ChatData } from '../api/ChatsAPI';
import { Message } from '../controllers/MessagesController';

export enum Routes {
    Login = '/',
    Register = '/signup',
    Profile = '/profile',
    Error500 = '/500',
    Error404 = '/404',
    Chats = '/chats',
}

export enum StoreEvents {
    Updated = 'updated',
}

export interface State {
    user?: User;
    selectedChat?: ChatData;
    chats?: ChatData[];
    messages?: Record<number, Message[]>;
}
