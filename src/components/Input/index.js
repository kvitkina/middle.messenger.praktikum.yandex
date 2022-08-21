import tmpl from './Input.hbs';

import './Input.scss';

export default (label, type, value, name, error) => {
    return tmpl({ label, type, value, name, error });
};