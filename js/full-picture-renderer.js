const fullPhotoFrame = document.querySelector('.big-picture');
const fullPhotoCloseButton = fullPhotoFrame.querySelector('.big-picture__cancel');
const fullPhotoImageContainer = fullPhotoFrame.querySelector('.big-picture__img');
const fullPhotoImage = fullPhotoImageContainer.querySelector('img');
const fullPhotoDescription = fullPhotoFrame.querySelector('.social__caption');
const fullPhotoLikesCount = fullPhotoFrame.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhotoFrame.querySelector('.comments-count');
const fullPhotoComments = fullPhotoFrame.querySelector('.social__comments');

const clearComments = () => {
  for (const comment of fullPhotoComments.children) {
    comment.remove();
  }
};

const renderComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentElementAvatar = document.createElement('img');
  commentElementAvatar.classList.add('social__picture');
  commentElementAvatar.src = comment.avatar;
  commentElementAvatar.alt = 'Аватар комментатора фотографии';
  commentElementAvatar.width = 35;
  commentElementAvatar.height = 35;
  commentElement.appendChild(commentElementAvatar);

  const commentElementText = document.createElement('p');
  commentElementText.classList.add('social__text');
  commentElementText.textContent = comment.message;
  commentElement.appendChild(commentElementText);

  fullPhotoComments.appendChild(commentElement);
};

const renderComments = (photo) => {
  photo.comments.forEach((v, i) => {
    renderComment(photo.comments[i]);
  });
};


const setFullPhotoParameters = (photo) => {
  console.log(photo);
  fullPhotoImage.src = photo.url;
  fullPhotoImage.alt = photo.description;
  fullPhotoImage.width = 600;
  fullPhotoImage.height = 600;
  fullPhotoDescription.textContent = photo.description;
  fullPhotoLikesCount.textContent = photo.likes;
  fullPhotoCommentsCount.textContent = photo.comments.length;
  clearComments();
  renderComments(photo);
};

const photoClickHandler = (item, itemObject) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    //Задаем полноразмерной фото нужные значения
    setFullPhotoParameters(itemObject);
    //Показываем фрейм с полноразмерной фото
    fullPhotoFrame.classList.remove('hidden');
    //Закрываем полноразмерную фотографию по клику на крестик
    fullPhotoCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      fullPhotoFrame.classList.add('hidden');
    });
  });
};


export {photoClickHandler};
