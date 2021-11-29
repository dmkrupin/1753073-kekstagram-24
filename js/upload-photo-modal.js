import { bodyElement, isEscapeKey, isUniqueArray } from './common.js';
import { MAX_HASHTAGS_ALLOWED, MAX_DESCRIPTION_LENGTH, FILE_TYPES } from './global-variables.js';
import { setInitialEditorParameters, clearEditorParameters } from './upload-photo-editor.js';

const uploadPhotoInputElement = document.querySelector('.img-upload__input');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const uploadOverlayFrameElement = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButtonElement = uploadOverlayFrameElement.querySelector('.img-upload__cancel');
const uploadPhotoPreviewElement = document.querySelector('.img-upload__preview').firstElementChild;

//Обработчик нажатия Esc на окне редактирования загруженного фото
const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    //Если при нажатии Esc активно текстовое поле, то запретим всплытие события
    if (document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement) {
      evt.stopPropagation();
    }
    else {
      closeModalUploadOverlay();
    }
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
  const input = hashtagsInputElement.value;
  const inputAsArray = input.split(' ');
  for (let i = 0; i < inputAsArray.length; i++) {
    inputAsArray[i] = inputAsArray[i].toLowerCase();
    //Проверяем, что хэштегов не больше максимального количества
    if (inputAsArray.length > MAX_HASHTAGS_ALLOWED) {
      hashtagsInputElement.setCustomValidity(`Максимум хэштегов - ${MAX_HASHTAGS_ALLOWED}`);
    }
    //Проверяем хэштеги на соответствие маске
    else if (!hashtagMask.test(inputAsArray[i])) {
      hashtagsInputElement.setCustomValidity('Допускаются хэштеги длиной 2-20 символов, только русские/английские буквы и цифры');
    }
    //Проверяем отсутствие двух одинаковых хэштегов
    else if (!isUniqueArray(inputAsArray)) {
      hashtagsInputElement.setCustomValidity('Хэштеги не могут быть одинаковыми');
    }
    else {
      hashtagsInputElement.setCustomValidity('');
    }
  }
  hashtagsInputElement.reportValidity();
};
//Обработчик-валидатор поля ввода описания
const onDescriptionInputInput = () => {
  const input = descriptionInputElement.value;
  if (input.length > MAX_DESCRIPTION_LENGTH) {
    descriptionInputElement.setCustomValidity(`Максимальная длина описания - ${MAX_DESCRIPTION_LENGTH} символов`);
  }
  else {
    descriptionInputElement.setCustomValidity('');
  }
  descriptionInputElement.reportValidity();
};
//Скрываем фрейм с формой редактирования загруженного фото
function closeModalUploadOverlay () {
  uploadOverlayFrameElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //Очищаем поле загрузки изображения и все остальные поля
  uploadPhotoInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  uploadOverlayCloseButtonElement.removeEventListener('click', onUploadOverlayCloseButtonClick);
  //Удаляем обработчики изменения текстовых полей формы
  hashtagsInputElement.removeEventListener('input', onHashTagInputInput);
  descriptionInputElement.removeEventListener('input', onDescriptionInputInput);
  //Очищаем редактор
  clearEditorParameters();
}
//Показываем фрейм с формой редактирования загруженного фото
function openModalUploadOverlay () {
  uploadOverlayFrameElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  //Будем закрывать форму редактирования по нажатию Esc
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  //Будем закрывать форму редактирования по клику на крестик
  uploadOverlayCloseButtonElement.addEventListener('click', onUploadOverlayCloseButtonClick);
  //Валидируем поле ввода хэштегов
  hashtagsInputElement.addEventListener('input', onHashTagInputInput);
  descriptionInputElement.addEventListener('input', onDescriptionInputInput);
  //Готовим начальное состояние редактора
  setInitialEditorParameters();
}

uploadPhotoInputElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = uploadPhotoInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  if (matches) {
    uploadPhotoPreviewElement.src = URL.createObjectURL(file);
  }
  openModalUploadOverlay();
});

export { closeModalUploadOverlay };
