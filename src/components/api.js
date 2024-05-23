//ф-и взаимодействия с сервером
const getCurrentProfile = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/users/me", {
    headers: {
      authorization: "beb4447c-03b3-4004-a487-88a53c0f8269",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

const getCurrentCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/cards", {
    headers: {
      authorization: "beb4447c-03b3-4004-a487-88a53c0f8269",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
const editProfile = (name, about) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/users/me", {
    method: "PATCH",
    headers: {
      authorization: "beb4447c-03b3-4004-a487-88a53c0f8269",
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
      return Promise.reject(`Error`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

const postNewCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/cards", {
    method: "POST",
    headers: {
      authorization: "beb4447c-03b3-4004-a487-88a53c0f8269",
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
      return Promise.reject(`Error`);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

const deleteMyCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/cohortId/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: "beb4447c-03b3-4004-a487-88a53c0f8269",
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
    console.log(`Error: ${err}`);
  });
};

export { getCurrentProfile, getCurrentCards, editProfile, postNewCard, deleteMyCard };
