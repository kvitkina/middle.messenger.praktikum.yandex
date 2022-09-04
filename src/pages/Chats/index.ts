import Block from '../../utils/Block';
import tmpl from './Chats.hbs';
import './Chats.scss';


class Chats extends Block {
    constructor(props) {
        super('div', props);

        this.element?.classList.add('chats');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
};

const ChatsPage = new Chats({});

export default ChatsPage;
