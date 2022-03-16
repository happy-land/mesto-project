export const renderLoading = (isLoading, popup) => {
  const button = popup.getForm().querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};
