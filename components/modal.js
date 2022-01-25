const popupPhotoViewElement = document.querySelector('.popup_type_photo-view');

// Функция открывает попап
const openPopupHandler = (popup) => {
  popup.classList.add('popup_opened');
};

// Функция закрывает попап
const closePopupHandler = (popup) => {
  popup.classList.remove('popup_opened');
};

// открыть попап с фото
const showImageHandler = (cardTitle, cardUrl) => {
  openPopupHandler(popupPhotoViewElement);

  const popupContainer = popupPhotoViewElement.querySelector('.popup__container');

  const photoViewElement = popupContainer.querySelector('.photo-view');

  const image = photoViewElement.querySelector('.photo-view__image');
  const title = photoViewElement.querySelector('.photo-view__title');

  image.src = cardUrl;
  image.alt = cardTitle;
  title.textContent = cardTitle;
};

export { openPopupHandler, closePopupHandler, showImageHandler };