const getPhotos = (onSuccess) =>
  fetch(
    'https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photosDataset) => onSuccess(photosDataset))
    .catch((err) => console.error(err));

const sendPhoto = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      enctype: 'multipart/form-data',
      body: body,
    })
    .then(() => onSuccess())
    .catch((err) => onError(err));
};

export { getPhotos, sendPhoto };
