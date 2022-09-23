import tmpl from './Login.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';

interface Props {
    form: Block;
}

export class LoginPage extends Block<Props> {
    constructor(props: Props) {
        super('div', props);

        this.element?.classList.add('.login-form');
    }

    init(): void {
        this.children.form = new Form({
            title: 'Вход',
            inputs: [
                new Input({ label: 'Логин', type: 'text', value: '', name: 'login' }),
                new Input({ label: 'Пароль', type: 'password', value: '', name: 'password' }),
            ],
            linkTitle: 'Нет аккаунта?',
            linkHref: '/signin',
            button: new Button({ title: 'Вход' }),
        });
    }

    render(): DocumentFragment {
        return this.compile(tmpl, { form: this.props.form });
    }
}
