// Массив попапов
const popups = document.querySelectorAll('.popup');

const popupProfileEditElement = document.querySelector('.popup_type_profile-edit');
const popupPlaceNewElement = document.querySelector('.popup_type_place-new');

// Кнопки
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addPlaceButtonElement = document.querySelector('.profile__add-button');

// Форма редактирования профиля
const profileEditFormElement = document.querySelector('.form_type_profile-edit');
const nameInput = document.querySelector('.form__input_type_username');
const jobInput = document.querySelector('.form__input_type_description');

const cardsContainer = document.querySelector('.cards');

// Форма редактирования новой карточки
const placeNewFormElement = popupPlaceNewElement.querySelector('form');
const placeInput = document.querySelector('#place');
const imageUrlInput = document.querySelector('#image-link');

// Шаблон карточки - берем из html
const cardTemplate = document.querySelector('#card-template').content;


/* **********************    Попапы   ********************** */

// Функция открывает попап
const openPopupHandler = (popup) => {
  popup.classList.add('popup_opened');
}

editProfileButtonElement.addEventListener('click', () => {
  openPopupHandler(popupProfileEditElement);
});

addPlaceButtonElement.addEventListener('click', () => {
  openPopupHandler(popupPlaceNewElement);
});

// Функция закрывает попап
const closePopupHandler = (popup) => {
  popup.classList.remove('popup_opened');
}
// выбрать кнопки закрытия у всех модальных окон
// и повесить обработчик закрытия окна при клике - closePopupHandler
popups.forEach(popup => {
  const buttonPopupCloseElement = popup.querySelector('.popup__close-button');
  buttonPopupCloseElement
    .addEventListener('click', () => {
      closePopupHandler(popup);
    });
});

const profileEditSubmitHandler = (event) => {
  event.preventDefault();

  // выбрать profile__username и вставить значение nameInput.value
  const profileUsername = document.querySelector('.profile__username');
  profileUsername.textContent = nameInput.value;

  // выбрать profile__description и вставить значение jobInput.value
  const profileDescription = document.querySelector('.profile__description');
  profileDescription.textContent = jobInput.value;

  // закрываем попап
  closePopupHandler(popupProfileEditElement);
}

profileEditFormElement.addEventListener('submit', profileEditSubmitHandler);


/* **********************    Карточки   ********************** */

/* *****************    Лайк карточки + удалить карточку + клик по картинке ***************** */

// функция добавляет или удаляет лайк
const toggleLikeHandler = (event) => {
  event.preventDefault();
  event.target.classList.toggle('card__like-button_active');
}

// функция удаляет карточку (по родителю кнопки)
const removeCardHandler = (event) => {
  event.preventDefault();
  event.target.closest('.card').remove();
}

//
const showImageHandler = (cardTitle, cardUrl) => {
  // открыть попап с фото
  const popupPhotoViewElement = document.querySelector('.popup_type_photo-view');
  openPopupHandler(popupPhotoViewElement);

  const popupContainer = popupPhotoViewElement.querySelector('.popup__container');

  const photoViewElement = popupContainer.querySelector('.photo-view');

  photoViewElement.querySelector('.photo-view__image').src = cardUrl;
  photoViewElement.querySelector('.photo-view__image').alt = cardTitle;
  photoViewElement.querySelector('.photo-view__title').textContent = cardTitle;

  popupContainer.append(photoViewElement);
}

// функция задает обработчики всем кнопкам карточки,
// и обработчик клика по картинке (просмотр фото)
const setEventListeners = (element, cardTitle, cardUrl) => {
  const likeButtonElement = element.querySelector('.card__like-button');
  const trashButtonElement = element.querySelector('.card__trash-icon');
  const imageElement = element.querySelector('.card__image');

  likeButtonElement.addEventListener('click', toggleLikeHandler);
  trashButtonElement.addEventListener('click', removeCardHandler);
  imageElement.addEventListener('click', () => {
    showImageHandler(cardTitle, cardUrl);
  });
}

/* **********************    Добавить новую карточку  ********************** */
// функция создает карточку
const createCard = (cardTitle, cardUrl) => {
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  element.querySelector('.card__title').textContent = cardTitle;
  element.querySelector('.card__image').src = cardUrl;
  element.querySelector('.card__image').alt = cardTitle;

  // навесить обработчики
  setEventListeners(element, cardTitle, cardUrl);

  return element;
}

// функция добавляет карточку в DOM
// пользовательские карточки - в начало контейнера (position = start)
const renderCard = (element, position = 'end') => {
  switch (position) {
    case 'end':
      cardsContainer.append(element);
      break;
    case 'start':
      cardsContainer.prepend(element);
      break;
  }
}


/* *****************    Добавление новой карточки по клику на +   ***************** */

const placeNewSubmitHandler = (event) => {
  event.preventDefault();

  const newCard = createCard(placeInput.value, imageUrlInput.value);
  renderCard(newCard, 'start');

  // закрываем попап
  closePopupHandler(popupPlaceNewElement);
}

placeNewFormElement.addEventListener('submit', placeNewSubmitHandler);


// Шесть карточек из коробки
initialCards.forEach(element => {
  let card = createCard(element.name, element.link);
  renderCard(card);
});
