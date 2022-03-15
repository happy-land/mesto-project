import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popUpSelector){
    super(popUpSelector);
    this._imageElement = this._popup.querySelector('.photo-view__image');
    this._titleElement = this._popup.querySelector('.photo-view__title');
  }

  open(title, image) {
    super.open()
    this._imageElement.src = image;
    this._imageElement.alt = title;
    this._titleElement.textContent = title;
  }
}