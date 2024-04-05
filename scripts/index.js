const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card");
const cardImg = cardElement.querySelector(".card__image");
const cardName = cardElement.querySelector(".card__description");

function createCard(card, deleteCard) {
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardName.textContent = card.name;

  const clone = cardElement.cloneNode(true);
  const deleteBtn = clone.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", function () {
    deleteCard(clone);
  });
  
  return clone;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  cardContainer.append(cardElement);
});
