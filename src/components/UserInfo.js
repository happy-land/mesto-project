export default class UserInfo {
  constructor(userName, userDescription) {
    this.userName = userName;
    this.userDescription = userDescription;
  }

  getUserInfo(api) {
    return api
      .getUser()
      .then((user) => {

        this.name = user.name;
        this.about = user.about;
        console.log(this);
      })
      .catch((error) => console.log('Error: ', error));
  }

  setUserInfo(api, name, about) {
    api
      .updateProfile(name, about)
      .then((userData) => {
        this.userName.textContent = userData.name;
        this.userDescription.textContent = userData.about;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // renderLoading(false, popupProfileEditElement);
      });
  }
}

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать
//от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя
//нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
