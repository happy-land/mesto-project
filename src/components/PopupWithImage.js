import Popup from "./Popup";
import { imageElement, titleElement } from '../utils/constants';

export default class PopupWithImage extends Popup {
  constructor(popUpSelector){
    super(popUpSelector);
  }

  open(title, image) {
    super.open()
    imageElement.src = image;
    imageElement.alt = title;
    titleElement.textContent = title;
  }
}