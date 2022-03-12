import { validationConfig } from './constants';

// Удалить ошибку после проверки поля ввода
export const inputFieldStateCheck = (popup, formValidator) => {
  const inputList = popup.element().querySelectorAll(validationConfig.inputSelector);
  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains(validationConfig.inputErrorClass)) {
      formValidator.hideInputError(inputElement);
    }
  });
};

export const updateSubmitButtonState = (popup, formValidator) => {
  // Найдём в текущей форме попапа все инпуты
  const inputList = Array.from(popup.element().querySelectorAll(validationConfig.inputSelector));

  // Найдём в текущей форме попапа кнопку отправки
  const buttonElement = popup.element().querySelector(validationConfig.submitButtonSelector);

  formValidator.toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
};

// перенести в utils.js
export const renderLoading = (isLoading, popup) => {
  const button = popup.element().querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};
