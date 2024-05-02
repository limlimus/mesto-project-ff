import './vendor/fonts.css';
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { handleOpenPopup, handleClosePopup, handleOpenPopupImage, handleClosePopupOnOverlay } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeForm = document.forms['new-place'];
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const popupBtnCloseList = document.querySelectorAll('.popup__close');
const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// создание первых 6ти карт
initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard, likeCard, handleOpenPopupImage, popupImage, cardTemplate);
  cardContainer.append(cardElement);
});

// слушатели на кнопки, открывающие попапы
profileEditBtn.addEventListener('click', function() {
  handleOpenPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addCardBtn.addEventListener('click', () => handleOpenPopup(popupNewCard));

// слушатели на закрытие попапов кликом по оверлею
popups.forEach( function(popup) {
  popup.addEventListener('click', handleClosePopupOnOverlay);
});

// слушатели на кнопки, закрывающие попапы
popupBtnCloseList.forEach(function(btn) {
  const popupElement = btn.closest('.popup');
  btn.addEventListener('click', () => handleClosePopup(popupElement));
});

// функция заполнения формы профиля
function handleProfileSubmit(evt, nameInput, jobInput) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClosePopup(popupEdit);
}

//функция заполнения формы новой карты
function handleCardSubmit(evt, inputPlace, inputLink, cb, aaaForm) {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  cb(newCard);
  aaaForm.reset();
  handleClosePopup(popupNewCard);
};

// слушатель на кнопку сохранения профиля
popupProfile.addEventListener('submit', (evt) => handleProfileSubmit(evt, nameInput, jobInput));

// слушатель на кнопку создания новой нарты
placeForm.addEventListener('submit', (evt) => handleCardSubmit(evt, inputPlace, inputLink, function(card) {
  const cardElement = createCard(card, deleteCard, likeCard, handleOpenPopupImage,popupImage, cardTemplate);
  cardContainer.prepend(cardElement);
}, placeForm));
