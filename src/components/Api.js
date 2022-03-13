export default class Api { 
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res){
    return res.ok ? res.json() : Promise.reject(res.status);
  };
  
  // получить пользователя
  getUser(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponse);
  };
  
  // получить начальные карточки с сервера
  _getCards(){
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponse);
  };
  
  getAppInfo(){
    return Promise.all([this.getUser(), this._getCards()]);
  };
  
  // обновить профиль
  updateProfile(name, about){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    }).then(this._getResponse);
  };
  
  // обновить аватар
  updateAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    }).then(this._getResponse);
  };
  
  // добавить новую карточку
  addCard(name, link){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    }).then(this._getResponse);
  };
  
  // удалить карточку
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse);
  };
  
  // добавить лайк
  addLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponse);
  };
  
  // удалить лайк
  removeLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse);
  };
}


