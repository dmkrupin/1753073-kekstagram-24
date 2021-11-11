import { body, isEscapeKey, isUniqueArray } from './common.js';
import { MAX_HASHTAGS_ALLOWED } from './global-variables.js';

const uploadPhotoInput = document.querySelector('.img-upload__input');
const hashtagsInput = document.querySelector('.text__hashtags');
const uploadOverlayFrame = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlayFrame.querySelector('.img-upload__cancel');

//Очищаем все поля формы
//
//

//Обработчик нажатия Esc на окне редактирования загруженного фото
const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalUploadOverlay();
  }
};
//Обработчик клика по кнопке закрытия в окне редактирования загруженного фото
const onUploadOverlayCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModalUploadOverlay();
};
//Обработчик-валидатор поля ввода хэштегов
const onHashTagInputInput = () => {
  const hashtagMask = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/;
  const input = hashtagsInput.value;
  const inputAsArray = input.split(' ');
  for (let i = 0; i < inputAsArray.length; i++) {
    inputAsArray[i] = inputAsArray[i].toLowerCase();
    //Проверяем, что хэштегов не больше максимального количества
    if (inputAsArray.length > MAX_HASHTAGS_ALLOWED) {
      hashtagsInput.setCustomValidity(`Максимум хэштегов - ${MAX_HASHTAGS_ALLOWED}`);
    }
    //Проверяем хэштеги на соответствие маске
    else if (!hashtagMask.test(inputAsArray[i])) {
      hashtagsInput.setCustomValidity('Допускаются хэштеги длиной 2-20 символов, только русские/английские буквы и цифры');
    }
    //Проверяем отсутствие двух одинаковых хэштегов
    else if (!isUniqueArray(inputAsArray)) {
      hashtagsInput.setCustomValidity('Хэштеги не могут быть одинаковыми');
    }
    else {
      hashtagsInput.setCustomValidity('');
    }
  }
  hashtagsInput.reportValidity();
};
//Скрываем фрейм с формой редактирования загруженного фото
function closeModalUploadOverlay () {
  uploadOverlayFrame.classList.add('hidden');
  body.classList.remove('modal-open');
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  uploadOverlayCloseButton.removeEventListener('click', onUploadOverlayCloseButtonClick);
  //Очищаем поле загрузки изображения И ВСЕ ОСТАЛЬНЫЕ ПОЛЯ ФОРМЫ (надо дописать сюда функцию)
  uploadPhotoInput.value = '';
  hashtagsInput.removeEventListener('input', onHashTagInputInput);
  hashtagsInput.value = '';
}
//Показываем фрейм с формой редактирования загруженного фото
function openModalUploadOverlay () {
  uploadOverlayFrame.classList.remove('hidden');
  body.classList.add('modal-open');
  //Будем закрывать форму редактирования по нажатию Esc
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  //Будем закрывать форму редактирования по клику на крестик
  uploadOverlayCloseButton.addEventListener('click', onUploadOverlayCloseButtonClick);
  //Валидируем поле ввода хэштегов
  hashtagsInput.addEventListener('input', () => {
    onHashTagInputInput();
  });
}

uploadPhotoInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModalUploadOverlay();
});

