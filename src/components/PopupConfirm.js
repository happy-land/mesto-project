import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._formElement = this._popup.querySelector('.popup__form');
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
