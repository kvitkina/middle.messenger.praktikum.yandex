import tmpl from './Button.hbs';
import './Button.scss';

export default (title: string) => {
	return tmpl({ title });
};
