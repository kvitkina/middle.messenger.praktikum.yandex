import template from './Profile.hbs';
import { ProfileButton } from '../../components/ProfileButton';
import ProfileInput, { Input } from './ProfileInput';
import Button from '../../components/Button';
import './Profile.scss';
import Block from '../../utils/Block';
import { onFormSubmit } from '../../utils/utils';
import { Link } from '../../components/Link';
import { ArrowButton } from '../../components/ArrowButton';
import { User } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../utils/Store';
import UserController from '../../controllers/UserController';
import Popup from '../../components/Popup';

interface Props {
    user: User;
    inputs: Input[];
    actions: Block[];
    saveButton: Block;
    link: Block;
    popup: Block;
    events: {
        submit: (e: SubmitEvent) => void;
        click: () => void;
    };
}

const profileInputs: Input[] = [
    {
        label: 'Почта',
        type: 'email',
        name: 'email',
    },
    {
        label: 'Логин',
        type: 'text',
        name: 'login',
    },
    {
        label: 'Имя',
        type: 'text',
        name: 'first_name',
    },
    {
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
    },
    {
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
    },
    {
        label: 'Телефон',
        type: 'phone',
        name: 'phone',
    },
];

// const passwordInputs: Input[] = [
//     {
//         label: 'Старый пароль',
//         type: 'password',
//         name: 'oldPassword',
//     },
//     {
//         label: 'Новый пароль',
//         type: 'password',
//         name: 'newPassword',
//     },
//     {
//         label: 'Повторите новый пароль',
//         type: 'password',
//         name: 'newPassword',
//     },
// ];

export class ProfilePageBase extends Block<Props> {
    constructor(props: Props) {
        super('section', props);
        this.element?.classList.add('profile');
    }

    handleLogout(): void {
        AuthController.logout();
    }

    handleUpdateUser(e: Event): void {
        const data = onFormSubmit(e);
        if (data) {
            UserController.updateUser(data as any);
        }
    }

    handleChangeAvatar(e: any) {
        e.preventDefault();
        const data = new FormData(e.target);
        UserController.updateAvatar(data);
    }

    init(): void {
        AuthController.fetchUser();

        this.children.inputs = profileInputs.map((item) => {
            return new ProfileInput(item);
        });
        (this.children.actions = new ProfileButton({ title: 'Изменить данные' })),
        new ProfileButton({ title: 'Изменить пароль' });
        this.children.saveButton = new Button({ title: 'Сохранить' });
        this.children.link = new Link({
            label: 'Выйти',
            to: '/',
            className: 'profile__link',
            handler: this.handleLogout,
        });
        this.children.arrowButton = new ArrowButton({ modifier: 'arrow-button_back' });
        this.children.popup = new Popup({
            title: 'Загрузите файл',
            button: new Button({ title: 'Поменять'}),
            content: new ProfileInput({ type: 'file', label: '', name: 'avatar'}),
            events: {
                submit: (e: any) => {
                    this.handleChangeAvatar(e);
                },
            }
        });
        this.props.events = {
            submit: (e: Event) => {
                this.handleUpdateUser(e);
            },
        };
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if(newProps.user) {
            this.children.inputs = profileInputs.map((item) => {
                return new ProfileInput({ ...item, value: newProps.user[item.name]});
            });
            return true;
        }
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ user: state.user }));
export const ProfilePage = withUser(ProfilePageBase);
