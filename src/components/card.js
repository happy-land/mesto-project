import { showImagePopup } from './modal.js';

// Шаблон карточки - берем из html
const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.cards');

// функция задает обработчики всем кнопкам карточки,
// и обработчик клика по картинке (просмотр фото)
const setEventListeners = (element, cardTitle, cardUrl) => {
  // const likeButtonElement = element.querySelector('.card__like-button');

  // const trashButtonElement = element.querySelector('.card__trash-icon');
  const imageElement = element.querySelector('.card__image');

  // likeButtonElement.addEventListener('click', toggleLike);
  // trashButtonElement.addEventListener('click', removeCard);
  imageElement.addEventListener('click', () => {
    showImagePopup(cardTitle, cardUrl);
  });
};

// функция создает карточку
const createCard = (
  { name, link, likes, cardId, ownerId },
  currentUserId,
  handleLikeClick,
  handleDeleteClick
) => {
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  const title = element.querySelector('.card__title');
  const image = element.querySelector('.card__image');
  const likeElement = element.querySelector('.card__like-button');
  const likeCounterElement = element.querySelector('.card__like-counter');

  title.textContent = name;
  image.src = link;
  image.alt = name;

  // посчитать общее количество лайков
  likeCounterElement.textContent = likes.length.toString();

  // есть ли среди эти лайков наш
  const isLiked = Boolean(likes.find((user) => user._id === currentUserId));

  if (isLiked) {
    // toggleLike(likeElement);
    likeElement.classList.add('card__like-button_active');
  }

  likeElement.addEventListener('click', () => handleLikeClick(element, cardId, isLiked));

  // выяснить, можем ли мы удалять данную карточку
  const trashButtonElement = element.querySelector('.card__trash-icon');
  const isOwner = ownerId === currentUserId;
  trashButtonElement.classList.add(
    isOwner ? 'card__trash-icon_visible' : 'card__trash-icon_hidden'
  );

  trashButtonElement.addEventListener('click', () => handleDeleteClick(element, cardId));

  // навесить обработчики
  setEventListeners(element, name, link);

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

// ЭТИ ДВЕ ФУНКЦИИ toggleLike removeCard  - возможно надо будет удалить
// функция добавляет или удаляет лайк
// const toggleLike = (like) => {
//   like.classList.toggle('card__like-button_active');
// };

// функция удаляет карточку (по родителю кнопки)
// const removeCard = (event) => {
//   event.target.closest('.card').remove();
// };

export { createCard, renderCard };
