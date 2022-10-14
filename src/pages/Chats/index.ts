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

interface ChatsProps {
    chats: ChatData[];
    arrowButton: Block;
    addChatButton: Block;
    addChatPopup: Block;
    selectedChat: ChatData;
}

export class ChatsPageBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
        console.log(this.props.selectedChat);

    }

    handleOpenPopup() {
        this.element?.querySelector('.popup-add-chat')?.classList.add('popup_visible');
    }

    handleAddUserPopupOpen() {

    }

    handleRemoveUserPopupOpen() {

    }

    handleClosePopup() {
        this.element?.querySelector('.popup')?.classList.remove('popup_visible');
    }

    handleAddChat(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__item');

        ChatsController.createChat({title: input?.value});
    }

    init(): void {
        ChatsController.fetchChats();
        this.children.chatsList = [];
        this.children.arrowButton = new ArrowButton({ callback: () => console.log('сообщение') });
        this.children.addChatButton = new ActionButton({
            title: 'Добавить чат',
            icon: '../../../static/images/add-icon.svg',
            events: {
                click: () => {
                    this.handleOpenPopup();
                }
            }
        });
        this.children.addUserButton = new ActionButton({
            title: 'Добавить пользователя',
            icon: '../../../static/images/add-icon.svg',
            events: {
                click: () => {
                    this.handleAddUserPopupOpen();
                }
            }
        });
        this.children.removeUserButton = new ActionButton({
            title: 'Удалить пользователя',
            icon: '../../../static/images/add-icon.svg',
            modifier: 'action-button__icon_delete',
            events: {
                click: () => {
                    this.handleRemoveUserPopupOpen();
                }
            }
        });
        this.children.addChatPopup = new Popup({
            title: 'Добавить чат',
            button: new Button({ title: 'Готово'}),
            content: new Input({ type: 'text', label: 'Название чата', name: 'chat_title'}),
            className: 'popup-add-chat',
            events: {
                submit: (e: any) => {
                    this.handleAddChat(e);
                    this.handleClosePopup();
                },
            }
        });
    }

    protected componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
        if(newProps.chats) {
            this.children.chatsList = newProps.chats.map(data => {
                console.log(data);
                return new Chat({
                    id: data.id,
                    chat: data,
                    selectedChat: newProps.selectedChat,
                    events: {
                        click: () => {
                            ChatsController.selectChat(data.id);
                        }
                    }
                });
            });
        }
        return true;
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatsPage = withChats(ChatsPageBase);
