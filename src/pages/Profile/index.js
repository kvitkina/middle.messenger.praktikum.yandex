import tmpl from './Profile.hbs';
import ProfileButton from '../../components/ProfileButton';

import './Profile.scss';

const User = {
    mail: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    phone: '+7 (909) 967 30 30',
    display_name: 'Иван'
}

const Profile = tmpl({
	user: User,
    actions: [ProfileButton('Поменять данные'), ProfileButton('Поменять пароль')]
})

export default Profile
