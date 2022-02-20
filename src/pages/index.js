import Api from '../components/api.js';
import { inputFieldStateCheck } from '../utils/utils.js';
import { createCard, renderCard } from '../components/card.js';
import { openPopup, closePopup, updateSubmitButtonState } from '../components/modal.js';
import { enableValidation } from '../components/validate.js';
import { popupProfileEditElement,
  popupPlaceNewElement,
  popupAvatarEditElement,
  popupRemoveCardElement,
  editProfileButton,
  avatarLogo,
  editAvatarIcon,
  addPlaceButtonElement,
  profileAvatar,
  profileUsername,
  profileDescription,
  editAvatarForm,
  avatarInput,
  editProfileForm,
  nameInput,
  jobInput,
  newPlaceForm,
  placeInput,
  imageUrlInput,
  removeCardForm } from '../utils/constants.js';

import '../pages/index.css';

// Создаем обьек Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f3d57c75-f8a6-4acb-a0b6-75252be6dd05',
    'Content-Type': 'application/json'
    }
});

// id текущего пользователя
let currentUserId;

// Массив попапов
export const popups = document.querySelectorAll('.popup');

// редактирование аватара
const handleMouseOver = () => {
  editAvatarIcon.classList.remove('profile__edit-avatar_hidden');
};

const handleMouseOut = () => {
  editAvatarIcon.classList.add('profile__edit-avatar_hidden');
};

avatarLogo.addEventListener('mouseover', handleMouseOver);
avatarLogo.addEventListener('mouseout', handleMouseOut);

// Загрузка данных о пользователе и массив карточек - одним промисом
api.getAppInfo()
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
const handleCardLike = (cardElement, cardId) => {
  const likeButton = cardElement.querySelector('.card__like-button');

  if (likeButton.classList.contains('card__like-button_active')) {
    removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  }
};

const handleDeleteSubmit = (cardElement, cardId, event) => {
  console.log(`event=${event}, cardElement=${cardElement}, cardId=${cardId}`);
  event.preventDefault();

  deleteCard(cardId)
    .then((res) => {
      cardElement.closest('.card').remove();
      closePopup(popupRemoveCardElement);
    })
    .catch((err) => console.log(err));
};

const handleCardDelete = (cardElement, cardId) => {
  openPopup(popupRemoveCardElement);
  // обработчик формы - подтвердить удаление карточки
  removeCardForm.addEventListener('submit', (event) => {
    handleDeleteSubmit(cardElement, cardId, event);
  });
};

/* **********************    Кнопки вызова попапов   ********************** */

editAvatarIcon.addEventListener('click', () => {
  inputFieldStateCheck(popupAvatarEditElement);
  openPopup(popupAvatarEditElement);
  updateSubmitButtonState(popupAvatarEditElement);
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileUsername.textContent;
  jobInput.value = profileDescription.textContent;
  inputFieldStateCheck(popupProfileEditElement);
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
    });
};

editAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

// обработчик формы - Редактирование профиля
const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading(true, popupProfileEditElement);
  api.updateProfile(nameInput.value, jobInput.value)
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
