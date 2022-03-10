import Api from '../components/api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';
import { inputFieldStateCheck } from '../utils/utils.js';
// import { openPopup, closePopup, updateSubmitButtonState } from '../components/modal.js';
import { enableValidation } from '../components/validate.js';
import {
  popupProfileEditElement,
  popupPlaceNewElement,
  popupAvatarEditElement,
  popupRemoveCardElement,
  popupProfileEditSelector, // '.popup_type_profile-edit'
  popupPlaceNewSelector, // '.popup_type_place-new'
  popupAvatarEditSelector, // '.popup_type_avatar-edit'
  popupRemoveCardSelector, // '.popup_type_remove-card'
  popupImageSelector, // '.popup_type_photo-view'
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
  removeCardForm,
  cardTemplate,
  cardsContainer,
  cardListSelector,
} from '../utils/constants.js';

import '../pages/index.css';

// Создаем обьект Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f3d57c75-f8a6-4acb-a0b6-75252be6dd05',
    'Content-Type': 'application/json',
  },
});

// id текущего пользователя
let currentUserId;

// создаем объект section класса Section
const section = new Section(
  {
    // Отрисовка каждого отдельного элемента функцией renderer
    // cardData - отдельная карточка (со свойствами link, name...)
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        currentUserId,
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
        cardTemplate
      );
      const cardElement = card.getView();
      section.addItem(cardElement);
    },
  },
  cardListSelector
);

const userInfo = new UserInfo(profileUsername, profileDescription);

// попап - открыть картинку
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// попапы с формой

// было:
// const popupAvatar = new PopupWithForm(popupAvatarEditSelector, (evt) => {
//   handleAvatarFormSubmit(evt);
// });

// стало:
const popupAvatar = new PopupWithForm(popupAvatarEditSelector, {
  submit: () => {
    renderLoading(true, popupAvatarEditElement);
    api
      .updateAvatar(avatarInput.value)
      .then((userData) => {
        avatarLogo.src = userData.avatar;
        // закрываем попап
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupAvatarEditElement);
      });
  },
});
popupAvatar.setEventListeners();

const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, {
  submit: () => {
    userInfo.setUserInfo(api, nameInput.value, jobInput.value);
    popupProfileEdit.close();
  },
});
popupProfileEdit.setEventListeners();

// const popupAddCard = new PopupWithForm(popupPlaceNewSelector, handleNewSubmit);
// popupAddCard.setEventListeners();

const popupAddCard = new PopupWithForm(popupPlaceNewSelector, {
  submit: () => {
    // console.log(popupAddCard.formData);
    // formData.place = 123
    // formData.imagelink = http://otpuskthai.ru/wp-content/uploads/2014/02/ramboutan.jpg
    console.log('currentUserId = ' + currentUserId);
    api
      .addCard(placeInput.value, imageUrlInput.value)
      .then((cardData) => {
        const newCard = new Card(
          {
            ...cardData,
            cardId: cardData._id,
            ownerId: cardData.owner._id,
          },
          currentUserId,
          handleCardClick,
          handleLikeClick,
          handleDeleteClick,
          cardTemplate
        );

        const cardElement = newCard.getView();
        section.addItem(cardElement, 'start');

        // закрываем попап
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // renderLoading(false, popupAddCard);
      });
  },
});
popupAddCard.setEventListeners();


// const handleDeleteSubmit = (cardElement, cardId, event) => {
//   event.preventDefault();

//   deleteCard(cardId)
//     .then((res) => {
//       cardElement.closest('.card').remove();
//       card.remove();
//       closePopup(popupRemoveCardElement);
//     })
//     .catch((err) => console.log(err));
// };


const popupRemoveCard = new PopupWithForm(popupRemoveCardSelector, {
  submit: (card) => {
    console.log('popupRemoveCard + card._id' + card._id);

  }
});
popupRemoveCard.setEventListeners();

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
api
  .getAppInfo()
  .then(([user, cardData]) => {
    profileAvatar.src = user.avatar;
    profileUsername.textContent = user.name;
    profileDescription.textContent = user.about;

    currentUserId = user._id;
    userInfo.getUserInfo(api);
    section.renderItems(cardData);
  })
  .catch((err) => console.log('ОШИБКА --- ' + err));

const handleCardClick = (card, title, image) => {
  const cardElement = card.element();
  popupImage.open(title, image);
};

// обработчики кликов на кнопки карточки
// принимают на вход id карточки и другие ее данные, которые важны
const handleLikeClick = (card) => {
  const cardElement = card.element();
  const cardId = card.id();

  const likeButton = cardElement.querySelector('.card__like-button');

  if (likeButton.classList.contains('card__like-button_active')) {
    api
      .removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_active');
        cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
      })
      .catch((err) => console.log(err));
  }
};

// const handleDeleteSubmit = (cardElement, cardId, event) => {
//   event.preventDefault();

//   deleteCard(cardId)
//     .then((res) => {
//       cardElement.closest('.card').remove();
//       card.remove();
//       closePopup(popupRemoveCardElement);
//     })
//     .catch((err) => console.log(err));
// };

const handleDeleteClick = (card) => {
  // openPopup(popupRemoveCardElement);
  popupRemoveCard.open();
  popupRemoveCard.confirmDeleteCard(card);
  // обработчик формы - подтвердить удаление карточки
  // removeCardForm.addEventListener('submit', (event) => {
  //   handleDeleteSubmit(cardElement, cardId, event);
  // });
};

/* **********************    Кнопки вызова попапов   ********************** */

editAvatarIcon.addEventListener('click', () => {
  inputFieldStateCheck(popupAvatarEditElement);
  popupAvatar.open();
  // updateSubmitButtonState(popupAvatarEditElement);
});

editProfileButton.addEventListener('click', () => {
  popupProfileEdit.open();
  userInfo.getUserInfo(api);

  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;

  // inputFieldStateCheck(popupProfileEditElement);
  // updateSubmitButtonState(popupProfileEditElement);
});

addPlaceButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  // updateSubmitButtonState(popupPlaceNewElement);
});

// перенести в utils.js
export const renderLoading = (isLoading, popup) => {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};


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
