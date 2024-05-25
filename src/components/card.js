import { saveLike, deleteLike } from './api';
import { handleServerError } from './utils/utils.js';
// функция создания карты
function createCard(cardConfig) {
  const clone = cardConfig.cardTemplate.cloneNode(true);
  const cardElement = clone.querySelector('.card');
  const cardImg = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like_counter');
  cardElement.id = `card-${cardConfig.card._id}`;
  cardImg.src = cardConfig.card.link;
  cardImg.alt = cardConfig.card.name;
  cardName.textContent = cardConfig.card.name;
  likeCount.textContent = cardConfig.card.likes.length;

  cardImg.addEventListener('click', function () {
    cardConfig.clickCard(cardConfig.popupImage, cardConfig.card);
  });

  likeBtn.addEventListener('click', function () {
    cardConfig.likeCard(likeBtn, cardConfig.card, likeCount);
  });

  deleteBtn.addEventListener('click', function () {
    cardConfig.clickDeleteCard(cardConfig.card);
  });

  if (!cardConfig.canDelete) {
    deleteBtn.classList.add('card__delete-button_hidden');
  }

  if (cardConfig.isLiked) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

// функция лайка карты
function likeCard(btn, card, likeCount) {
  if (btn.classList.contains('card__like-button_is-active')) {
    deleteLike(card._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        btn.classList.remove('card__like-button_is-active');
      })
      .catch(handleServerError);
  } else {
    saveLike(card._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        btn.classList.add('card__like-button_is-active');
      })
      .catch(handleServerError);
  }
}

export { createCard, likeCard };
