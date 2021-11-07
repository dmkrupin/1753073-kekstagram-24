import { COMMENT_AVATAR_SIZE } from './global-variables.js';
import { FULL_PHOTO_IMAGE_SIZE } from './global-variables.js';
import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
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

const clearComments = () => {
  [...fullPhotoExistingComments].forEach((comment) => comment.remove());
};

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

const renderComments = (commentsArray) => {
  commentsArray.forEach((comment) => renderComment(comment));
};

const renderFullPhoto = ({url, description, likes, comments}) => {
  fullPhotoImage.src = url;
  fullPhotoImage.alt = description;
  fullPhotoImage.width = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoImage.height = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoDescription.textContent = description;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsCount.textContent = comments.length;
  clearComments();
  renderComments(comments);

  fullPhotoCommentsSummary.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');

  //Показываем фрейм с полноразмерной фото
  fullPhotoFrame.classList.remove('hidden');
  body.classList.add('modal-open');
  //Закрываем полноразмерную фотографию по клику на крестик
  fullPhotoCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    fullPhotoFrame.classList.add('hidden');
    body.classList.remove('modal-open');
  });
  //Закрываем полноразмерную фотографию также и по нажатию Esc
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.keyCode === ESCAPE_KEYCODE) {
      fullPhotoFrame.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

const previewPhotoClickHandler = (previewPhotoEvement, photoDataset) => {
  previewPhotoEvement.addEventListener('click', (evt) => {
    evt.preventDefault();
    //Рендерим полноразмерную фотографию
    renderFullPhoto(photoDataset);
  });
};

export {previewPhotoClickHandler};
