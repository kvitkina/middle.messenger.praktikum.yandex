import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import tmpl from './ArrowButton.hbs';
import './ArrowButton.scss';

interface Props extends PropsWithRouter {
    modifier?: string;
    events?: {
        click: () => void;
    };
    callback?: () => any;
}

export class BaseArrowButton extends Block<Props> {
    constructor(props: Props) {
        super('div', {
            ...props,
            events: {
                click: () => this.back(),
            },
        });
    }

    back() {
        if (this.props.modifier) {
            this.props.router.back();
        }
        this.props.callback!();
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}

export const ArrowButton = withRouter(BaseArrowButton);
