import Error500 from './Error500.hbs';
import ServiseError from '../../components/ServiceError';

export default Error500({
	serviceError: ServiseError('500', 'Мы уже фиксим'),
});
