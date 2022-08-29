import tmpl from './Profile.hbs';
import ProfileButton from '../../components/ProfileButton';
import ProfileInput from './ProfileInput';
import Button from '../../components/Button';
import './Profile.scss';

const User = {
	email: 'pochta@yandex.ru',
	login: 'kvitkina',
	first_name: 'Ирина',
	second_name: 'Квиткина',
	phone: '+7 (909) 967 30 30',
	display_name: 'kvitkina',
};

const profileInputs = [
	{
		label: 'Почта',
		type: 'email',
		value: `${User.email}`,
		name: 'email',
		disabled: false,
	},
	{
		label: 'Логин',
		type: 'text',
		value: `${User.login}`,
		name: 'login',
		disabled: false,
	},
	{
		label: 'Имя',
		type: 'text',
		value: `${User.first_name}`,
		name: 'first_name',
		disabled: true,
	},
	{
		label: 'Фамилия',
		type: 'text',
		value: `${User.second_name}`,
		name: 'second_name',
		disabled: false,
	},
	{
		label: 'Имя в чате',
		type: 'text',
		value: `${User.display_name}`,
		name: 'display_name',
		disabled: false,
	},
	{
		label: 'Телефон',
		type: 'phone',
		value: `${User.phone}`,
		name: 'phone',
		disabled: false,
	},
];

const passwordInputs = [
	{
		label: 'Старый пароль',
		type: 'password',
		value: '',
		name: 'oldPassword',
		disabled: false,
	},
	{
		label: 'Новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
		disabled: false,
	},
	{
		label: 'Повторите новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
		disabled: false,
	},
];

const Profile = tmpl({
	user: User,
	inputs: profileInputs.map((item) => ProfileInput(item)),
	actions: [ProfileButton('Изменить данные'), ProfileButton('Изменить пароль')],
	saveButton: Button('Сохранить'),
});

export default Profile;
