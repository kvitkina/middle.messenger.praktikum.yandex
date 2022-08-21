import tmpl from './ServiceError.hbs';
import './ServiceError.scss';

export default (title, subtitle) => {
    return tmpl({ title, subtitle });
};