const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

// функция создания карты
function createCard(card, deleteCard, likeCard, handleOpenPopup, cardTemplate, popupImage) {
  const clone = cardTemplate.cloneNode(true);
  const cardElement = clone.querySelector('.card');
  const cardImg = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;

  cardImg.addEventListener('click', function () {
    handleOpenPopup(popupImage);
    const popupImg = popupImage.querySelector('.popup__image');
    const popupImgCaption = popupImage.querySelector('.popup__caption');
    popupImg.src = card.link;
    popupImgCaption.textContent = card.name;
  });

  likeBtn.addEventListener('click', function () {
    likeCard(likeBtn);
  });

  deleteBtn.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// функция удаления карты
function deleteCard(cardElement) {
  cardElement.remove();
}

// функция лайка карты
function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
};

export { initialCards, createCard, deleteCard, likeCard };
