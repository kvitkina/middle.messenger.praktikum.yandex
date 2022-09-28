import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';
import Chat from './Chat';
import { ArrowButton } from '../../components/ArrowButton';

interface ChatsProps {
    chatsList: Block[];
    currentChatName: string;
    arrowButton: Block;
}

export class ChatsPage extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
    }

    init(): void {
        (this.children.chatsList = new Chat({
            avatar: '',
            name: 'Иван',
            lastMessage: 'Круто',
            lastMessageTime: '10:49',
            newMessagesCounter: 2,
        })),
        new Chat({
            avatar: '',
            name: 'Мария',
            lastMessage: 'Спасибо!',
            lastMessageTime: '12:49',
            newMessagesCounter: 1,
        }),
        new Chat({
            avatar: '',
            name: 'Рабочий чат',
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
            lastMessageTime: '12:00',
            newMessagesCounter: 20,
        });
        this.props.currentChatName = 'Иван';
        this.children.arrowButton = new ArrowButton({ callback: () => console.log('сообщение')});

    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}
