import { hideInputError } from '../components/validate.js';

// //Удалить ошибку после проверки поля ввода
export const inputFieldStateCheck = (popup) => {
  const inputList = popup.querySelectorAll('.popup__input');
  const form = popup.querySelector('.popup__form');
  inputList.forEach(inputElement => {
    if(inputElement.classList.contains("popup__input_type_error")){
      hideInputError(form, inputElement, "popup__input_type_error", "popup__error_visible");
    }
  });
}