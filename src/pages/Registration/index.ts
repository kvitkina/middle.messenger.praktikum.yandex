import tmpl from './Registration.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';

interface Props {
    form: Object;
}

class Registration extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render(): DocumentFragment{
        return this.compile(tmpl, {form: this.props.form})
    }
};

export const RegistrationPage = new Registration({
    form: new Form({
        title: 'Регистрация',
        inputs: [
            new Input({label: 'Почта', type: 'email', value: '', name: 'email', error: 'Неверная почта'}),
			new Input({label: 'Логин', type: 'text',value:  '', name: 'login', error: 'Неверный логин'}),
			new Input({label: 'Имя', type: 'text', value: '', name: 'first_name', error: 'Введите имя'}),
			new Input({label: 'Фамилия', type: 'text', value: '', name: 'second_name', error: 'Введите фамилию'}),
			new Input({label: 'Телефон', type: 'phone', value: '', name: 'phone', error: 'Введите номер телефона'}),
			new Input({label: 'Пароль', type: 'password', value: '', name: 'password', error: 'Неверный пароль'}),
			new Input({label: 'Пароль еще раз', type: 'password', value: '', name: 'confirmPassword', error: 'Пароли не совпадают'}),
        ],
        linkTitle: 'Войти',
        linkHref:'/',
        button: new Button({title: 'Зарегистрироваться'}),
    })
});

export default RegistrationPage;
