import Block from '../../utils/Block';
import tmpl from './Message.hbs';
import './Message.scss';

interface Props {
    content: string;
    isMine: boolean;
}

export class Message extends Block<Props> {
    constructor(props: Props) {
        super('div', props);

    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Message;
