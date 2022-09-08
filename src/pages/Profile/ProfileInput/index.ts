import Block from '../../../utils/Block';
import { inputValidator, ValidationObject } from '../../../utils/utils';
import tmpl from './ProfileInput.hbs';
import './ProfileInput.scss';

const validationObject: ValidationObject = ({
    errorClass: '.profile-input__error',
    errorClassVisible: 'profile-input__error_visible',
});

export interface Input {
    label: string;
    type: string;
    name: string;
    value: string;
    events?: {
        focusin: (e: Event) => void;
        focusout: (e: Event) => void;
    }
}

class ProfileInput extends Block {
    constructor(props: Input) {
        super('div', props);

        this.element?.classList.add('profile-input');
        this.props.events = {
            focusin: (e: Event): void => this.onFocus(e),
            focusout: (e: Event): void => this.onBlur(e),
        }
    }

    onFocus = (e: Event): void => {
        inputValidator(e, this.element!, validationObject);
    };

    onBlur = (e: Event): void => {
        inputValidator(e, this.element!, validationObject);
    };

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    };
};

export default ProfileInput;


