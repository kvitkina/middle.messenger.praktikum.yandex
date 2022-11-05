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
import Avatar from '../../components/Avatar';

interface Props {
    avatar: Block;
    user: User;
    inputs: Input[];
    actions: Block[];
    saveButton: Block;
    link: Block;
    popup: Block;
    events: {
        submit: (e: SubmitEvent) => void;
        click?: () => void;
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

    handleOpenPopup() {
        this.element?.querySelector('.popup')?.classList.add('popup_visible');
    }

    handleClosePopup() {
        this.element?.querySelector('.popup')?.classList.remove('popup_visible');
    }

    init(): void {
        AuthController.fetchUser();

        this.children.avatar = new Avatar({
            events: {
                click: () => {
                    this.handleOpenPopup();
                },
            },
        });
        // @ts-ignore
        this.children.inputs = profileInputs.map((item) => {
            return new ProfileInput(item);
        });
        (this.children.actions = new ProfileButton({ title: 'Изменить данные' })),
        new ProfileButton({ title: 'Изменить пароль' });
        this.children.saveButton = new Button({ title: 'Сохранить' });
        // @ts-ignore
        this.children.link = new Link({
            label: 'Выйти',
            to: '/',
            className: 'profile__link',
            handler: this.handleLogout,
        });
        // @ts-ignore
        this.children.arrowButton = new ArrowButton({ modifier: 'arrow-button_back' });
        this.children.popup = new Popup({
            title: 'Загрузите файл',
            button: new Button({ title: 'Поменять' }),
            content: new ProfileInput({ type: 'file', label: '', name: 'avatar' }),
            events: {
                submit: (e: any) => {
                    this.handleChangeAvatar(e);
                    this.handleClosePopup();
                },
            },
        });
        this.props.events = {
            submit: (e: Event) => {
                this.handleUpdateUser(e);
            },
        };
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (newProps.user) {
            // @ts-ignore
            this.children.inputs = profileInputs.map((item) => {
                // @ts-ignore
                return new ProfileInput({ ...item, value: newProps.user[item.name] });
            });
            this.children.avatar.setProps({
                avatar: `'https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}'`,
            });
        }
        return true;
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withUser = withStore((state) => ({ user: state.user }));
// @ts-ignore
export const ProfilePage = withUser(ProfilePageBase);
