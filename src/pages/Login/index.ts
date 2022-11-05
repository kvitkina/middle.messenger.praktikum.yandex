import tmpl from './Login.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { Link } from '../../components/Link';
import AuthController from '../../controllers/AuthController';
import { SigninData } from '../../api/AuthAPI';

interface Props {
    form: Block;
}

export class LoginPage extends Block<Props> {
    constructor(props: Props) {
        super('div', props);

        this.element?.classList.add('login-form');
    }

    handleSignup(data: SigninData): void {
        if (data) {
            AuthController.signin(data);
        }
    }

    init(): void {
        this.children.form = new Form({
            title: 'Вход',
            inputs: [
                new Input({ label: 'Логин', type: 'text', value: '', name: 'login' }),
                new Input({ label: 'Пароль', type: 'password', value: '', name: 'password' }),
            ],
            // @ts-ignore
            link: new Link({ label: 'Нет аккаунта?', to: '/signup' }),
            button: new Button({ title: 'Вход' }),
            controller: this.handleSignup,
        });
    }

    render(): DocumentFragment {
        return this.compile(tmpl, { form: this.props.form });
    }
}
