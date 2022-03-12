// селекторы попапов
export const popupProfileEditSelector = '.popup_type_profile-edit';
export const popupPlaceNewSelector = '.popup_type_place-new';
export const popupAvatarEditSelector = '.popup_type_avatar-edit';
export const popupRemoveCardSelector = '.popup_type_remove-card';

export const popupImageSelector = '.popup_type_photo-view';

export const photoContainerSelector = '.popup__container';
export const photoViewSelector = '.photo-view';
// export const imageSelector = '.photo-view__image';
// export const titleSelector = '.photo-view__title';


// Кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const avatarLogo = document.querySelector('.profile__avatar');
export const editAvatarIcon = document.querySelector('.profile__edit-avatar');
export const addPlaceButtonElement = document.querySelector('.profile__add-button');
// Сохраним в переменные значения полей из профиля - аватар, имя пользователя и описание
export const profileAvatar = document.querySelector('.profile__avatar');
export const inputAvatar = document.querySelector('#avatar-input');
export const profileUsername = document.querySelector('.profile__username');
export const profileDescription = document.querySelector('.profile__description');
// Форма редактирования аватара
export const editAvatarForm = document.forms.editavatarform;
export const avatarInput = editAvatarForm.elements.avatar;
// Форма редактирования профиля
export const editProfileForm = document.forms.editprofileform;
export const nameInput = editProfileForm.elements.username;
export const jobInput = editProfileForm.elements.description;
// Форма редактирования новой карточки
export const newPlaceForm = document.forms.newplaceform;
export const placeInput = newPlaceForm.elements.place;
export const imageUrlInput = newPlaceForm.elements.imagelink;

// Popup элементы
export const popupPhotoViewElement = document.querySelector('.popup_type_photo-view');
const popupContainer = popupPhotoViewElement.querySelector('.popup__container');
const photoViewElement = popupContainer.querySelector('.photo-view');
export const imageElement = photoViewElement.querySelector('.photo-view__image');
export const titleElement = photoViewElement.querySelector('.photo-view__title');


// Шаблон карточки - берем из html
export const cardListSelector = '.content__cards';
export const cardTemplate = '#card-template';

// Валидация форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};