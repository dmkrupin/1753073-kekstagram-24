import { COMMENT_AVATAR_SIZE } from './global-variables.js';
import { FULL_PHOTO_IMAGE_SIZE } from './global-variables.js';
import { body, isEscapeKey } from './common.js';

const fullPhotoFrame = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhotoFrame.querySelector('.big-picture__cancel');
const fullPhotoImageContainer = fullPhotoFrame.querySelector('.big-picture__img');
const fullPhotoImage = fullPhotoImageContainer.querySelector('img');
const fullPhotoDescription = fullPhotoFrame.querySelector('.social__caption');
const fullPhotoLikesCount = fullPhotoFrame.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhotoFrame.querySelector('.comments-count');
const fullPhotoComments = fullPhotoFrame.querySelector('.social__comments');
const fullPhotoExistingComments = fullPhotoComments.children;
const fullPhotoCommentsSummary = fullPhotoFrame.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoFrame.querySelector('.comments-loader');

//Функция удаляет все срендеренные комментарии к полноразмерной фотографии
const clearComments = () => {
  [...fullPhotoExistingComments].forEach((comment) => comment.remove());
};
//Рендерим комментарий к полноразмерной фотографии из датасета
const renderComment = (comment) => {
  //Создаем родительский элемент комментария к фотографии
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  //Cоздаем элемент аватара комментатора
  const commentElementAvatar = document.createElement('img');
  commentElementAvatar.classList.add('social__picture');
  commentElementAvatar.src = comment.avatar;
  commentElementAvatar.alt = comment.name;
  commentElementAvatar.width = COMMENT_AVATAR_SIZE;
  commentElementAvatar.height = COMMENT_AVATAR_SIZE;
  commentElement.appendChild(commentElementAvatar);
  //Создаем элемент текста комментария
  const commentElementText = document.createElement('p');
  commentElementText.classList.add('social__text');
  commentElementText.textContent = comment.message;
  commentElement.appendChild(commentElementText);
  //Добавляем полученный комментарий к остальным
  fullPhotoComments.appendChild(commentElement);
};
//Геренируем все комментарии из соответствующего массива к полноразмерной фотографии
const renderComments = (commentsArray) => {
  commentsArray.forEach((comment) => renderComment(comment));
};
//Обработчик нажатия Esc на окне полноразмерной фото
const onFullPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalFullPhoto();
  }
};
//Обработчик клика по кнопке закрытия в окне полноразмерной фото
const onFullPhotoCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModalFullPhoto();
};
//Показываем фрейм с полноразмерной фото
function openModalFullPhoto () {
  fullPhotoFrame.classList.remove('hidden');
  body.classList.add('modal-open');
  //Будем закрывать полноразмерную фотографию по нажатию Esc
  document.addEventListener('keydown', onFullPhotoEscKeydown);
  //Будем закрывать полноразмерную фотографию по клику на крестик
  fullPhotoCloseButton.addEventListener('click', onFullPhotoCloseButtonClick);
}
//Скрываем фрейм с полноразмерной фото
function closeModalFullPhoto () {
  fullPhotoFrame.classList.add('hidden');
  body.classList.remove('modal-open');
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  fullPhotoCloseButton.removeEventListener('click', onFullPhotoCloseButtonClick);
}
//Рендерим полноразмерную фотографию
const buildFullPhoto = ({url, description, likes, comments}) => {
  fullPhotoImage.src = url;
  fullPhotoImage.alt = description;
  fullPhotoImage.width = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoImage.height = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoDescription.textContent = description;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsCount.textContent = comments.length;
  clearComments();
  renderComments(comments);
  //Прячем счетчик комментариев и загрузку новых
  fullPhotoCommentsSummary.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');
};

const previewPhotoClickHandler = (previewPhotoEvement, photoDataset) => {
  previewPhotoEvement.addEventListener('click', (evt) => {
    evt.preventDefault();
    buildFullPhoto(photoDataset);
    openModalFullPhoto();
  });
};

export { previewPhotoClickHandler };
