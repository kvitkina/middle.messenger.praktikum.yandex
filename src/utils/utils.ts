import { REGEXP } from './constants';

export interface ValidationObject {
    errorClass: string;
    errorClassVisible: string;
}

export const inputValidator = (
    event: Event,
    element: HTMLElement,
    validationObject: ValidationObject
): void => {
    const { errorClass, errorClassVisible } = validationObject;
    const item = event.target as HTMLInputElement;
    const expression: RegExp = REGEXP[item.name].expression;
    const isValid: boolean = expression.test(item.value);
    const errorElement: HTMLElement | null = element!.querySelector(errorClass);
    if (isValid) {
        if (event.type === 'focusout') {
            errorElement!.classList.remove(errorClassVisible);
            errorElement!.textContent = '';
        }
    } else {
        errorElement!.classList.add(errorClassVisible);
        errorElement!.textContent = REGEXP[item.name].errorMessage;
    }
};

export const onFormSubmit = (e: Event): void => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    const formValues: Record<string, string> = {};

    const hasInvalidInput: boolean = Array.from(inputs).some(
        (input) => !REGEXP[input.name].expression.test(input.value)
    );

    if (hasInvalidInput) {
        return;
    }
    inputs.forEach((input) => (formValues[input.name] = input.value));
    console.log(formValues);
};
