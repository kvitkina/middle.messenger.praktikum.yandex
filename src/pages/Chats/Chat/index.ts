import Block from '../../../utils/Block';
import tmpl from './Chat.hbs';
import './Chat.scss';

interface Props {
    avatar: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    newMessagesCounter: number;
}

class Chat extends Block {
    constructor(props: Props) {
        super('div', props);

        this.element?.classList.add('chat');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Chat;
