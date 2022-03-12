import { renderLoading } from "../utils/utils";

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
        renderLoading(false, popup)
      });
  }
}
