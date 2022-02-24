import { showImagePopup } from './modal.js';
import { cardTemplate, cardsContainer } from '../utils/constants.js';

export default class Card {
  // constructor({ cardData, handleCardClick, handleLikeClick, handleDeleteClick }, userId, cardSelector) {

  // { name, link, likes, cardId, ownerId },
  // currentUserId,
  // handleLikeClick,
  // handleDeleteClick

  constructor(
    { name, link, likes, cardId, ownerId },
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    cardSelector
  ) {
    // console.log(`cardData: ${cardData.name}`);
    // console.log(name);
    this._id = cardId;
    this._title = name; // name
    this._image = link; // link
    this._likes = likes;
    this._ownerId = ownerId;

    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick; // handleDeleteClick(card)

    // console.log(cardSelector);

    this._cardSelector = cardSelector;
  }

  // до этого эта функция была renderCard
  getView() {
    // console.log(`getView(): this._element = ${this._element}`);
    this._element = this._getTemplate();

    // console.log(`getView(): this._element = ${this._element}`);

    this._element.querySelector('.card__title').textContent = this._title;
    const image = this._element.querySelector('.card__image');
    image.src = this._image;
    image.alt = this._title;

    // обновляем состояние лайков при создании карточки
    this._updateLikesView();

    // обработчики
    // посчитать сколько лайков
    // лайкали ли карточки или нет
    this._setEventListeners();

    return this._element;
  }

  remove() {
    // из верстки карточку удалили
    this._element.remove();
    // из памяти карточку удалили
    this._element = null;
  }

  // id() {
  //   return this._id;
  // }

  isLiked() {
    // есть ли среди эти лайков наш
    // было:
    // const isLiked = Boolean(likes.find((user) => user._id === currentUserId));

    // стало:
    return Boolean(this._likes.find((user) => user._id === this._userId));
  }

  updateLikes(cardData) {
    this._likes = cardData.likes;
    this._updateLikesView();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    // обработчик удаления карточки
    this._element.querySelector('.card__trash-icon').addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    // //  обработчки клика на лайк -  хендл кард клик передать через this updateLikes
    // this._element.querySelector('.card__like-button').addEventListener('click', () => {
    //   this._handleLikeClick(this);
    // });

    // // ....обработчик клика на саму карточку  - открывается попап с картинкой
    // this._element.querySelector('.card').addEventListener('click', () => {
    //   this._handleCardClick(this);
    // });
  }

  _updateLikesView() {
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    const like = this._element.querySelector('.card__like-button');

    if (this.isLiked()) {
      like.classList.add('card__like-button_active');
    } else {
      like.classList.remove('card__like-button_active');
    }
  }

  // функция создает карточку
  // createCard(
  //   { name, link, likes, cardId, ownerId },
  //   currentUserId,
  //   handleLikeClick,
  //   handleDeleteClick
  // ) {
  //   const element = cardTemplate.querySelector('.card').cloneNode(true);
  //   const title = element.querySelector('.card__title');
  //   const image = element.querySelector('.card__image');
  //   const likeElement = element.querySelector('.card__like-button');
  //   const likeCounterElement = element.querySelector('.card__like-counter');

  //   title.textContent = name;
  //   image.src = link;
  //   image.alt = name;

  //   // посчитать общее количество лайков
  //   likeCounterElement.textContent = likes.length.toString();

  //   // есть ли среди эти лайков наш
  //   const isLiked = Boolean(likes.find((user) => user._id === currentUserId));

  //   if (isLiked) {
  //     // toggleLike(likeElement);
  //     likeElement.classList.add('card__like-button_active');
  //   }

  //   likeElement.addEventListener('click', () =>
  //     handleLikeClick(element, cardId, isLiked)
  //   );

  //   // выяснить, можем ли мы удалять данную карточку
  //   const trashButtonElement = element.querySelector('.card__trash-icon');
  //   const isOwner = ownerId === currentUserId;
  //   trashButtonElement.classList.add(
  //     isOwner ? 'card__trash-icon_visible' : 'card__trash-icon_hidden'
  //   );

  //   trashButtonElement.addEventListener('click', () =>
  //     handleDeleteClick(element, cardId)
  //   );

  //   // навесить обработчики
  //   setEventListeners(element, name, link);

  //   return element;
  // }

  // функция добавляет карточку в DOM
  // пользовательские карточки - в начало контейнера (position = start)
  // renderCard(element, position = 'end') {
  //   switch (position) {
  //     case 'end':
  //       cardsContainer.append(element);
  //       break;
  //     case 'start':
  //       cardsContainer.prepend(element);
  //       break;
  //   }
  // }

  // и обработчик клика по картинке (просмотр фото)
  // _setEventListeners(element, cardTitle, cardUrl) {
  //   const imageElement = element.querySelector('.card__image');
  //   imageElement.addEventListener('click', () => {
  //     showImagePopup(cardTitle, cardUrl);
  //   });
  // }
}
