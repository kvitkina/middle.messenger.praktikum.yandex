import Block from '../../utils/Block';
import { onFormSubmit } from '../../utils/utils';
import tmpl from './Form.hbs';
import './Form.scss';

export interface FormProps {
    title: string;
    inputs: Block[];
    link: Block;
    button: Block;
    events?: {
        submit: (e: SubmitEvent) => void;
    };
    controller: (data: any) => void;
}

export class Form extends Block<FormProps> {
    constructor(props: FormProps) {
        const events = {
            submit: (e: Event) => {
                const data = onFormSubmit(e);
                this.props.controller(data);
            },
        };
        super('form', { ...props, events });

        this.element?.classList.add('form');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default Form;
