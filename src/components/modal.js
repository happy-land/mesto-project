import { popups, validationConfig } from './index.js';
import { toggleButtonState } from './validate.js';
const popupPhotoViewElement = document.querySelector('.popup_type_photo-view');

const popupContainer = popupPhotoViewElement.querySelector('.popup__container');
const photoViewElement = popupContainer.querySelector('.photo-view');
const image = photoViewElement.querySelector('.photo-view__image');
const title = photoViewElement.querySelector('.photo-view__title');

// Функция открывает попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
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
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
};

const handleEscKey = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
};

// открыть попап с фото
const showImagePopup = (cardTitle, cardUrl) => {
  openPopup(popupPhotoViewElement);

  image.src = cardUrl;
  image.alt = cardTitle;
  title.textContent = cardTitle;
};

export { openPopup, closePopup, updateSubmitButtonState, showImagePopup };
