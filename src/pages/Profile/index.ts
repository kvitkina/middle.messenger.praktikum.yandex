import tmpl from './Profile.hbs';
import {ProfileButton} from '../../components/ProfileButton';
import ProfileInput, { Input } from './ProfileInput';
import Button from '../../components/Button';
import './Profile.scss';
import Block from '../../utils/Block';
import { onFormSubmit } from '../../utils/utils';

interface Props {
    user: User;
    inputs: Block[];
    actions:  Block[];
    saveButton: Block;
    events: {
        submit: (e: SubmitEvent) => void;
    }
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
	phone: '+79099673030',
	display_name: 'kvitkina',
};

const profileInputs: Input[] = [
	{
		label: 'Почта',
		type: 'email',
		value: `${user.email}`,
		name: 'email',
	},
	{
		label: 'Логин',
		type: 'text',
		value: `${user.login}`,
		name: 'login',
	},
	{
		label: 'Имя',
		type: 'text',
		value: `${user.first_name}`,
		name: 'first_name',
	},
	{
		label: 'Фамилия',
		type: 'text',
		value: `${user.second_name}`,
		name: 'second_name',
	},
	{
		label: 'Имя в чате',
		type: 'text',
		value: `${user.display_name}`,
		name: 'display_name',
	},
	{
		label: 'Телефон',
		type: 'phone',
		value: `${user.phone}`,
		name: 'phone',
	},
];

const passwordInputs: Input[] = [
	{
		label: 'Старый пароль',
		type: 'password',
		value: '',
		name: 'oldPassword',
	},
	{
		label: 'Новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
	},
	{
		label: 'Повторите новый пароль',
		type: 'password',
		value: '',
		name: 'newPassword',
	},
];

class Profile extends Block {
    constructor(props: Props) {
        super('section', props);
        this.element?.classList.add('profile');
    };

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    };
};


const ProfilePage = new Profile({
	user,
	inputs: profileInputs.map((item) => new ProfileInput(item)),
	actions: [new ProfileButton({title: 'Изменить данные'}), new ProfileButton({title: 'Изменить пароль'})],
	saveButton: new Button({title: 'Сохранить'}),
    events: {
        submit: (e) => {
            onFormSubmit(e);
        }
    },
});

export default ProfilePage;
