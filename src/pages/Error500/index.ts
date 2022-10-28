import ServiseError, { ServiceErrorProps } from '../../components/ServiceError';
import Block from '../../utils/Block';
import tmpl from './Error500.hbs';

interface Props {
    serviceError: ServiceErrorProps;
}

export class Error500Page extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    init(): void {
        this.children.serviceError = new ServiseError({ title: '500', subtitle: 'Мы уже фиксим' });
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}
