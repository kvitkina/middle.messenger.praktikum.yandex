import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';
import Chat from './Chat';
import { ArrowButton } from '../../components/ArrowButton';
import store, { withStore } from '../../utils/Store';
import { ChatData } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import ActionButton from '../../components/ActionButton';
import Popup from '../../components/Popup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MessagesController, { Message as MessageInfo } from '../../controllers/MessagesController';
import { Message } from '../../components/Message';
import { User } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';

interface ChatsProps {
    chats: ChatData[];
    selectedChat: ChatData;
    user: User;
    messages: MessageInfo[];
}

export class ChatsPageBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
    }

    init(): void {
        ChatsController.fetchChats();
        AuthController.fetchUser();

        this.children.chatsList = [];
        this.children.arrowButton = new ArrowButton({
            callback: () => {
                const input = this.element?.querySelector('.chats__input_message');
                const message = input!.value;
                input!.value = '';
                {message !== '' &&
                    MessagesController.sendMessage(this.props.selectedChat!.id, message);
                }
            }
        });

        this.children.addChatButton = new ActionButton({
            title: 'Добавить чат',
            icon: '../../../static/images/add-icon.svg',
            events: {
                click: () => {
                    this.handleOpenPopup();
                },
            },
        });
        this.children.addUserButton = new ActionButton({
            title: 'Добавить пользователя',
            icon: '../../../static/images/add-icon.svg',
            events: {
                click: () => {
                    this.handleAddUserPopupOpen();
                },
            },
        });
        this.children.removeUserButton = new ActionButton({
            title: 'Удалить пользователя',
            icon: '../../../static/images/add-icon.svg',
            modifier: 'action-button__icon_delete',
            events: {
                click: () => {
                    this.handleRemoveUserPopupOpen();
                },
            },
        });
        this.children.addChatPopup = new Popup({
            title: 'Добавить чат',
            button: new Button({ title: 'Готово' }),
            content: new Input({ type: 'text', label: 'Название чата', name: 'chat_title' }),
            className: 'popup-add-chat',
            events: {
                submit: (e: any) => {
                    this.handleAddChat(e);
                    this.handleClosePopup();
                },
            },
        });
        this.children.addUserPopup = new Popup({
            title: 'Добавить пользователя',
            button: new Button({ title: 'Добавить' }),
            content: new Input({ type: 'text', label: 'Логин', name: 'add_user_login', className: 'input__add-user' }),
            className: 'popup-add-user',
            events: {
                submit: (e: any) => {
                    this.handleAddUser(e);
                    this.handleClosePopup();
                },
            },
        });
        this.children.removeUserPopup = new Popup({
            title: 'Удалить пользователя',
            button: new Button({ title: 'Удалить' }),
            content: new Input({
                type: 'text', label: 'Логин', name: 'remove_user_login', className: 'input__remove-user',
            }),
            className: 'popup-remove-user',
            events: {
                submit: (e: any) => {
                    this.handleRemoveUser(e);
                    this.handleClosePopup();
                },
            },
        });
    }

    protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
        if (newProps.chats) {
            this.children.chatsList = newProps.chats.map((data) => {
                const formatedTime: string = data.last_message?.time.slice(11, 16);
                return new Chat({
                    id: data.id,
                    chat: {...data, last_message: {...data.last_message, time: formatedTime}},
                    selectedChat: newProps.selectedChat,
                    events: {
                        click: () => {
                            ChatsController.selectChat(data);
                        },
                    },
                });
            });

            if (newProps.selectedChat) {
                const messages = store.getState().messages[newProps.selectedChat.id];
                this.children.messages = messages.map((item: MessageInfo) => {
                    return new Message({content: item.content, isMine: item.user_id === store.getState().user.id});
                });
            }
        }
        return true;
    }

    handleOpenPopup() {
        this.element?.querySelector('.popup-add-chat')?.classList.add('popup_visible');
    }

    handleAddUserPopupOpen() {
        this.element?.querySelector('.popup-add-user')?.classList.add('popup_visible');
    }

    handleRemoveUserPopupOpen() {
        this.element?.querySelector('.popup-remove-user')?.classList.add('popup_visible');
    }

    handleClosePopup() {
        this.element?.querySelector('.popup')?.classList.remove('popup_visible');
    }

    handleAddChat(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__item');

        ChatsController.createChat({ title: input?.value });
    }

    handleAddUser(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__add-user');
        ChatsController.addUserToChat([input?.value], this.props.selectedChat.id);
    }

    handleRemoveUser(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__remove-user');

        ChatsController.deleteUsersFromChat([input?.value], this.props.selectedChat.id);
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

const withChats = withStore(state => ({
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
}));

export const ChatsPage = withChats(ChatsPageBase);
