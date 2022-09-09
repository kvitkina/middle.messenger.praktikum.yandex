import Block from '../../utils/Block';
import tmpl from './Button.hbs';
import './Button.scss';

interface Props {
    title: string;
}

export class Button extends Block<Props> {
    constructor(props: Props) {
        super('button', props);

        this.element?.classList.add('button');
        this.element?.setAttribute('type', 'submit');
    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Button;
