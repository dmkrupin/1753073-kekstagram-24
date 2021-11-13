import { COMMENT_AVATAR_SIZE } from './global-variables.js';
import { FULL_PHOTO_IMAGE_SIZE, COMMENTS_PORTION_PER_LOAD } from './global-variables.js';
import { body, isEscapeKey, numberAsStringIncrement } from './common.js';

const fullPhotoFrame = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhotoFrame.querySelector('.big-picture__cancel');
const fullPhotoImageContainer = fullPhotoFrame.querySelector('.big-picture__img');
const fullPhotoImage = fullPhotoImageContainer.querySelector('img');
const fullPhotoDescription = fullPhotoFrame.querySelector('.social__caption');
const fullPhotoLikesCount = fullPhotoFrame.querySelector('.likes-count');
const fullPhotoComments = fullPhotoFrame.querySelector('.social__comments');
const fullPhotoExistingComments = fullPhotoComments.children;
const fullPhotoDisplayedCommentsCount = fullPhotoFrame.querySelector('.displayed-comments-count');
const fullPhotoCommentsTotal = fullPhotoFrame.querySelector('.comments-count');
let fullPhotoCommentsLoader = fullPhotoFrame.querySelector('.comments-loader');
let commentsPortionsLoaded = 0;

//Функция удаляет все срендеренные комментарии к полноразмерной фотографии и обнуляет счетчик
const clearComments = () => {
  [...fullPhotoExistingComments].forEach((comment) => comment.remove());
  fullPhotoDisplayedCommentsCount.textContent = '0';
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
  //Увеличиваем счетчик отображаемых комментариев на 1
  fullPhotoDisplayedCommentsCount.textContent = numberAsStringIncrement(fullPhotoDisplayedCommentsCount.textContent);
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
  if (parseInt(fullPhotoDisplayedCommentsCount.textContent, 10) === commentsArray.length) {
    fullPhotoCommentsLoader.classList.add('hidden');
  }// если комментов изначально всего 5, то кнопка почему-то не пропадает
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
  fullPhotoFrame.classList.remove('hidden');
  body.classList.add('modal-open');
  //Будем закрывать полноразмерную фотографию по нажатию Esc
  document.addEventListener('keydown', onFullPhotoEscKeydown);
  //Будем закрывать полноразмерную фотографию по клику на крестик
  fullPhotoCloseButton.addEventListener('click', onFullPhotoCloseButtonClick);
  //Показываем кнопку "загрузить еще комментарии", если она была спрятана
  if (fullPhotoCommentsLoader.classList.contains('hidden')) {
    fullPhotoCommentsLoader.classList.remove('hidden');
  }
  //Будем слушать клик по кнопке "загрузить еще комментарии" Я НЕ ПОНИМАЮ, КАК РАБОТАЮТ ЗАМЫКАНИЯ
  fullPhotoCommentsLoader.addEventListener('click', () => {onFullPhotoCommentsLoaderClick(comments);});
}
//Скрываем фрейм с полноразмерной фото
function closeModalFullPhoto () {
  fullPhotoFrame.classList.add('hidden');
  body.classList.remove('modal-open');
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  fullPhotoCloseButton.removeEventListener('click', onFullPhotoCloseButtonClick);
  //Удаляем кнопку "загрузить еще комментарии" со всеми обработчиками и создаем заново
  const swap = fullPhotoCommentsLoader.cloneNode(true);
  fullPhotoCommentsLoader.remove();
  fullPhotoCommentsLoader = swap;
  fullPhotoComments.insertAdjacentElement('afterend', fullPhotoCommentsLoader);
  //Обнуляем счетчик счетчик загруженных порций
  commentsPortionsLoaded = 0;
}
//Рендерим полноразмерную фотографию
const buildFullPhoto = ({url, description, likes, comments}) => {
  fullPhotoImage.src = url;
  fullPhotoImage.alt = description;
  fullPhotoImage.width = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoImage.height = FULL_PHOTO_IMAGE_SIZE;
  fullPhotoDescription.textContent = description;
  fullPhotoLikesCount.textContent = likes;
  fullPhotoCommentsTotal.textContent = comments.length;
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
