import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(popUpSelector, {submit}) {
    super(popUpSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._formInputList = this._formElement.querySelectorAll('.popup__input');
    this._submit = submit;
    this.formData = {};
  }
  
  setEventListeners() {
    super.setEventListeners();

    this._getInputValues();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this._getInputValues();
      this._submit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  getForm() {
    return this._formElement;
  }

  _getInputValues() {
    Array.from(this._formInputList).forEach(element => {
      this.formData[element.name] = element.value;
    });
    return this.formData;
  }
}