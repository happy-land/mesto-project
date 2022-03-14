export default class Card {
  constructor({ cardData, handleCardClick, handleLikeClick, handleDeleteClick }, userId, cardSelector) {
    this._id = cardData._id;
    this._title = cardData.name;
    this._image = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;

    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._cardSelector = cardSelector;
  }


  getView() {
    this._element = this._getTemplate();

    this._titleElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeElement = this._element.querySelector('.card__like-button');
    this._likeCounterElement = this._element.querySelector('.card__like-counter');
    this._deleteElement = this._element.querySelector('.card__trash-icon');

    this._titleElement.textContent = this._title;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;

    this._updateLikesView();

    this._setEventListeners();

    this._isRemovable();

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
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this, this._title, this._image);
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  _isLiked() {
    return Boolean(this._likes.find((user) => user._id === this._userId));
  }

  _updateLikesView() {
    this._likeCounterElement.textContent = this._likes.length;

    if (this._isLiked()) {
      this._likeElement.classList.add('card__like-button_active');
    } else {
      this._likeElement.classList.remove('card__like-button_active');
    }
  }

  _isRemovable() {
    const isOwner = this._ownerId === this._userId;
    this._deleteElement.classList.add(
      isOwner ? 'card__trash-icon_visible' : 'card__trash-icon_hidden'
    );
  }
}
