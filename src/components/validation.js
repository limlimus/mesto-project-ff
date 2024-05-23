//функции для валидации форм

//ф-я показывает сообщени ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
//ф-я скрывает сообщение ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.remove('popup__input-error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

//ф-я проверяет на валидность
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// ф-я, перебирает все формы
// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup'));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement);
//   });
// };

//ф-я проверки валидации формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// ф-я блокировки кнопки формы
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit_inactive');
  }
};

//ф-я вешает листнеры на инпуты
const enableValidation = (formElement, validationConfig) => {
  const inputList = Array.from(validationConfig.inputSelector);
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// ф-я очистки ошибок валидации
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(validationConfig.inputSelector);
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  formElement.reset();
  hasInvalidInput(inputElement);
};



export { enableValidation, clearValidation };