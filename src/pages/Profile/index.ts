import tmpl from './Profile.hbs';
import { ProfileButton } from '../../components/ProfileButton';
import ProfileInput, { Input } from './ProfileInput';
import Button from '../../components/Button';
import './Profile.scss';
import Block from '../../utils/Block';
import { onFormSubmit } from '../../utils/utils';
import { Link } from '../../components/Link';
import { ArrowButton } from '../../components/ArrowButton';
import { User } from '../../api/AuthAPI';

interface Props {
    user: User;
    inputs: Input[];
    actions: Block[];
    saveButton: Block;
    link: Block;
    events: {
        submit: (e: SubmitEvent) => void;
    };
}

const user: User = {
    email: 'pochta@yandex.ru',
    login: 'kvitkina',
    first_name: 'Ирина',
    second_name: 'Квиткина',
    phone: '+79099673030',
    display_name: 'kvitkina',
    avatar: '',
    id: '',
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

export class ProfilePage extends Block<Props> {
    constructor(props: Props) {
        super('section', props);
        this.element?.classList.add('profile');
    }

    init(): void {
        this.props.user = user;
        this.children.inputs = profileInputs.map((item) => new ProfileInput(item));
        (this.children.actions = new ProfileButton({ title: 'Изменить данные' })),
        new ProfileButton({ title: 'Изменить пароль' });
        this.children.saveButton = new Button({ title: 'Сохранить' });
        this.children.link = new Link({ label: 'Выйти', to: '/', className: 'profile__link'});
        this.children.arrowButton = new ArrowButton({ modifier: 'arrow-button_back' });
        this.props.events = {
            submit: (e) => {
                onFormSubmit(e);
            },
        };
    }

    render(): DocumentFragment {
        return this.compile(tmpl, this.props);
    }
}
