export const cardContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const popups = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const popupProfile = document.forms['edit-profile'];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector(
  '.popup__input_type_description'
);
export const placeForm = document.forms['new-place'];
export const inputPlace = document.querySelector(
  '.popup__input_type_card-name'
);
export const inputLink = document.querySelector('.popup__input_type_url');
export const popupBtnCloseList = document.querySelectorAll('.popup__close');
export const profileEditBtn = document.querySelector('.profile__edit-button');
export const addCardBtn = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');
export const popupDelete = document.querySelector('.popup_type_delete-card');
export const formDelete = document.forms['delete-card'];
export const inputDelete = document.querySelector('#delete-card');
export const popupNewAvatar = document.querySelector('.popup_type_new_avatar');
export const formNewAavtarLink = document.forms['new-avatar'];
export const inputNewAvatar = document.querySelector(
  '.popup__input_type_avatar-link'
);
export const popupImg = popupImage.querySelector('.popup__image');
export const popupImgCaption = popupImage.querySelector('.popup__caption');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
