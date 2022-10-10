import { User } from '../api/AuthAPI';
import Chat from '../pages/Chats/Chat';

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
    user: User;
    chats: Chat[];
}
