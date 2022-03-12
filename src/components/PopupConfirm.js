import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popUpSelector/*, { submit }*/) {
    super(popUpSelector);
    this._popupElement = document.querySelector(popUpSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    // this._submit = submit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  setSubmitHandler(handler) {
    this._handleSubmit = handler;
  }
}
