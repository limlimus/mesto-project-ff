// функция создания карты
function createCard(card, deleteCard, likeCard, clickCard, popupImage, cardTemplate, canDelete) {
  const clone = cardTemplate.cloneNode(true);
  const cardElement = clone.querySelector('.card');
  const cardImg = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount =cardElement.querySelector('.card__like_counter');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;
  likeCount.textContent = card.likes.length;

  cardImg.addEventListener('click', function () {
    clickCard(popupImage, card)
  });

  likeBtn.addEventListener('click', function () {
    likeCard(likeBtn);
  });

  deleteBtn.addEventListener('click', function () {
    deleteCard(cardElement, card);
  });

  if (!canDelete) {
    deleteBtn.classList.add('card__delete-button_hidden');
  }

  return cardElement;
}

// функция удаления карты
//function deleteCard(cardElement) {
  //cardElement.remove();
 // deleteMyCard(cardElement._id);
//}

// функция лайка карты
function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, likeCard };