import { renderLoading } from "../utils/utils";

export default class UserInfo {
  constructor(userName, userDescription, userAvatar, userId) {
    this.userName = userName;
    this.userDescription = userDescription;
    this.avatar = userAvatar;
    this._id = userId;
  }

  // ?????

  // по заданию нельзя импортировать в файлы с классами что-либо 
  // (только класс Popup можно для наследования). Нужно использовать только мягкое связывание
  // либо через конструктор, либо через вызовы методов нужно передавать
  
  // А лучше api не использовать внутри класса вообще. Это ошибка составителей задания.
  // Ее скоро подправят

  // setRenderLoadingHandler() {

  // }


  getUserInfo(api) {
    return api
      .getUser()
      .then((user) => {
        this.name = user.name;
        this.about = user.about;
      })
      .catch((error) => console.log('Error: ', error));
  }

  setUserInfo(api, name, about, popup) {
    api
      .updateProfile(name, about)
      .then((userData) => {
        this.userName.textContent = userData.name;
        this.userDescription.textContent = userData.about;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popup); // нужно переделать, чтобы передавать эту функцию
      });
  }
}
