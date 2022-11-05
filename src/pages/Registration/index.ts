import tmpl from './Registration.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { Link } from '../../components/Link';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

interface Props {
    form: Block;
}

export class RegistrationPage extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    handleSignup(data: SignupData): void {
        if (data) {
            AuthController.signup(data);
        }
    }

    init(): void {
        this.children.form = new Form({
            title: 'Регистрация',
            inputs: [
                new Input({ label: 'Почта', type: 'email', value: '', name: 'email' }),
                new Input({ label: 'Логин', type: 'text', value: '', name: 'login' }),
                new Input({ label: 'Имя', type: 'text', value: '', name: 'first_name' }),
                new Input({ label: 'Фамилия', type: 'text', value: '', name: 'second_name' }),
                new Input({ label: 'Телефон', type: 'phone', value: '', name: 'phone' }),
                new Input({ label: 'Пароль', type: 'password', value: '', name: 'password' }),
            ],
            // @ts-ignore
            link: new Link({ label: 'Войти', to: '/' }),
            button: new Button({ title: 'Зарегистрироваться' }),
            controller: this.handleSignup,
        });
    }
    render(): DocumentFragment {
        return this.compile(tmpl, { form: this.props.form });
    }
}
