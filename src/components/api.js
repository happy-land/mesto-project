const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: 'f3d57c75-f8a6-4acb-a0b6-75252be6dd05',
    'Content-Type': 'application/json',
  },
};

// получить пользователя
const getUser = () => {
  return (
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
      // .then(res => getResponseData(res));
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
  );
};

// получить начальные карточки с сервера
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};


export const getAppInfo = () => {
  return Promise.all([getUser(), getCards()]);
};

// обновить профиль
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};

// обновить аватар
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};

// добавить новую карточку
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};

// удалить карточку
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};

// добавить лайк
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    // body: JSON.stringify({

    // })
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};

// удалить лайк
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  });
};
