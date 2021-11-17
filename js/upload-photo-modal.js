import { body, isEscapeKey, isUniqueArray } from './common.js';
import { MAX_HASHTAGS_ALLOWED, MAX_DESCRIPTION_LENGTH, FILE_TYPES } from './global-variables.js';
import { setInitialEditorParameters, clearEditorParameters } from './upload-photo-editor.js';

const uploadPhotoInput = document.querySelector('.img-upload__input');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const uploadOverlayFrame = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlayFrame.querySelector('.img-upload__cancel');
const uploadPhotoPreview = document.querySelector('.img-upload__preview').firstElementChild;

//Обработчик нажатия Esc на окне редактирования загруженного фото
const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    //Если при нажатии Esc активно текстовое поле, то запретим всплытие события (почему не evt.target?? не понял как это работает)
    if (document.activeElement === hashtagsInput || document.activeElement === descriptionInput) {
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
//Обработчик-валидатор поля ввода описания
const onDescriptionInputInput = () => {
  const input = descriptionInput.value;
  if (input.length > MAX_DESCRIPTION_LENGTH) {
    descriptionInput.setCustomValidity(`Максимальная длина описания - ${MAX_DESCRIPTION_LENGTH} символов`);
  }
  else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
};
//Скрываем фрейм с формой редактирования загруженного фото
function closeModalUploadOverlay () {
  uploadOverlayFrame.classList.add('hidden');
  body.classList.remove('modal-open');
  //Очищаем поле загрузки изображения и все остальные поля
  uploadPhotoInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  uploadOverlayCloseButton.removeEventListener('click', onUploadOverlayCloseButtonClick);
  //Удаляем обработчики изменения текстовых полей формы
  hashtagsInput.removeEventListener('input', onHashTagInputInput);
  descriptionInput.removeEventListener('input', onDescriptionInputInput);
  //Очищаем редактор
  clearEditorParameters();
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
  hashtagsInput.addEventListener('input', onHashTagInputInput);
  descriptionInput.addEventListener('input', onDescriptionInputInput);
  //Готовим начальное состояние редактора
  setInitialEditorParameters();
}

uploadPhotoInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = uploadPhotoInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  if (matches) {
    uploadPhotoPreview.src = URL.createObjectURL(file);
  }
  openModalUploadOverlay();
});

export { closeModalUploadOverlay };
