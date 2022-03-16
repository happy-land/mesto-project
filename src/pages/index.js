import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import { renderLoading } from '../utils/utils.js';

import {
  popupProfileEditSelector, // '.popup_type_profile-edit'
  popupPlaceNewSelector, // '.popup_type_place-new'
  popupAvatarEditSelector, // '.popup_type_avatar-edit'
  popupRemoveCardSelector, // '.popup_type_remove-card'
  popupImageSelector, // '.popup_type_photo-view'
  editProfileButton,
  avatarLogo,
  editAvatarIcon,
  addPlaceButtonElement,
  profileUsername,
  profileDescription,
  editAvatarForm,
  editProfileForm,
  nameInput,
  jobInput,
  newPlaceForm,
  cardTemplate,
  cardListSelector,
  validationConfig,
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
      section.addItem(createCard(cardData));
    },
  },
  cardListSelector
);

const userInfo = new UserInfo({
  profileUsername,
  profileDescription,
  avatarLogo,
  currentUserId,
  renderLoading: () => {
    renderLoading(false, popupProfileEdit);
  },
});

// попап - открыть картинку
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// попапы с формой
const popupAvatar = new PopupWithForm(popupAvatarEditSelector, {
  submit: (data) => {
    renderLoading(true, popupAvatar);
    api
      .updateAvatar(data.avatar)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        // закрываем попап
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupAvatar);
      });
  },
});
popupAvatar.setEventListeners();

const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, {
  submit: (data) => {
    renderLoading(true, popupProfileEdit);
    api
      .updateProfile(data.username, data.description)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupProfileEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupProfileEdit);
      });
  },
});
popupProfileEdit.setEventListeners();

const popupAddCard = new PopupWithForm(popupPlaceNewSelector, {
  submit: (data) => {
    renderLoading(true, popupAddCard);
    api
      .addCard(data.place, data.imagelink)
      .then((cardData) => {
        section.addItem(createCard(cardData), 'start');

        // закрываем попап
        popupAddCard.close();
      })
      .catch((err) => console.log('popupAddCard: ' + err))
      .finally(() => {
        renderLoading(false, popupAddCard);
      });
  },
});
popupAddCard.setEventListeners();

const popupRemoveCard = new PopupConfirm(popupRemoveCardSelector);
popupRemoveCard.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(
    {
      cardData,
      handleCardClick,
      handleLikeClick,
      handleDeleteClick: () => {
        popupRemoveCard.open();
        popupRemoveCard.setSubmitHandler(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.getElement().remove();
              popupRemoveCard.close();
            })
            .catch((err) => console.log(err));
        });
      },
    },
    currentUserId,
    cardTemplate
  );
  return card.getView();
};

// валидация
const avatarValidator = new FormValidator(validationConfig, editAvatarForm);
const profileValidator = new FormValidator(validationConfig, editProfileForm);
const newPlaceValidator = new FormValidator(validationConfig, newPlaceForm);

avatarValidator.enableValidation();
profileValidator.enableValidation();
newPlaceValidator.enableValidation();

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
    currentUserId = user._id;
    userInfo.setUserInfo(user);
    section.renderItems(cardData);
  })
  .catch((err) => console.log('ОШИБКА -++- ' + err));

const handleCardClick = (card, title, image) => {
  popupImage.open(title, image);
};

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    api
      .removeLike(card.getId())
      .then((res) => {
        card.updateLikesView(res);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card.getId())
      .then((res) => {
        card.updateLikesView(res);
      })
      .catch((err) => console.log(err));
  }
};

/* **********************    Кнопки вызова попапов   ********************** */

editAvatarIcon.addEventListener('click', () => {
  popupAvatar.open();
  avatarValidator.resetValidation();
});

editProfileButton.addEventListener('click', () => {
  popupProfileEdit.open();
  const { name, about } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = about;

  profileValidator.resetValidation();
});

addPlaceButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  newPlaceValidator.resetValidation();
});
