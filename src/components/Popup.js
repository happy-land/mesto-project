export default class Popup {
  constructor(popUpSelector) {
    this._popUpSelector = popUpSelector;
  }

  open() {
    document.querySelector(this._popUpSelector).classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    document.querySelector(this._popUpSelector).classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    document.querySelector(this._popUpSelector).addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (
      evt.key === 'Escape' &&
      document.querySelector(this._popUpSelector).classList.contains('popup_opened')
    ) {
      this.close();
    }
  }
}
