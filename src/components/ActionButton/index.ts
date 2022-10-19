import Block from '../../utils/Block';
import tmpl from './ActionButton.hbs';
import './ActionButton.scss';

interface Props {
    icon?: string;
    title?: string;
    modifier?: string;
    events: {
        click: () => void;
    };
}

export class ActionButton extends Block<Props> {
    constructor(props: Props) {
        super('button', { ...props, icon: '../../../static/images/add-icon.svg' });

        this.element?.classList.add('action-button');
        this.element?.setAttribute('type', 'button');
    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default ActionButton;
