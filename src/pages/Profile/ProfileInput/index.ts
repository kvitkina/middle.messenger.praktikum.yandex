import Block from '../../../utils/Block';
import tmpl from './ProfileInput.hbs';
import './ProfileInput.scss';

export interface Input {
    label: string;
    type: string;
    name: string;
    value: string;
}

class ProfileInput extends Block {
    constructor(props: Input) {
        super('div', props);

        this.element?.classList.add('profile-input');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    };
};

export default ProfileInput;


