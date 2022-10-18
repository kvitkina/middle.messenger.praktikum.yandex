import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';
import Chat from './Chat';
import { ArrowButton } from '../../components/ArrowButton';
import { withStore } from '../../utils/Store';
import { ChatData } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import ActionButton from '../../components/ActionButton';
import Popup from '../../components/Popup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MessagesController, { Message } from '../../controllers/MessagesController';

interface ChatsProps {
    chats: ChatData[];
    selectedChat: ChatData;
    userId: number;
    messages: Message[];
}

export class ChatsPageBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
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
        const input = this.element?.querySelector('.input__item');

        ChatsController.addUserToChat([input?.value], this.props.selectedChat.id);
    }

    handleRemoveUser(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__item');

        ChatsController.deleteUsersFromChat([input?.value], this.props.selectedChat.id);
    }

    init(): void {
        ChatsController.fetchChats();

        this.children.chatsList = [];
        this.children.arrowButton = new ArrowButton({
            callback: () => {
                const input = this.element?.querySelector('.chats__input_message');
                const message = input!.value;
                input!.value = '';

                MessagesController.sendMessage(this.props.selectedChat!.id, message);
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
            content: new Input({ type: 'text', label: 'Логин', name: 'add_user_login' }),
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
            content: new Input({ type: 'text', label: 'Логин', name: 'remove_user_login' }),
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
        console.log(this.props.selectedChat);

        if (newProps !== oldProps) {
            this.children.chatsList = newProps.chats.map((data) => {
                return new Chat({
                    id: data.id,
                    chat: data,
                    selectedChat: newProps.selectedChat,
                    events: {
                        click: () => {
                            ChatsController.selectChat(data);
                        },
                    },
                });
            });
        }
        return true;
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

const withChats = withStore((state) => ({
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    // userId: state.user.id,
    // messages: (state.messages || {})[state.selectedChat.id] || [],
}));

export const ChatsPage = withChats(ChatsPageBase);
