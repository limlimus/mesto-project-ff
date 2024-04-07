const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteCard) {
  const clone = cardTemplate.cloneNode(true);
  const cardElement = clone.querySelector(".card");
  const cardImg = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__description");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;

  deleteBtn.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  cardContainer.append(cardElement);
});
