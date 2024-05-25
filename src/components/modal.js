// функция открытия попапа
function handleOpenPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleClosePopupOnEsc);
}

// функция закрытия попапа
function handleClosePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleClosePopupOnEsc);
}

// функция закрытия по кнопке ESC
function handleClosePopupOnEsc(event) {
  if (event.key === 'Escape') {
    handleClosePopup();
  }
}

// функция закрытия попапа кликом по оверлею
function handleClosePopupOnOverlay(event) {
  const popup = document.querySelector('.popup_is-opened');
  if (event.target === popup) {
    handleClosePopup(popup);
  }
}

export { handleOpenPopup, handleClosePopup, handleClosePopupOnOverlay };
