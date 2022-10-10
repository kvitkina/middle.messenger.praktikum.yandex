interface RegExpContent {
    errorMessage: string;
    expression: RegExp;
}

type TRegExp = Record<string, RegExpContent>;

export const REGEXP: TRegExp = {
    login: {
        errorMessage: 'Минимум 3 символа и 1 буква',
        expression: /(^[а-яё-]+)|(^[a-z-]+)/u,
    },
    email: {
        errorMessage: 'Неверный формат',
        expression: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
    },
    first_name: {
        errorMessage: 'Введите имя c большой буквы',
        expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    },
    second_name: {
        errorMessage: 'Введите фамилию c большой буквы',
        expression: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    },
    password: {
        errorMessage: 'Добавьте 1 большую букву и цифру. Минимум 8 символов',
        expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    },
    confirm_password: {
        errorMessage: 'Добавьте 1 большую букву и цифру. Минимум 8 символов',
        expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    },
    phone: {
        errorMessage: 'Введите номер в формате +79000000000',
        expression: /^([+]{1})?[0-9]{11,15}$/,
    },
    display_name: {
        errorMessage: '',
        expression: /^/,
    },
    message: {
        errorMessage: 'Не должно быть пустым',
        expression: /^[^]+$/,
    },
    chat_title: {
        errorMessage: 'Не должно быть пустым',
        expression: /^[^]+$/,
    },
};
