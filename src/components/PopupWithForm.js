import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(popUpSelector, {submit}) {
    super(popUpSelector);
    this._popupElement = document.querySelector(popUpSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submit = submit;
    this.formData = {};
  }
  
  setEventListeners() {
    super.setEventListeners();

    this._getInputValues();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submit();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  element() {
    return this._formElement;
  }

  _getInputValues() {
    const formInputList = this._formElement.querySelectorAll('.popup__input');
    Array.from(formInputList).forEach(element => {
      this.formData[element.name] = element.value;
    });
    return this.formData;
  }
}