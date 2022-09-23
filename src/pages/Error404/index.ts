import ServiseError, { ServiceErrorProps } from '../../components/ServiceError';
import Block from '../../utils/Block';
import tmpl from './Error404.hbs';

interface Props {
    serviceError: ServiceErrorProps;
}

export class Error404Page extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    init(): void {
        this.children.serviceError = new ServiseError({ title: '404', subtitle: 'Не туда попали' });
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}
