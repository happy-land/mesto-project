// Массив попапов
const popups = document.querySelectorAll('.popup');

const popupProfileEditElement = document.querySelector('.popup_type_profile-edit');
const popupPlaceNewElement = document.querySelector('.popup_type_place-new');

// Кнопки
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addPlaceButtonElement = document.querySelector('.profile__add-button');

// Форма редактирования профиля
const profileEditFormElement = document.querySelector('.form');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');

// Функция открывает попап в зависимости от класса
const openPopupHandler = (event) => {
  console.log('нажата кнопка ' + event.target.classList);
  popups.forEach(popup => {
    if (event.target.classList.contains('profile__edit-button') &&
      popup.classList.contains('popup_type_profile-edit')) {
      // открыть попап с классом popup_type_profile-edit
      popup.classList.add('popup_opened');
    }

    if (event.target.classList.contains('profile__add-button') &&
      popup.classList.contains('popup_type_place-new')) {
      // открыть попап с классом popup_type_place-new
      popup.classList.add('popup_opened');
    }
  })
}

editProfileButtonElement.addEventListener('click', openPopupHandler);
addPlaceButtonElement.addEventListener('click', openPopupHandler);

// выбрать кнопки закрытия у всех модальных окон
// и повесить обработчик закрытия окна при клике
popups.forEach(popup => {
  popup.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      popup.classList.remove('popup_opened');
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
  document.querySelector('.popup_type_profile-edit').classList.remove('popup_opened');
}

profileEditFormElement.addEventListener('submit', profileEditSubmitHandler);


/* **********************    Карточки   ********************** */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.cards');

// функция addCard добавляет начальные карточки по порядку (position = end)
// а также добавляет пользовательские карточки в начало контейнера (position = start)
const addCard = (cardTitle, cardUrl, position = 'end') => {
  console.log(position);
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardUrl;
  cardElement.querySelector('.card__image').alt = cardTitle;

  switch (position) {
    case 'end':
      cardsContainer.append(cardElement);
      break;
    case 'start':
      cardsContainer.prepend(cardElement);
      break;
  }
}

// Шесть карточек из коробки
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}


/* **********************    Добавление новой карточки   ********************** */

// Форма редактирования новой карточки
const placeNewFormElement = popupPlaceNewElement.querySelector('form');
const placeInput = document.querySelector('#place');
const imageUrlInput = document.querySelector('#imagelink');

const placeNewSubmitHandler = (event) => {
  event.preventDefault();

  // повторно используем функцию addCard()
  addCard(placeInput.value, imageUrlInput.value, 'start');

  // закрываем попап
  document.querySelector('.popup_type_place-new').classList.remove('popup_opened');
}

placeNewFormElement.addEventListener('submit', placeNewSubmitHandler);



