import {generateImages} from './data-generator.js';

const randomImages = generateImages();
const pictureTemplate = document.querySelector('.pictures');

/**
 * Функция создает в разметке фотографию с параметрами входящего объекта
 * @param {object} incomingImage - объект фотографии, по значениям ключей которого создаем теги в разметке
 */
const renderImage = function (incomingImage) {
  const imageLink = document.createElement('a');
  imageLink.classList.add('picture');
  imageLink.href = '#';

  const image = document.createElement('img');
  image.classList.add('picture__img');
  image.src = incomingImage.url;
  image.width = '182';
  image.height = '182';
  image.alt = incomingImage.description;
  imageLink.appendChild(image);

  const imageInfo = document.createElement('p');
  imageInfo.classList.add('pictire__info');
  imageLink.appendChild(imageInfo);

  const imageComments = document.createElement('span');
  imageComments.classList.add('picture__comments');
  imageComments.textContent = incomingImage.comments.length;
  imageInfo.appendChild(imageComments);

  const imageLikes = document.createElement('span');
  imageLikes.classList.add('picture__likes');
  imageLikes.textContent = incomingImage.likes;
  imageInfo.appendChild(imageLikes);

  pictureTemplate.appendChild(imageLink);
};

/**
 * Функция добавляет в разметку заданное количество фотографий
 */
export const renderImages = (imageNumber) => {
  for (let i = 0; i < imageNumber; i++)  {
    renderImage(randomImages[i]);
  }
};
