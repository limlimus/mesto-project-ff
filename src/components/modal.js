// функция открытия попапа
function handleOpenPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleClosePopupOnEsc);
};

// функция закрытия попапа
function handleClosePopup() {
  const popupOpened = document.querySelector('.popup_is-opened');
  popupOpened.classList.remove('popup_is-opened');
};

// функция закрытия по кнопке ESC
function handleClosePopupOnEsc(event) {
  if (event.key === 'Escape') {
    handleClosePopup();
    document.removeEventListener('keydown', handleClosePopupOnEsc);
  }
};

export { handleOpenPopup, handleClosePopup };