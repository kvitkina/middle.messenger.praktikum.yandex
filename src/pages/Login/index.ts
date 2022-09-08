import tmpl from './Login.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';

interface Props {
    form: Block;
}

class Login extends Block {
    constructor(props: Props) {
        super('div', props);

        this.element?.classList.add('.login-form');
    }

    render(): DocumentFragment {
        return this.compile(tmpl, { form: this.props.form });
    }
}

export const LoginPage = new Login({
    form: new Form({
        title: 'Вход',
        inputs: [
            new Input({ label: 'Логин', type: 'text', value: '', name: 'login' }),
            new Input({ label: 'Пароль', type: 'password', value: '', name: 'password' }),
        ],
        linkTitle: 'Нет аккаунта?',
        linkHref: '/signin',
        button: new Button({ title: 'Вход' }),
    }),
});

export default LoginPage;
