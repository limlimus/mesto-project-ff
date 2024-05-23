import './vendor/fonts.css';
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { handleOpenPopup, handleClosePopup, handleClosePopupOnOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

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


// функция открытия попапа с картинкой
function handleOpenPopupImage(popupImage, card) {
  handleOpenPopup(popupImage);
  const popupImg = popupImage.querySelector('.popup__image');
  const popupImgCaption = popupImage.querySelector('.popup__caption');
  popupImg.src = card.link;
  popupImgCaption.textContent = card.name;
};

// создание первых 6ти карт
initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard, likeCard, handleOpenPopupImage, popupImage, cardTemplate);
  cardContainer.append(cardElement);
});

// функция заполнения формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClosePopup(popupEdit);
};

//функция заполнения формы новой карты
function handleCardSubmit(evt, cb) {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  cb(newCard);
  placeForm.reset();
  handleClosePopup(popupNewCard);
  enableValidation(popupNewCard, validationConfig);
};

// слушатели на кнопки, открывающие попапы
profileEditBtn.addEventListener('click', function() {
  handleOpenPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // clearValidation(popupEdit.querySelector(validationConfig.formSelector), validationConfig);
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

// слушатель на кнопку сохранения профиля
popupProfile.addEventListener('submit', (evt) => handleProfileSubmit(evt));

// слушатель на кнопку создания новой нарты
placeForm.addEventListener('submit', (evt) => handleCardSubmit(evt, function(card) {
  const cardElement = createCard(card, deleteCard, likeCard, handleOpenPopupImage,popupImage, cardTemplate);
  cardContainer.prepend(cardElement);
}));

//объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
enableValidation(placeForm, validationConfig);
enableValidation(popupProfile, validationConfig);
// очистка ошибок валидации вызовом clearValidation
//clearValidation(popupProfile, validationConfig);


