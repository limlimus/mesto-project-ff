const cardContainer = document.querySelector(".places__list");

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__description").textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card, function () {
    cardElement.remove();
  });
  cardContainer.append(cardElement);
});
