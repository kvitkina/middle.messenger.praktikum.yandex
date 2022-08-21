import Error404 from './Error404.hbs';
import ServiseError from '../../components/ServiceError';

export default Error404({
	serviceError: ServiseError('404', 'Не туда попали'),
});
