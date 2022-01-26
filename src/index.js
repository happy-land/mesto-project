import { createCard, renderCard } from './components/card.js';
import { openPopupHandler, closePopupHandler } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { initialCards } from './scripts/initial-cards.js';
import './pages/index.css';

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
  openPopupHandler(popupProfileEditElement);
});

addPlaceButtonElement.addEventListener('click', () => {
  openPopupHandler(popupPlaceNewElement);
});

// выбрать кнопки закрытия у всех модальных окон
// и повесить обработчик закрытия окна при клике - closePopupHandler
popups.forEach((popup) => {
  const buttonPopupCloseElement = popup.querySelector('.popup__close-button');
  buttonPopupCloseElement.addEventListener('click', () => {
    closePopupHandler(popup);
  });

  const popupContainer = popup.querySelector('.popup__container');
  // остановить всплытие
  popupContainer.addEventListener('click', (event) => {
    event.stopPropagation(event);
  });

  // закрываем попапы при клике по оверлею
  popup.addEventListener('click', () => {
    closePopupHandler(popup);
  });
});

// закрываем попапы при нажатии Esc
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Escape') {
//     popups.forEach((popup) => {
//       if (popup.classList.contains('popup_opened')) {
//         closePopupHandler(popup);
//       }
//     });
//   }
// });

const profileEditSubmitHandler = (event) => {
  event.preventDefault();

  // вставить значение nameInput.value
  profileUsername.textContent = nameInput.value;

  // вставить значение jobInput.value
  profileDescription.textContent = jobInput.value;

  // закрываем попап
  closePopupHandler(popupProfileEditElement);
};

editProfileForm.addEventListener('submit', profileEditSubmitHandler);

/* *****************    Добавление новой карточки по клику на +   ***************** */

const placeNewSubmitHandler = (event) => {
  event.preventDefault();

  const newCard = createCard(placeInput.value, imageUrlInput.value);
  renderCard(newCard, 'start');

  // очищаем форму
  newPlaceForm.reset();

  // закрываем попап
  closePopupHandler(popupPlaceNewElement);
};

newPlaceForm.addEventListener('submit', placeNewSubmitHandler);

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
