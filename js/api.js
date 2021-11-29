const getPhotos = (onSuccess) =>
  fetch(
    'https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photosDataset) => onSuccess(photosDataset));

const sendPhoto = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      enctype: 'multipart/form-data',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        throw new Error('Ошибка загрузки файла!');
      }
    })
    .catch((err) => onError(err));
};

export { getPhotos, sendPhoto };
