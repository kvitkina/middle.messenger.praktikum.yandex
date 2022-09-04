import tmpl from './Profile.hbs';
import {ProfileButton} from '../../components/ProfileButton';
import ProfileInput, { Input } from './ProfileInput';
import Button from '../../components/Button';
import './Profile.scss';
import Block from '../../utils/Block';

interface Props {
    user: User;
    inputs: Object[];
    actions:  Object[];
    saveButton: Object;
};

export interface User {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    display_name: string;
};

const user: User = {
	email: 'pochta@yandex.ru',
	login: 'kvitkina',
	first_name: 'Ирина',
	second_name: 'Квиткина',
	phone: '+7 (909) 967 30 30',
	display_name: 'kvitkina',
};

const profileInputs: Input[] = [
	{
		label: 'Почта',
		type: 'email',
		value: `${user.email}`,
		name: 'email',
		// disabled: false,
	},
	{
		label: 'Логин',
		type: 'text',
		value: `${user.login}`,
		name: 'login',
		// disabled: false,
	},
	{
		label: 'Имя',
		type: 'text',
		value: `${user.first_name}`,
		name: 'first_name',
		// disabled: true,
	},
	{
		label: 'Фамилия',
		type: 'text',
		value: `${user.second_name}`,
		name: 'second_name',
		// disabled: false,
	},
	{
		label: 'Имя в чате',
		type: 'text',
		value: `${user.display_name}`,
		name: 'display_name',
		// disabled: false,
	},
	{
		label: 'Телефон',
		type: 'phone',
		value: `${user.phone}`,
		name: 'phone',
		// disabled: false,
	},
];

const passwordInputs: Input[] = [
	{
		label: 'Старый пароль',
		type: 'password',
		value: '',
		name: 'oldPassword',
		// disabled: false,
	},
	{
		label: 'Новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
		// disabled: false,
	},
	{
		label: 'Повторите новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
		// disabled: false,
	},
];

class Profile extends Block {
    constructor(props: Props) {
        super('section', props);

        this.element?.classList.add('profile');
    };

    render() {
        return this.compile(tmpl, this.props);
    };
};


const ProfilePage = new Profile({
	user,
	inputs: profileInputs.map((item) => new ProfileInput(item)),
	actions: [new ProfileButton({title: 'Изменить данные'}), new ProfileButton({title: 'Изменить пароль'})],
	saveButton: new Button({title: 'Сохранить'}),
});

export default ProfilePage;
