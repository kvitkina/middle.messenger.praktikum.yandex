import Block from '../../utils/Block';
import tmpl from './Popup.hbs';
import './Popup.scss';

export interface PopupProps {
    title: string;
    content: Block;
    button: Block;
    className?: string;
    events?: {
        submit: (e: SubmitEvent) => void;
    };
}

export class Popup extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super('section', { ...props });

        this.element?.classList.add('popup');
        this.element?.classList.add(`${this.props.className}`);
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Popup;
