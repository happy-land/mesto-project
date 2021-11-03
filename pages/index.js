console.log('Привет!');

const popup = document.querySelector('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', showEditProfilePopup);
popupCloseButton.addEventListener('click', closeEditProfilePopup);

// открыть попап
function showEditProfilePopup() {
  popup.classList.add('popup_opened');
}

// закрыть попап
function closeEditProfilePopup() {
  popup.classList.remove('popup_opened');
}

// Форма редактирования профиля
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');

formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  console.log(nameInput.value);
  // выбрать profile__username и вставить значение nameInput.value
  const profileUsername = document.querySelector('.profile__username');
  profileUsername.textContent = nameInput.value;

  // выбрать profile__description и вставить значение jobInput.value
  const profileDescription = document.querySelector('.profile__description');
  profileDescription.textContent = jobInput.value;

  // закрываем попап
  closeEditProfilePopup();

}
