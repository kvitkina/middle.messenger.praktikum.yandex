import Block from '../../utils/Block';
import tmpl from './ProfileButton.hbs';
import './ProfileButton.scss';

interface Props {
    title: string;
}

export class ProfileButton extends Block {
    constructor(props: Props) {
        super('button', props);

        this.element?.classList.add('profile-button');
    }

    render() {
        return this.compile(tmpl, this.props);
    };
};
