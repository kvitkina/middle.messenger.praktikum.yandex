import Block from '../../utils/Block';
import tmpl from './ServiceError.hbs';
import './ServiceError.scss';

export interface ServiceErrorProps {
    title: string;
    subtitle: string;
}

export class ServiceError extends Block<ServiceErrorProps> {
    constructor(props: ServiceErrorProps) {
        super('div', props);

        this.element?.classList.add('service-error');
    }
    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export default ServiceError;
