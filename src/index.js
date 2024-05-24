import './vendor/fonts.css';
import './pages/index.css';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { handleOpenPopup, handleClosePopup, handleClosePopupOnOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { setConfig, getCurrentProfile, getCurrentCards, editProfile, postNewCard, updateAvatar } from './components/api.js';

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
const profileAvatar = document.querySelector('.profile__image');
const popupDelete = document.querySelector('.popup_type_delete-card');
const deleteCardBtn = popupDelete.querySelector('.popup__button');
const popupNewAvatar = document.querySelector('.popup_type_new_avatar');
const formNewAavtarLink = document.forms['new-avatar'];
const inputNewAvatar = document.querySelector('.popup__input_type_avatar-link');

//объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

setConfig({
  token: 'beb4447c-03b3-4004-a487-88a53c0f8269',
  groupId: 'wff-cohort-13'
});

// функция открытия попапа с картинкой
function handleOpenPopupImage(popupImage, card) {
  handleOpenPopup(popupImage);
  const popupImg = popupImage.querySelector('.popup__image');
  const popupImgCaption = popupImage.querySelector('.popup__caption');
  popupImg.src = card.link;
  popupImgCaption.textContent = card.name;
};

function handleOpenDelete(popupDelete,card) {
  handleOpenPopup(popupDelete)
}

deleteCardBtn.addEventListener('click', () => {
  deleteCard(cardElement, card);
});

// функция заполнения формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  const submitText = evt.submitter.textContent;
  evt.submitter.textContent = 'Сохранение...';
  editProfile(nameInput.value, jobInput.value).then((profile) => {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    evt.submitter.textContent = submitText;
    handleClosePopup(popupEdit);
  });
};

//функция заполнения формы новой карты
function handleCardSubmit(evt, cb) {
  evt.preventDefault();
  const submitText = evt.submitter.textContent;
  evt.submitter.textContent = 'Сохранение...';
  postNewCard(inputPlace.value, inputLink.value).then((newCard)=>{
    cb(newCard);
    evt.submitter.textContent = submitText;
    handleClosePopup(popupNewCard);
  });
};

// слушатели на кнопки, открывающие попапы
profileEditBtn.addEventListener('click', function() {
  handleOpenPopup(popupEdit);
  clearValidation(popupProfile, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addCardBtn.addEventListener('click', () => {
  handleOpenPopup(popupNewCard);
  placeForm.reset();
  clearValidation(placeForm, validationConfig);
});

profileAvatar.addEventListener('click', function() {
  handleOpenPopup(popupNewAvatar);
  clearValidation(formNewAavtarLink, validationConfig);
});

// слушатели на закрытие попапов кликом по оверлею
popups.forEach( function(popup) {
  popup.addEventListener('click', handleClosePopupOnOverlay);
});

// слушатели на кнопки, закрывающие попапы
popupBtnCloseList.forEach(function(btn) {
  const popupElement = btn.closest('.popup');
  btn.addEventListener('click', () => {
    handleClosePopup(popupElement);
  });
});

//слушатель на кнопку изменения автара
formNewAavtarLink.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const submitText = evt.submitter.textContent;
  evt.submitter.textContent = 'Сохранение...';
  updateAvatar(inputNewAvatar.value)
  .then((res) => {
    handleClosePopup(popupNewAvatar);
    profileAvatar.style = `background-image: url('${res.avatar}')`;
    evt.submitter.textContent = submitText;
  });
});

// слушатель на кнопку сохранения профиля
popupProfile.addEventListener('submit', (evt) => handleProfileSubmit(evt));

// слушатель на кнопку создания новой нарты
placeForm.addEventListener('submit', (evt) => handleCardSubmit(evt, function(card) {
  const cardElement = createCard(card, likeCard, handleOpenPopupImage, deleteCard, popupImage, cardTemplate, true, false);
  cardContainer.prepend(cardElement);
}));

// слушатель на кнопку удаления карты
popupDelete.addEventListener('submit', () => deleteCard(cardElement,card))



//использование данных, полученных из запросов
Promise.all([getCurrentProfile(), getCurrentCards()]).then((results) => {
  const profile = results[0];
  const cardList = results[1];

  cardList.forEach(function (card) {
    const canDelete = (profile._id === card.owner._id);
    const isLiked = card.likes.some((person) => {
      return person._id === profile._id;
    });
    const cardElement = createCard(card, likeCard, handleOpenPopupImage, deleteCard, popupImage, cardTemplate, canDelete, isLiked);
  cardContainer.append(cardElement);
  });

  profileName.textContent = profile.name;
  profileJob.textContent = profile.about;
  profileAvatar.style = `background-image: url('${profile.avatar}')`;

});

// включение валидации форм
enableValidation(validationConfig);


