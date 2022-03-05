import { showImagePopup } from './modal.js';
import { cardTemplate, cardsContainer } from '../utils/constants.js';

export default class Card {
  constructor(
    { name, link, likes, _id, ownerId },
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    cardSelector
  ) {
    this._id = _id;
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._ownerId = ownerId;

    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._cardSelector = cardSelector;
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._title;
    const image = this._element.querySelector('.card__image');
    image.src = this._image;
    image.alt = this._title;

    this._updateLikesView();

    this._setEventListeners();

    _isRemovable();

    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
  
  element() {
    return this._element;
  }

  id() {
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.card').addEventListener('click', () => {
      this._handleCardClick(this, this._title, this._image);
    });

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._element.querySelector('.card__trash-icon').addEventListener('click', () => {
      this._handleDeleteClick(this, this._id);
    });
  }

  _isLiked() {
    return Boolean(this._likes.find((user) => user._id === this._userId));
  }

  _updateLikesView() {
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    const like = this._element.querySelector('.card__like-button');

    if (this._isLiked()) {
      like.classList.add('card__like-button_active');
    } else {
      like.classList.remove('card__like-button_active');
    }
  }

  _isRemovable() {
    const trashButtonElement = this._element.querySelector('.card__trash-icon');
    const isOwner = this._ownerId === this._userId;
    trashButtonElement.classList.add(
      isOwner ? 'card__trash-icon_visible' : 'card__trash-icon_hidden'
    );
  }
}