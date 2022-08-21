import Registration from './Registration.hbs';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default Registration({
    form: Form(
        'Регистрация',
        [
            Input('Почта', 'email', '', 'email', 'Неверная почта'),
            Input('Логин', 'text', '', 'login', 'Неверный логин'),
            Input('Имя', 'text', '', 'first_name', 'Введите имя'),
            Input('Фамилия', 'text', '', 'second_name', 'Введите фамилию'),
            Input('Телефон', 'phone', '', 'phone', 'Введите номер телефона'),
            Input('Пароль', 'password', '', 'password', 'Неверный пароль'),
            Input('Пароль еще раз', 'password', '', 'confirmPassword', 'Пароли не совпадают')
        ],
        Button('Зарегистрироваться'),
        'Войти',
        '/'
    )
})