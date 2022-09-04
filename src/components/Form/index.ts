import Block from '../../utils/Block';
import tmpl from './Form.hbs';
import './Form.scss';

export interface FormProps {
    title: string;
    inputs: any[];
    linkTitle: string;
    linkHref: string;
    button: any;
};

export class Form extends Block {
    constructor(props: FormProps) {
        super('form', props);

        this.element?.classList.add('form');
    };

    render() {
        return this.compile(tmpl, this.props)
    }
}

export default Form;
