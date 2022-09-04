import Block from '../../utils/Block';
import tmpl from './Input.hbs';

import './Input.scss';

export interface InputProps {
    label: string;
    type: string;
    value: string;
    name: string;
    error: string;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super('div', props);

        this.element?.classList.add('input');
    }

    render() {
        return this.compile(tmpl, this.props);
    };
};

export default Input;
