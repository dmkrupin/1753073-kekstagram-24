import { previewPhotoClickHandler } from './full-photo-modal.js';
import { PREVIEW_PHOTO_SIZE } from './global-variables.js';

export const previewPhotoSpace = document.querySelector('.pictures');

/**
 * Функция создает в разметке фотографию-превью из входящего датасета фотографии
 * @param {object} photoDataset - объект фотографии, по значениям ключей которого создаем теги в разметке
 */
const renderPreviewPhoto = function (photoDataset) {
  //Создаем родительский элемент для превью фотографии - ссылку
  const previewPhotoLink = document.createElement('a');
  previewPhotoLink.classList.add('picture');
  previewPhotoLink.href = '#';
  previewPhotoLink.tabIndex = 0;
  //Создаем элемент самого изображения
  const previewPhotoImage = document.createElement('img');
  previewPhotoImage.classList.add('picture__img');
  previewPhotoImage.src = photoDataset.url;
  previewPhotoImage.width = PREVIEW_PHOTO_SIZE;
  previewPhotoImage.height = PREVIEW_PHOTO_SIZE;
  previewPhotoImage.alt = photoDataset.description;
  previewPhotoLink.appendChild(previewPhotoImage);
  //Создаем блок с информацией о фотографии
  const previewPhotoInfo = document.createElement('p');
  previewPhotoInfo.classList.add('picture__info');
  previewPhotoLink.appendChild(previewPhotoInfo);
  //Создаем элемент количества комментариев к фотографии
  const previewPhotoCommentsCounter = document.createElement('span');
  previewPhotoCommentsCounter.classList.add('picture__comments');
  previewPhotoCommentsCounter.textContent = photoDataset.comments.length;
  previewPhotoInfo.appendChild(previewPhotoCommentsCounter);
  //Создаем элемент количества лайков к фотографии
  const previewPhotoLikesCounter = document.createElement('span');
  previewPhotoLikesCounter.classList.add('picture__likes');
  previewPhotoLikesCounter.textContent = photoDataset.likes;
  previewPhotoInfo.appendChild(previewPhotoLikesCounter);
  //Добавляем полученную фотографию на страницу
  previewPhotoSpace.appendChild(previewPhotoLink);
  //По клику на фотографию открываем ее полноразмерную версию
  previewPhotoClickHandler(previewPhotoLink, photoDataset);
};

/**
 * Функция добавляет в разметку фотографии-превью из заданного датасета
 */
const renderPreviewPhotos = (photosDataset) => {
  photosDataset.forEach((photo) => renderPreviewPhoto(photo));
};
//Функция чистит срендеренные превью фотографий
const clearPreviewPhotos = () => {
  [...previewPhotoSpace.children].forEach((photo) => {
    if (photo.matches('.picture')) {
      photo.remove();
    }
  });
};

export { renderPreviewPhotos, clearPreviewPhotos };
