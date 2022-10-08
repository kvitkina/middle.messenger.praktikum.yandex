import Block from '../../utils/Block';
import tmpl from './Avatar.hbs';
import './Avatar.scss';

interface Props {
    avatar?: string;
    events: {
        click: () => void;
    }
}

export class Avatar extends Block<Props> {
    constructor(props: Props) {
        super('div', props);

        this.element?.setAttribute('type', 'button');
    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Avatar;
