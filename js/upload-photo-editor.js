import { getPercentFromString, setPercentToString} from './common.js';
import { UPLOADED_PHOTO_SCALE_STEP } from './global-variables.js';

const photoScaleUpButton = document.querySelector('.scale__control--bigger');
const photoScaleDownButton = document.querySelector('.scale__control--smaller');
const photoUserScaleField = document.querySelector('.scale__control--value');
const userScaleHiddenField = document.querySelector('.user-scale-value');

//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleUpButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleField.value);
  scaleValue += UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue > 1) {
    scaleValue = 1;
  }
  userScaleHiddenField.value = scaleValue;
  photoUserScaleField.value = setPercentToString(scaleValue);
};
//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleDownButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleField.value);
  scaleValue -= UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue < 0) {
    scaleValue = 0;
  }
  userScaleHiddenField.value = scaleValue;
  photoUserScaleField.value = setPercentToString(scaleValue);
};
//Задаем начальное состояние редактора фотографии
const setInitialEditorParameters = () => {
  //Задаем масштаб фото по умолчанию = 100%
  photoUserScaleField.value = '100%';
  //Вешаем слушатели событий на кнопки изменения масштаба
  photoScaleUpButton.addEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButton.addEventListener('click', onPhotoScaleDownButtonClick);
};

//Очищаем состояние редактора фотографии (при закрытии)
const clearEditorParameters = () => {
  photoScaleUpButton.removeEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButton.removeEventListener('click', onPhotoScaleDownButtonClick);
};

export { setInitialEditorParameters, clearEditorParameters };
