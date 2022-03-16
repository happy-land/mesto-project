export default class UserInfo {
  constructor({ profileUsername, profileDescription, avatarLogo, currentUserId, renderLoading }) {
    this._userName = profileUsername;
    this._userDescription = profileDescription;
    this._avatar = avatarLogo;
    this._id = currentUserId;
    this._renderLoading = renderLoading;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
