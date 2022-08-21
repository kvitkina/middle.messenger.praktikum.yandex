import tmpl from './Form.hbs';
import './Form.scss';

export default (title, inputs, button, linkTitle, linkHref) => {
	return tmpl({ title, inputs, button, linkTitle, linkHref });
};
