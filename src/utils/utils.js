export const renderLoading = (isLoading, popup) => {
  const button = popup.element().querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};
