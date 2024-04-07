const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;


function createCard(card, deleteCard) {
  let cardElement = cardTemplate.querySelector(".card");
  let cardImg = cardElement.querySelector(".card__image");
  let cardName = cardElement.querySelector(".card__description");

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
