import Login from './Login.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './Login.scss';

export default Login({
    form: Form(
        'Вход',
        [
            Input('Логин', 'text', '', 'login', 'Неверный логин'),
            Input('Пароль', 'password', '', 'password', 'Неверный пароль')
        ],
        Button('Авторизоваться'),
        'Нет аккаунта?',
        '/signin'
    )
});
