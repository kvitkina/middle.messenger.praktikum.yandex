import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';
import Chat from './Chat';

interface ChatsProps {
    chatsList: Block[];
}
class Chats extends Block {
    constructor(props: ChatsProps) {
        super('div', props);
        this.element?.classList.add('chats');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
};

const ChatsPage = new Chats({chatsList: [
    new Chat({avatar: '', name: 'Иван', lastMessage: 'Круто', lastMessageTime: '10:49', newMessagesCounter: 2}),
    new Chat({avatar: '', name: 'Иван', lastMessage: 'Круто', lastMessageTime: '10:49', newMessagesCounter: 2}),
    new Chat({avatar: '', name: 'Иван', lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', lastMessageTime: '12:00', newMessagesCounter: 20}),
]});

export default ChatsPage;
