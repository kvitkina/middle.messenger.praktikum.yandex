import Block from '../../utils/Block';
import { inputValidator, ValidationObject } from '../../utils/utils';
import tmpl from './Input.hbs';

import './Input.scss';

const validationObject: ValidationObject = {
    errorClass: '.input__error',
    errorClassVisible: 'input__error_visible',
};

export interface InputProps {
    label: string;
    type: string;
    value?: string;
    name: string;
    events?: {
        focusin: (e: Event) => void;
        focusout: (e: Event) => void;
    };
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        const events = {
            focusin: (e: Event): void => this.onFocus(e),
            focusout: (e: Event): void => this.onBlur(e),
        };
        super('div', { ...props, events });

        this.element?.classList.add('input');
    }

    onFocus = (e: Event): void => {
        inputValidator(e, this.element!, validationObject);
    };

    onBlur = (e: Event): void => {
        inputValidator(e, this.element!, validationObject);
    };

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Input;
