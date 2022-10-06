import Block from '../../utils/Block';
import tmpl from './popup.hbs';
import './Popup.scss';

export interface PopupProps {
    title: string;
    content: Block;
    button: Block;
    events?: {
        submit: (e: SubmitEvent) => void;
    };

}

export class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super('section', { ...props });

        this.element?.classList.add('popup');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Popup;
