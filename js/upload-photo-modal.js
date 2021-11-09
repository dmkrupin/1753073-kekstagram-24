import { body, isEscapeKey } from './common.js';

const uploadPhotoInput = document.querySelector('.img-upload__input');
const uploadOverlayFrame = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlayFrame.querySelector('.img-upload__cancel');

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
//Скрываем фрейм с формой редактирования загруженного фото
function closeModalUploadOverlay () {
  uploadOverlayFrame.classList.add('hidden');
  body.classList.remove('modal-open');
  //Удаляем обработчик нажатия Esc
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  //Удаляем обработчик клика по кнопке закрытия полноразмерной фото
  uploadOverlayCloseButton.removeEventListener('click', onUploadOverlayCloseButtonClick);
}
//Показываем фрейм с формой редактирования загруженного фото
function openModalUploadOverlay () {
  uploadOverlayFrame.classList.remove('hidden');
  body.classList.add('modal-open');
  //Будем закрывать форму редактирования по нажатию Esc
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  //Будем закрывать форму редактирования по клику на крестик
  uploadOverlayCloseButton.addEventListener('click', onUploadOverlayCloseButtonClick);
}

uploadPhotoInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModalUploadOverlay();
});
