import './vendor/fonts.css';
import './pages/index.css';
import { createCard, likeCard } from './components/card.js';
import {
  handleOpenPopup,
  handleClosePopup,
  handleClosePopupOnOverlay,
} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getCurrentProfile,
  getInitialCards,
  editProfile,
  postNewCard,
  updateAvatar,
  deleteMyCard,
} from './components/api.js';
import { handleSubmit } from './components/utils/utils.js';

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
const formDelete = document.forms['delete-card'];
const inputDelete = document.querySelector('#delete-card');
const popupNewAvatar = document.querySelector('.popup_type_new_avatar');
const formNewAavtarLink = document.forms['new-avatar'];
const inputNewAvatar = document.querySelector('.popup__input_type_avatar-link');
const popupImg = popupImage.querySelector('.popup__image');
const popupImgCaption = popupImage.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


// функция открытия попапа с картинкой
function handleOpenPopupImage(popupImage, card) {
  handleOpenPopup(popupImage);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
};

// функция открытия попапа удаления карты
function openDeletePopup(card) {
  handleOpenPopup(popupDelete);
  inputDelete.value = card._id;
};

// функция заполнения формы профиля
function handleProfileSubmit(evt) {
  function makeRequest() {
    return editProfile(nameInput.value, jobInput.value).then((profile) => {
      profileName.textContent = profile.name;
      profileJob.textContent = profile.about;
    })
    .finally(() => {
      handleClosePopup(popupEdit);
    });
  }
  handleSubmit(makeRequest, evt);
};

// функция заполнения формы новой карты
function handleCardSubmit(evt, cb) {
  evt.preventDefault();
  const submitText = evt.submitter.textContent;
  submitButton.textContent = 'Сохранение...';
  postNewCard(inputPlace.value, inputLink.value).then((newCard) => {
    cb(newCard);
    submitButton.textContent = submitText;
    handleClosePopup(popupNewCard);
  });
};

// функция удаления карты
function deleteCard() {
  const id = inputDelete.value;
  return deleteMyCard(id).then(() => {
    handleClosePopup(popupDelete);
    document.querySelector(`#card-${id}`).remove();
  });
};

// слушатель на кнопку, открывающую попап popupEdit
profileEditBtn.addEventListener('click', function () {
  handleOpenPopup(popupEdit);
  clearValidation(popupProfile, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// слушатель на кнопку, открывающую попап popupNewCard
addCardBtn.addEventListener('click', () => {
  handleOpenPopup(popupNewCard);
  clearValidation(placeForm, validationConfig);
});

// слушатель на кнопку, открывающую попап popupNewAvatar
profileAvatar.addEventListener('click', function () {
  handleOpenPopup(popupNewAvatar);
  clearValidation(formNewAavtarLink, validationConfig);
});

// слушатели на закрытие попапов кликом по оверлею
popups.forEach(function (popup) {
  popup.addEventListener('click', handleClosePopupOnOverlay);
});

// слушатели на кнопки, закрывающие попапы
popupBtnCloseList.forEach(function (btn) {
  const popupElement = btn.closest('.popup');
  btn.addEventListener('click', () => {
    handleClosePopup(popupElement);
  });
});

// слушатель на кнопку редактирования автара
formNewAavtarLink.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitButton.textContent = 'Сохранение...';
  updateAvatar(inputNewAvatar.value).then((res) => {
    handleClosePopup(popupNewAvatar);
    profileAvatar.style = `background-image: url('${res.avatar}')`;
    submitButton.textContent = submitText;
  });
});

// слушатель на кнопку сохранения профиля
popupProfile.addEventListener('submit', handleProfileSubmit);

// слушатель на кнопку создания новой нарты
placeForm.addEventListener('submit', (evt) =>
  handleCardSubmit(evt, function (card) {
    const cardConfig = {
      card,
      likeCard,
      clickCard: handleOpenPopupImage,
      clickDeleteCard: openDeletePopup,
      popupImage,
      cardTemplate,
      canDelete: true,
      isLiked: false};
    const cardElement = createCard(cardConfig);
    cardContainer.prepend(cardElement);
  })
);

// слушатель на кнопку удаления карты
formDelete.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitText = evt.submitter.textContent;
  evt.submitter.textContent = 'Удаление...';
  deleteCard().finally(() => {
    evt.submitter.textContent = submitText;
  });
});

//использование данных, полученных из запросов
Promise.all([getCurrentProfile(), getInitialCards()])
.then(([userData, cardList]) => {
  cardList.forEach(function (card) {
    const canDelete = userData._id === card.owner._id;
    const isLiked = card.likes.some((person) => {
      return person._id === userData._id;
    });
    const cardConfig = {
      card,
      likeCard,
      clickCard: handleOpenPopupImage,
      clickDeleteCard: openDeletePopup,
      popupImage,
      cardTemplate,
      canDelete,
      isLiked};
    const cardElement = createCard(cardConfig);
    cardContainer.append(cardElement);
    })

  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileAvatar.style = `background-image: url('${userData.avatar}')`;
})
.catch(err => console.log(err));

// включение валидации форм
enableValidation(validationConfig);
