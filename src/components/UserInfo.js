export default class UserInfo {
  constructor(userName, userDescription){
    this.userName = userName;
    this.userDescription = userDescription;
    this.userInfo = {};
  }

  getUserInfo(api) {
    api.getAppInfo()
      .then(([userData, ...res]) => {
        this.userInfo.name = userData.name;
        this.userInfo.about = userData.about;
      })
      .catch(error => console.log("Error: ", error));
    //console.log("userInfo ", this.userInfo);
    // this.userInfo.name = userData.name;
    // this.userInfo.about = userData.about;
    return this.userInfo;
  }

  setUserInfo(userData) {
    //const userInfo = this.userInfo;
    //который принимает новые данные пользователя
    //отправляет их на сервер
    // api.updateProfile(name, about)
    //   .then((userData) => {
        
    //   })
    //   .catch(error => console.log("Error: ", error));
    //добавляет их на страницу
    this.userName.textContent = userData.name;
    this.userDescription.textContent = userData.about;
  }
} 

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать
//от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя 
//нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.