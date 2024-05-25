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
import { handleSubmit, handleServerError } from './components/utils/utils.js';

import {
  cardContainer,
  cardTemplate,
  popups,
  popupEdit,
  popupNewCard,
  popupImage,
  popupProfile,
  nameInput,
  jobInput,
  placeForm,
  inputPlace,
  inputLink,
  popupBtnCloseList,
  profileEditBtn,
  addCardBtn,
  profileName,
  profileJob,
  profileAvatar,
  popupDelete,
  formDelete,
  inputDelete,
  popupNewAvatar,
  formNewAavtarLink,
  inputNewAvatar,
  popupImg,
  popupImgCaption,
  validationConfig,
} from './components/utils/constants.js';

// функция открытия попапа с картинкой
function handleOpenPopupImage(popupImage, card) {
  handleOpenPopup(popupImage);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

// функция открытия попапа удаления карты
function openDeletePopup(card) {
  handleOpenPopup(popupDelete);
  inputDelete.value = card._id;
}

// функция заполнения формы профиля
function handleProfileSubmit(evt) {
  function makeRequest() {
    return editProfile(nameInput.value, jobInput.value)
      .then((profile) => {
        profileName.textContent = profile.name;
        profileJob.textContent = profile.about;
      })
      .catch(handleServerError)
      .finally(() => {
        handleClosePopup(popupEdit);
      });
  }
  handleSubmit(makeRequest, evt);
}

// функция заполнения формы новой карты
function handleCardSubmit(evt, cb) {
  function makeRequest() {
    return postNewCard(inputPlace.value, inputLink.value)
      .then((newCard) => {
        cb(newCard);
      })
      .catch(handleServerError)
      .finally(() => {
        handleClosePopup(popupNewCard);
      });
  }
  handleSubmit(makeRequest, evt);
}

// функция редактирования аватара
function handleEditProfile(evt) {
  function makeRequest() {
    return updateAvatar(inputNewAvatar.value)
      .then((res) => {
        handleClosePopup(popupNewAvatar);
        profileAvatar.style = `background-image: url('${res.avatar}')`;
      })
      .catch(handleServerError)
      .finally(() => {
        handleClosePopup(popupNewAvatar);
      });
  }
  handleSubmit(makeRequest, evt);
}

// функция удаления карты
function handleCardDeleteSubmit(evt) {
  function makeRequest() {
    const id = inputDelete.value;
    return deleteMyCard(id)
      .then(() => {
        handleClosePopup(popupDelete);
        document.querySelector(`#card-${id}`).remove();
      })
      .catch(handleServerError)
      .finally(() => {
        handleClosePopup(popupDelete);
      });
  }
  handleSubmit(makeRequest, evt, 'Удаление...');
}

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
formNewAavtarLink.addEventListener('submit', handleEditProfile);

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
      isLiked: false,
    };
    const cardElement = createCard(cardConfig);
    cardContainer.prepend(cardElement);
  })
);

// слушатель на кнопку удаления карты
formDelete.addEventListener('submit', handleCardDeleteSubmit);

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
        isLiked,
      };
      const cardElement = createCard(cardConfig);
      cardContainer.append(cardElement);
    });

    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style = `background-image: url('${userData.avatar}')`;
  })
  .catch(handleServerError);

// включение валидации форм
enableValidation(validationConfig);
