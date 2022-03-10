import Popup from "./Popup";

export default class PopupWithForm extends Popup{


  // новая версия конструктора
  constructor(popUpSelector, {submit}) {
    super(popUpSelector);
    this._popupElement = document.querySelector(popUpSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submit = submit;
    this.formData = {};
  }

  // старая версия конструктора
  // constructor(popUpSelector, submit) {
  //   super(popUpSelector);
  //   this._popupElement = document.querySelector(popUpSelector);
  //   this._formElement = this._popupElement.querySelector('.popup__form');
  //   this._submit = submit;
  //   this.formData = {};
  // }
  
  setEventListeners() {
    super.setEventListeners();

    this._getInputValues();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('внутри addEventListener this= ' + this);

      console.log('внутри addEventListener evt.target= ' + evt.target);
      this._getInputValues();
      this._submit();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  confirmDeleteCard(card) {
    this._submit(card);
  }

  _getInputValues() {
    const formInputList = this._formElement.querySelectorAll('.popup__input');
    Array.from(formInputList).forEach(element => {
      this.formData[element.name] = element.value;
    });
    return this.formData;
  }
}