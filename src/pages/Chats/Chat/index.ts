import { ChatData } from '../../../api/ChatsAPI';
import Block from '../../../utils/Block';
import { withStore } from '../../../utils/Store';
import tmpl from './Chat.hbs';
import './Chat.scss';

interface Props {
    id: number;
    selectedChat: ChatData;
    events: {
        click: () => void;
    }
    isSelected: boolean;
}

class ChatBase extends Block<Props> {
    constructor(props: Props) {
        super('div', props);

        this.element?.classList.add('chat');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, {...this.props, isSelected: this.props.id === this.props.selectedChat?.id});
    }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || [])
    .find(({id}) => id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);
