// универсальная функция управления текстом кнопки
function renderLoading(
  isLoading,
  button,
  buttonText = 'Сохранить',
  loadingText = 'Сохранение...'
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// универсальная функция обработки сабмита
function handleSubmit(request, evt, loadingText = 'Сохранение...', withReset) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      if (withReset) {
        evt.target.reset();
      }
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

// универсальная функция обработки ошибки
function handleServerError(err) {
  console.log('Ошибка:', err);
}

export { handleSubmit, handleServerError };
