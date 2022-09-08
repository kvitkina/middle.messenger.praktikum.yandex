import Block from '../../utils/Block';
import { onFormSubmit } from '../../utils/utils';
import tmpl from './Form.hbs';
import './Form.scss';

export interface FormProps {
    title: string;
    inputs: Block[];
    linkTitle: string;
    linkHref: string;
    button: Block;
    events?: {
        submit: (e: SubmitEvent) => void;
    }
};

export class Form extends Block {
    constructor(props: FormProps) {
        super('form', props);

        this.element?.classList.add('form');
        this.props.events = {
            submit: (e: Event) => onFormSubmit(e)
        }
    };

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Form;
