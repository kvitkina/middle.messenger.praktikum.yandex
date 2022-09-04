import Block from '../../utils/Block';
import tmpl from './Button.hbs';
import './Button.scss';

interface Props {
    title: string;
}

export class Button extends Block {
    constructor(props: Props) {
        super('button', props);

        this.element?.classList.add('button');
    }
    render() {
        return this.compile(tmpl, this.props);
    };
};

export default Button;
