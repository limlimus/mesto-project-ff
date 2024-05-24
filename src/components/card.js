import { saveLike, deleteLike } from "./api";

// функция создания карты
function createCard(card, likeCard, clickCard, clickDeleteCard, popupImage, cardTemplate, canDelete, isLiked) {
  const clone = cardTemplate.cloneNode(true);
  const cardElement = clone.querySelector('.card');
  const cardImg = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount =cardElement.querySelector('.card__like_counter');
  cardElement.id = `card-${card._id}`;
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;
  likeCount.textContent = card.likes.length;

  cardImg.addEventListener('click', function () {
    clickCard(popupImage, card)
  });

  likeBtn.addEventListener('click', function () {
    likeCard(likeBtn, card, cardElement);

  });

  deleteBtn.addEventListener('click', function () {
    clickDeleteCard(cardElement, card);
  });
  //deleteBtn.addEventListener('click', function () {
   // clickDeleteCard(cardElement, card);
  //});

  if (!canDelete) {
    deleteBtn.classList.add('card__delete-button_hidden');
  };

  if (isLiked) {
    likeBtn.classList.add('card__like-button_is-active');
  };

  return cardElement;
};


// функция лайка карты
function likeCard(btn, card, cardElement) {
  btn.classList.toggle('card__like-button_is-active');
  if (btn.classList.contains('card__like-button_is-active')) {
    saveLike(card._id)
    .then((res) => {
      cardElement.querySelector('.card__like_counter').textContent = res.likes.length});
  } else {
    deleteLike(card._id)
    .then((res) => {
      cardElement.querySelector('.card__like_counter').textContent = res.likes.length});
  };
 };

export { createCard, likeCard };