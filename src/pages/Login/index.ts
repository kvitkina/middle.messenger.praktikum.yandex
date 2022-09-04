import tmpl from './Login.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';

interface Props {
    form: Object;
}

class Login extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(tmpl, {form: this.props.form})
    }
};

export const LoginPage = new Login({
    form: new Form({
        title: 'Вход',
        inputs: [
            new Input({label: 'Логин', type: 'text', value: '', name: 'login', error: 'Неверный логин'}),
            new Input({label: 'Пароль', type: 'password', value: '', name: 'password', error: 'Неверный пароль'})
        ],
        linkTitle: 'Нет аккаунта?',
        linkHref:'/signin',
        button: new Button({title: 'Вход'}),
    })
});

export default LoginPage;
