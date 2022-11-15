import { ChatData } from '../../../api/ChatsAPI';
import ChatsController from '../../../controllers/ChatsController';
import Block from '../../../utils/Block';
import tmpl from './Chat.hbs';
import './Chat.scss';

interface Props {
    id: number;
    chat: ChatData;
    selectedChat: ChatData;
    events?: {
        click: () => void;
    };
}

class Chat extends Block<Props> {
    constructor(props: Props) {
        super('div', { ...props,
            events: {
                click: () => {
                    ChatsController.selectChat(props.chat);
                },
            },
        });
    }

    render(): DocumentFragment {
        return this.compile(tmpl, {
            ...this.props,
            isSelected: this.props.id === this.props.selectedChat?.id,
        });
    }
}

export default Chat;
