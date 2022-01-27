import { showImageHandler } from './modal.js';

// Шаблон карточки - берем из html
const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.cards');

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
};

// функция создает карточку
const createCard = (cardTitle, cardUrl) => {
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  const title = element.querySelector('.card__title');
  const image = element.querySelector('.card__image');

  title.textContent = cardTitle;
  image.src = cardUrl;
  image.alt = cardTitle;

  // навесить обработчики
  setEventListeners(element, cardTitle, cardUrl);

  return element;
};

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
};

// функция добавляет или удаляет лайк
const toggleLikeHandler = (event) => {
  event.target.classList.toggle('card__like-button_active');
};

// функция удаляет карточку (по родителю кнопки)
const removeCardHandler = (event) => {
  event.target.closest('.card').remove();
};


export { createCard, renderCard };
