//ф-и взаимодействия с сервером
let config;
const setConfig = (conf) => {config = conf};
const getCurrentProfile = () => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/users/me`, {
    headers: {
      authorization: `${config.token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCurrentCards = () => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/cards`, {
    headers: {
      authorization: `${config.token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
const editProfile = (name, about) => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postNewCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/cards`, {
    method: "POST",
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteMyCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error`);
  })
  .catch((err) => {
    console.log(err);
  });
};

const saveLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
};

const deleteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${config.groupId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.token}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
};


export { setConfig, getCurrentProfile, getCurrentCards, editProfile, postNewCard, deleteMyCard, saveLike, deleteLike };
