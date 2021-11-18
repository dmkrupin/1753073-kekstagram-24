import { COMMENT_AVATAR_SIZE } from './global-variables.js';
import { FULL_PHOTO_IMAGE_SIZE, COMMENTS_PORTION_PER_LOAD } from './global-variables.js';
import { body, isEscapeKey, numberAsStringIncrement } from './common.js';

const fullPhotoFrameElement = document.querySelector('.big-picture');
const fullPhotoCloseButtonElement = fullPhotoFrameElement.querySelector('.big-picture__cancel');
const fullPhotoImageContainerElement = fullPhotoFrameElement.querySelector('.big-picture__img');
const fullPhotoImageElement = fullPhotoImageContainerElement.querySelector('img');
const fullPhotoDescriptionElement = fullPhotoFrameElement.querySelector('.social__caption');
const fullPhotoLikesCount = fullPhotoFrameElement.querySelector('.likes-count');
const fullPhotoCommentsElement = fullPhotoFrameElement.querySelector('.social__comments');
const fullPhotoExistingComments = fullPhotoCommentsElement.children;
const fullPhotoDisplayedCommentsCountElement = fullPhotoFrameElement.querySelector('.displayed-comments-count');
const fullPhotoCommentsTotalElement = fullPhotoFrameElement.querySelector('.comments-count');
let fullPhotoCommentsLoaderElement = fullPhotoFrameElement.querySelector('.comments-loader');
let commentsPortionsLoaded = 0;

//Функция удаляет все срендеренные комментарии к полноразмерной фотографии и обнуляет счетчик
const clearComments = () => {
  [...fullPhotoExistingComments].forEach((comment) => comment.remove());
  fullPhotoDisplayedCommentsCountElement.textContent = '0';
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
  fullPhotoCommentsElement.appendChild(commentElement);
  //Увеличиваем счетчик отображаемых комментариев на 1
  fullPhotoDisplayedCommentsCountElement.textContent = numberAsStringIncrement(fullPhotoDisplayedCommentsCountElement.textContent);
};
/** Генерируем порцию комментариев из соответствующего массива к полноразмерной фотографии
 * Выбираем индексы порций по 5 комментариев из массива последовательно:
 * 0-4 = 5*0 - 5*(0+1)
 * 5-9 = 5*1 - 5*(1+1)
 * 10-14 = 5*2 - 5*(2+1)
 * 15-19 = 5*3 - 5*(3+1)
 * , где 5 - количество комментариев в порции, 0,1,2,3,.. - счетчик загрузок порций
*/
const renderCommentsPortion = (commentsArray) => {
  const commentsPortion = commentsArray.slice(COMMENTS_PORTION_PER_LOAD * commentsPortionsLoaded, COMMENTS_PORTION_PER_LOAD * (1 + commentsPortionsLoaded));
  commentsPortion.forEach((comment) => renderComment(comment));
  commentsPortionsLoaded++;
  if (parseInt(fullPhotoDisplayedCommentsCountElement.textContent, 10) === commentsArray.length) {
    fullPhotoCommentsLoaderElement.classList.add('hidden');
  }
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
//Обработчик клика по кнопке загрузки комментариев
const onFullPhotoCommentsLoaderClick = function (comments) {
  renderCommentsPortion(comments);
};
//Показываем фрейм с полноразмерной фото
function openModalFullPhoto ({comments}) {
  fullPhotoFrameElement.classList.remove('hidden');
  body.classList.add('modal-open');
  //Будем закрывать полноразмерную фотографию по нажатию Esc
  document.addEventListener('keydown', onFullPhotoEscKeydown);
  //Будем закрывать полноразмерную фотографию по клику на крестик
  fullPhotoCloseButtonElement.addEventListener('click', onFullPhotoCloseButtonClick);
  //Показываем кнопку "загрузить еще комментарии", если она была спрятана
  // если комментов изначально всего 5, то кнопка не пропадает вот поэтому!
  if (fullPhotoCommentsLoaderElement.classList.contains('hidden')) {
    fullPhotoCommentsLoaderElement.classList.remove('hidden');
  }
  //Будем слушать клик по кнопке "загрузить еще комментарии" Я НЕ ПОНИМАЮ, КАК РАБОТАЮТ ЗАМЫКАНИЯ
  fullPhotoCommentsLoaderElement.addEventListener('click', () => {onFullPhotoCommentsLoaderClick(comments);});
}
//Скрываем фрейм с полноразмерной фото
function closeModalFullPhoto () {
  fullPhotoFrameElement.classList.add('hidden');
  body.classList.remove('modal-open');
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  fullPhotoCloseButtonElement.removeEventListener('click', onFullPhotoCloseButtonClick);
  //Удаляем кнопку "загрузить еще комментарии" со всеми обработчиками и создаем заново
  const swap = fullPhotoCommentsLoaderElement.cloneNode(true);
  fullPhotoCommentsLoaderElement.remove();
  fullPhotoCommentsLoaderElement = swap;
  fullPhotoCommentsElement.insertAdjacentElement('afterend', fullPhotoCommentsLoaderElement);
  //Обнуляем счетчик счетчик загруженных порций
  commentsPortionsLoaded = 0;
}
//Рендерим полноразмерную фотографию
const buildFullPhoto = ({url, description, likes, comments}) => {
  fullPhotoImageElement.src = url;
  fullPhotoImageElement.alt = description;
  fullPhotoImageElement.width = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoImageElement.height = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoDescriptionElement.textContent = description;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsTotalElement.textContent = comments.length;
  clearComments();
  renderCommentsPortion(comments);
};

const previewPhotoClickHandler = (previewPhotoEvement, photoDataset) => {
  previewPhotoEvement.addEventListener('click', (evt) => {
    evt.preventDefault();
    buildFullPhoto(photoDataset);
    openModalFullPhoto(photoDataset);
  });
};

export { previewPhotoClickHandler };
