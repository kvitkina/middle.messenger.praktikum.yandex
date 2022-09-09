import Block from '../../utils/Block';
import tmpl from './ProfileButton.hbs';
import './ProfileButton.scss';

interface Props {
    title: string;
}

export class ProfileButton extends Block<Props> {
    constructor(props: Props) {
        super('button', props);

        this.element?.classList.add('profile-button');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}
