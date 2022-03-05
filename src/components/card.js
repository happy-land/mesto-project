import { showImagePopup } from './modal.js';
import { cardTemplate, cardsContainer } from '../utils/constants.js';

export default class Card {
  constructor({ cardData, handleLikeClick, handleDeleteClick }, userId, cardSelector){
    this._id = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.cardId;
    this._ownerId = cardData.owner._id;

    this._userId = userId;

    this._handleLikeClick = handleLikeClick;

    this._cardSelector = cardSelector;
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').textContent = this._name;
    const image = this._element.querySelector('.card__image');
    image.src = this._link;
    image.alt = this._name; 

    //Как ставить лайк? 
    //const likeElement = this._element.querySelector('.card__like-button');
    // if(isLiked){
    //   this.element.classList.add('card__like-button_active');
    // }

    //const likeCounterElement = this._element.querySelector('.card__like-counter');
    //likeCounterElement.textContent = this._likes.length.toString();

    //Listeners
  }

  isLiked() {
    return Boolean(this._likes.find((user) => {user._id === this._userId}));
  }

  updateLikes(cardData) {
    this._likes = cardData.likes;
    this._updateLikesView();
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    
  }

  _updateLikesView() {
    const like = this.element.querySelector('.card__like-counter');
    this._element.querySelector('.card__like-counter').textContent = this._likes.length.toString();
    if(this.isLiked()){
      like.classList.add('card__like-button_active');
    } else {
      like.classList.remove('card__like-button_active');
    }
  }
}

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

export { createCard, renderCard };
