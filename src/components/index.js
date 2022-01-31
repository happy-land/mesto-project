import { createCard, renderCard } from './card.js';
import { openPopup, closePopup, updateSubmitButtonState } from './modal.js';
import { enableValidation } from './validate.js';
import {
  getAppInfo,
  updateProfile,
  addLike,
  removeLike,
  addCard,
  deleteCard,
  updateAvatar,
} from './api.js';
import '../pages/index.css';

// Массив попапов
export const popups = document.querySelectorAll('.popup');

const popupProfileEditElement = document.querySelector('.popup_type_profile-edit');
const popupPlaceNewElement = document.querySelector('.popup_type_place-new');
const popupAvatarEditElement = document.querySelector('.popup_type_avatar-edit');

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button');

const avatarLogo = document.querySelector('.profile__avatar');
const editAvatarIcon = document.querySelector('.profile__edit-avatar');

const addPlaceButtonElement = document.querySelector('.profile__add-button');

// Сохраним в переменные значения полей из профиля - аватар, имя пользователя и описание
const profileAvatar = document.querySelector('.profile__avatar');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');

// Форма редактирования аватара
const editAvatarForm = document.forms.editavatarform;
const avatarInput = editAvatarForm.elements.avatar;

// Форма редактирования профиля
const editProfileForm = document.forms.editprofileform;
const nameInput = editProfileForm.elements.username;
const jobInput = editProfileForm.elements.description;

// Форма редактирования новой карточки
const newPlaceForm = document.forms.newplaceform;
const placeInput = newPlaceForm.elements.place;
const imageUrlInput = newPlaceForm.elements.imagelink;

// id текущего пользователя
let currentUserId;

// редактирование аватара
const handleMouseOver = (evt) => {
  editAvatarIcon.classList.remove('profile__edit-avatar_hidden');
};

const handleMouseOut = (evt) => {
  editAvatarIcon.classList.add('profile__edit-avatar_hidden');
};

avatarLogo.addEventListener('mouseover', handleMouseOver);
avatarLogo.addEventListener('mouseout', handleMouseOut);

// Загрузка данных о пользователе и массив карточек - одним промисом
getAppInfo()
  .then(([user, cardData]) => {
    profileAvatar.src = user.avatar;
    profileUsername.textContent = user.name;
    profileDescription.textContent = user.about;

    currentUserId = user._id;

    cardData.forEach((cardEl) => {
      const cardElement = createCard(
        {
          ...cardEl,
          cardId: cardEl._id,
          ownerId: cardEl.owner._id,
        },
        currentUserId,
        handleCardLike,
        handleCardDelete
      );

      renderCard(cardElement);
    });
  })
  .catch((err) => console.log(err));

// обработчики кликов на кнопки карточки
// принимают на вход id карточки и другие ее данные, которые важны
const handleCardLike = (cardElement, cardId, isLiked) => {
  if (
    cardElement
      .querySelector('.card__like-button')
      .classList.contains('card__like-button_active')
  ) {
    removeLike(cardId)
      .then((card) => {
        cardElement
          .querySelector('.card__like-button')
          .classList.remove('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((card) => {
        cardElement
          .querySelector('.card__like-button')
          .classList.add('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  }
};

const handleCardDelete = (cardElement, cardId) => {
  deleteCard(cardId)
    .then((res) => {
      cardElement.closest('.card').remove();
    })
    .catch((err) => console.log(err));
};

/* **********************    Попапы   ********************** */

editAvatarIcon.addEventListener('click', () => {
  openPopup(popupAvatarEditElement);
  updateSubmitButtonState(popupAvatarEditElement);
});

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

const renderLoading = (isLoading, popup) => {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};

// обработчик формы - Редактирование аватара
const handleAvatarFormSubmit = (event) => {
  event.preventDefault();

  renderLoading(true, popupAvatarEditElement);
  updateAvatar(avatarInput.value)
  .then((userData) => {
    avatarLogo.src = userData.avatar;
    // закрываем попап
    closePopup(popupAvatarEditElement);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderLoading(false, popupAvatarEditElement);
  })
};

editAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

// обработчик формы - Редактирование профиля
const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading(true, popupProfileEditElement);
  updateProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      // вставить значение nameInput.value
      profileUsername.textContent = userData.name;

      // вставить значение jobInput.value
      profileDescription.textContent = userData.about;
      // закрываем попап
      closePopup(popupProfileEditElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupProfileEditElement);
    });
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// обработчик формы - Новая карточка
const handleNewSubmit = (event) => {
  event.preventDefault();

  renderLoading(true, popupPlaceNewElement);
  addCard(placeInput.value, imageUrlInput.value)
    .then((cardData) => {
      const newCard = createCard(
        {
          ...cardData,
          cardId: cardData._id,
          ownerId: cardData.owner._id,
        },
        currentUserId,
        handleCardLike,
        handleCardDelete
      );

      renderCard(newCard, 'start');

      // очищаем форму
      newPlaceForm.reset();

      // закрываем попап
      closePopup(popupPlaceNewElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupPlaceNewElement);
    });
};

newPlaceForm.addEventListener('submit', handleNewSubmit);

// Валидация форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);
