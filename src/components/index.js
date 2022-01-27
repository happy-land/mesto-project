import { createCard, renderCard } from './card.js';
import { openPopup, closePopup, updateSubmitButtonState } from './modal.js';
import { enableValidation } from './validate.js';
import { initialCards } from '../scripts/initial-cards.js';
import '../pages/index.css';

// Массив попапов
export const popups = document.querySelectorAll('.popup');

const popupProfileEditElement = document.querySelector('.popup_type_profile-edit');
const popupPlaceNewElement = document.querySelector('.popup_type_place-new');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButtonElement = document.querySelector('.profile__add-button');

// Кнопки submit форм
// const

// Сохраним в переменные значения полей из профиля - имя пользователя и описание
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');

// Форма редактирования профиля
const editProfileForm = document.forms.editprofileform;
const nameInput = editProfileForm.elements.username;
const jobInput = editProfileForm.elements.description;

// Форма редактирования новой карточки
const newPlaceForm = document.forms.newplaceform;
const placeInput = newPlaceForm.elements.place;
const imageUrlInput = newPlaceForm.elements.imagelink;

/* **********************    Попапы   ********************** */

editProfileButton.addEventListener('click', () => {
  
  nameInput.value = profileUsername.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfileEditElement);
  updateSubmitButtonState(popupProfileEditElement);
});

addPlaceButtonElement.addEventListener('click', () => {
  openPopup(popupPlaceNewElement);
  updateSubmitButtonState(popupPlaceNewElement);
});

// выбрать кнопки закрытия у всех модальных окон
// и повесить обработчик закрытия окна при клике - closePopup
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  // вставить значение nameInput.value
  profileUsername.textContent = nameInput.value;

  // вставить значение jobInput.value
  profileDescription.textContent = jobInput.value;

  // закрываем попап
  closePopup(popupProfileEditElement);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

/* *****************    Добавление новой карточки по клику на +   ***************** */

const handleNewSubmit = (event) => {
  event.preventDefault();

  const newCard = createCard(placeInput.value, imageUrlInput.value);
  renderCard(newCard, 'start');

  // очищаем форму
  newPlaceForm.reset();

  // закрываем попап
  closePopup(popupPlaceNewElement);
};

newPlaceForm.addEventListener('submit', handleNewSubmit);

// Шесть карточек из коробки
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link);
  renderCard(card);
});

// Валидация форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

enableValidation(validationConfig);
