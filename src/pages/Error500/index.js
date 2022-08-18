import Error500 from './Error500.hbs';
import ServiseError from '../../components/ServiceError';

import './Error500.scss';

export default Error500({
    serviceError: ServiseError('500', 'Мы уже фиксим')
});
