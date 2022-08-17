import tmpl from './Button.hbs';
import './Button.scss';

export default (title) => {
    return tmpl({ title });
};