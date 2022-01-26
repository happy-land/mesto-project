import { popups, validationConfig } from '../index.js';
import { toggleButtonState } from './validate.js';
const popupPhotoViewElement = document.querySelector('.popup_type_photo-view');

// Функция открывает попап
const openPopupHandler = (popup) => {
  popup.classList.add('popup_opened');
  updateSubmitButtonState(popup);
  document.addEventListener('keydown', createEscHandler);
  // createEscHandler(popup);
};

// функция обновляет состояние кнопки submit при открытии попапа
const updateSubmitButtonState = (popup) => {
  // Найдём в текущей форме попапа все инпуты
  const inputList = Array.from(popup.querySelectorAll(validationConfig.inputSelector));

  // Найдём в текущей форме попапа кнопку отправки
  const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};

// Функция закрывает попап
const closePopupHandler = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', createEscHandler);
};

const createEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopupHandler(popup);
      }
    });
  }
};

// открыть попап с фото
const showImageHandler = (cardTitle, cardUrl) => {
  openPopupHandler(popupPhotoViewElement);

  const popupContainer = popupPhotoViewElement.querySelector('.popup__container');

  const photoViewElement = popupContainer.querySelector('.photo-view');

  const image = photoViewElement.querySelector('.photo-view__image');
  const title = photoViewElement.querySelector('.photo-view__title');

  image.src = cardUrl;
  image.alt = cardTitle;
  title.textContent = cardTitle;
};

export { openPopupHandler, closePopupHandler, showImageHandler };
