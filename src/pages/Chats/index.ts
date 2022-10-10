import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';
import { Chat } from './Chat';
import { ArrowButton } from '../../components/ArrowButton';
import { withStore } from '../../utils/Store';
import { ChatData } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import ActionButton from '../../components/ActionButton';
import Popup from '../../components/Popup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { onFormSubmit } from '../../utils/utils';

interface ChatsProps {
    chatsList: Block[];
    chats: ChatData[];
    arrowButton: Block;
    addChatButton: Block;
    addChatPopup: Block;
}

export class ChatsPageBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
    }

    handleOpenPopup() {
        this.element?.querySelector('.popup')?.classList.add('popup_visible');
    }

    handleClosePopup() {
        this.element?.querySelector('.popup')?.classList.remove('popup_visible');
    }

    handleAddChat(e: any) {
        e.preventDefault();
        const input = this.element?.querySelector('.input__item');

        ChatsController.addChat({title: input?.value});
    }

    init(): void {
        ChatsController.fetchChats();

        // this.children.chatsList = this.createChats(this.props);
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
        this.children.addChatPopup = new Popup({
            title: 'Загрузите файл',
            button: new Button({ title: 'Поменять'}),
            content: new Input({ type: 'text', label: 'Название чата', name: 'chat_title'}),
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
            this.children.chatsList = this.createChats(newProps);
        }
        return true;
    }

    private createChats(props: ChatsProps) {
        return props.chats.map(data => {
            return new Chat({
                ...data,
                events: {
                    click: () => {
                        ChatsController.selectChat(data.id);
                    }
                }
            });
        });
    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

const withChats = withStore((state) => ({chats: state.chats}));

export const ChatsPage = withChats(ChatsPageBase);
