// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
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

function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
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
}

function handleServerError(err) {
  console.log('Ошибка:', err);
}

export { handleSubmit, handleServerError };
