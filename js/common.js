import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;
const downloadPhotoInput = document.querySelector('.img-upload__label');
const isUniqueArray = (arr) => new Set(arr).size === arr.length;
const messageTemplateElement = document.querySelector('#success').content;
const messageElement = messageTemplateElement.querySelector('.success');
const clonedMessageElement = messageElement.cloneNode(true);

const numberAsStringIncrement = (str) => {
  let strAsNumber = parseInt(str, 10);
  strAsNumber++;
  return String(strAsNumber);
};
//Функция принимает на вход строку формата '0%' - '100%' и возвращает доли процента в формате 0 - 1
const getPercentFromString = (str) => {
  const strAsArray = str.split('');
  strAsArray.splice(-1, 1);
  return strAsArray.join('') / 100;
};
//Функция принимает на вход доли процента в формате 0 - 1 и возвращает строку формата '0%' - '100%'
const setPercentToString = (percent) => `${percent * 100}%`;


const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};
//Функция показывает сообщение об успешной отправке фото
const showSuccessMessage = () => {
  const messageButton = clonedMessageElement.querySelector('.success__button');
  body.insertAdjacentElement('beforeend', clonedMessageElement);
  messageButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};
function closeSuccessMessage () {
  clonedMessageElement.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

//Функция скрывает кнопку загрузки фото на сервер
const clearDownloadPhotoButton = () => {
  downloadPhotoInput.classList.add('hidden');
};

export { body, isEscapeKey, isUniqueArray, numberAsStringIncrement, getPercentFromString, setPercentToString, clearDownloadPhotoButton, showSuccessMessage };
