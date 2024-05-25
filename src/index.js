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
  setConfig,
  getCurrentProfile,
  getInitialCards,
  editProfile,
  postNewCard,
  updateAvatar,
  deleteMyCard,
} from './components/api.js';

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
const likeCount = cardElement.querySelector('.card__like_counter');
const popupImg = popupImage.querySelector('.popup__image');
const popupImgCaption = popupImage.querySelector('.popup__caption');
const submitButton = evt.submitter;
const submitText = submitButton.textContent;

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

// функция управления текстом кнопки
export function renderLoading(isLoading, button, buttonText, loadingText) {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  };
};

// функция, которая принимает функцию запроса, объект события и текст во время загрузки
function handleSubmit(request, evt, loadingText) {
   evt.preventDefault();
   renderLoading(true, submitButton, initialText, loadingText);
   request()
     .then(() => {
       evt.target.reset();
     })
     .catch((err) => {
       console.error(`Ошибка: ${err}`);
     })
     .finally(() => {
       renderLoading(false, submitButton, initialText);
     });
 };

// функция заполнения формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  submitButton.textContent = 'Сохранение...';
  editProfile(nameInput.value, jobInput.value).then((profile) => {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    submitButton.textContent = submitText;
    handleClosePopup(popupEdit);
  });
};

function handleProfileFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return editProfile(popupName.value, popupProfession.value).then((userData) => {
      profileName.textContent = userData.name;
      profileProfession.textContent = userData.about;
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

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
popupProfile.addEventListener('submit', handleProfileSubmit(evt));

// слушатель на кнопку создания новой нарты
placeForm.addEventListener('submit', (evt) =>
  handleCardSubmit(evt, function (card) {
    const cardElement = createCard(
      card,
      likeCard,
      handleOpenPopupImage,
      openDeletePopup,
      popupImage,
      cardTemplate,
      true,
      false,
      likeCount
    );
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
    const cardElement = createCard(
      card,
      likeCard,
      handleOpenPopupImage,
      openDeletePopup,
      popupImage,
      cardTemplate,
      canDelete,
      isLiked,
      likeCount
    );
    cardContainer.append(cardElement);
    })
  .catch(err => console.log(err));
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileAvatar.style = `background-image: url('${userData.avatar}')`;
});

// включение валидации форм
enableValidation(validationConfig);
