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
        // @ts-ignore
        this.children.arrowButton = new ArrowButton({
            callback: () => {
                const input = this.element?.querySelector('.chats__input_message');
                // @ts-ignore
                const message = input!.value;
                // @ts-ignore
                input!.value = '';
                {
                    message !== '' &&
                        MessagesController.sendMessage(this.props.selectedChat!.id, message);
                }
            },
        });
        this.children.addChatButton = new ActionButton({
            title: 'Добавить чат',
            events: {
                click: () => {
                    this.handleOpenPopup('.popup-add-chat');
                },
            },
        });
        this.children.addUserButton = new ActionButton({
            title: 'Добавить пользователя',
            events: {
                click: () => {
                    this.handleOpenPopup('.popup-add-user');
                },
            },
        });
        this.children.removeUserButton = new ActionButton({
            title: 'Удалить пользователя',
            modifier: 'action-button__icon_delete',
            events: {
                click: () => {
                    this.handleOpenPopup('.popup-remove-user');
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
                },
            },
        });
        this.children.addUserPopup = new Popup({
            title: 'Добавить пользователя',
            button: new Button({ title: 'Добавить' }),
            content: new Input({
                type: 'text',
                label: 'Логин',
                name: 'add_user_login',
                className: 'input__add-user',
            }),
            className: 'popup-add-user',
            events: {
                submit: (e: any) => {
                    this.handleAddUser(e);
                },
            },
        });
        this.children.removeUserPopup = new Popup({
            title: 'Удалить пользователя',
            button: new Button({ title: 'Удалить' }),
            content: new Input({
                type: 'text',
                label: 'Логин',
                name: 'remove_user_login',
                className: 'input__remove-user',
            }),
            className: 'popup-remove-user',
            events: {
                submit: (e: any) => {
                    this.handleRemoveUser(e);
                },
            },
        });
    }

    protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
        if (newProps.chats) {
            // @ts-ignore
            this.children.chatsList = newProps.chats.map((data) => {
                const formatedTime: string = data.last_message?.time.slice(11, 16);

                return new Chat({
                    id: data.id,
                    chat: { ...data, last_message: { ...data.last_message, time: formatedTime } },
                    selectedChat: newProps.selectedChat,
                    events: {
                        click: () => {
                            ChatsController.selectChat(data);
                        },
                    },
                });
            });

            if (newProps.selectedChat) {
                const messages = store.getState().messages![newProps.selectedChat.id];
                // @ts-ignore
                this.children.messages = messages.map((item: MessageInfo) => {
                    return new Message({
                        content: item.content,
                        isMine: item.user_id === store.getState().user?.id,
                    });
                });
            }
        }
        return true;
    }

    handleOpenPopup(selector: string) {
        this.element?.querySelector(selector)?.classList.add('popup_visible');
    }

    handleClosePopup() {
        const popupElements: NodeListOf<Element> = this.element!.querySelectorAll('.popup');
        Array.from(popupElements).map((popup) => popup.classList.remove('popup_visible'));
    }

    handleAddChat(e: any) {
        e.preventDefault();
        // @ts-ignore
        const newChat = this.element?.querySelector('.input__item')?.value;
        {
            newChat !== '' && ChatsController.createChat({ title: newChat });
        }
        this.handleClosePopup();
    }

    handleAddUser(e: any) {
        e.preventDefault();
        // @ts-ignore
        const userToAdd = this.element?.querySelector('.input__add-user')?.value;
        {
            userToAdd !== '' &&
                ChatsController.addUserToChat([userToAdd], this.props.selectedChat.id);
        }
        this.handleClosePopup();
    }

    handleRemoveUser(e: any) {
        e.preventDefault();
        // @ts-ignore
        const userToRemove = this.element?.querySelector('.input__remove-user')?.value;
        {
            userToRemove !== '' &&
                ChatsController.deleteUsersFromChat([userToRemove], this.props.selectedChat.id);
        }
        this.handleClosePopup();
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

const withChats = withStore((state) => {
    const selectedChatId = state.selectedChat?.id;

    if (!selectedChatId) {
        return {
            chats: [...(state.chats || [])],
            messages: [],
            selectedChat: undefined,
        };
    }
    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user?.id,
        chats: [...(state.chats || [])],
    };
});
// @ts-ignore
export const ChatsPage = withChats(ChatsPageBase);
