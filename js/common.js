import { ESCAPE_KEYCODE } from './global-variables.js';

const bodyElement = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;
const downloadPhotoInputElement = document.querySelector('.img-upload__label');
const isUniqueArray = (arr) => new Set(arr).size === arr.length;
const successMessageTemplate = document.querySelector('#success').content.cloneNode(true);
const successMessageElement = document.createElement('div');
const errorMessageTemplate = document.querySelector('#error').content.cloneNode(true);
const errorMessageElement = document.createElement('div');

/** Функция возвращает случайное целое число из указанного числового диапазона включительно,
 * @param {number} rangeStart - нижняя граница выбранного диапазона.
 * @param {number} rangeEnd - верхняя граница выбранного диапазона.
 * @returns {number} - Cлучайное целое число из указанного числового диапазона, включая границы.
*/
const getRandomIntFromRange = function (rangeStart, rangeEnd) {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
};

const getRandomArrayElement = (arr) => arr[getRandomIntFromRange(0, arr.length - 1)];

const getRandomUniqueArrayElement  = (array) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomArrayElement(array);
    if (previousValues.length >= array.length) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArrayElement(array);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const getXRandomUniqueArrayElements = (array, X) => {
  const result = [];
  for (let i = 1; i <= X; i++) {
    result.push(getRandomUniqueArrayElement(array)());
  }
  return result;
};

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
const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

//Функция показывает сообщение об успешной отправке фото
const showSuccessMessage = () => {
  successMessageElement.appendChild(successMessageTemplate);
  const messageButton = successMessageElement.querySelector('.success__button');
  bodyElement.insertAdjacentElement('beforeend', successMessageElement);
  messageButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};
//Функция закрывает сообщение об успешной отправке фото
function closeSuccessMessage () {
  successMessageElement.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}
//Функция показывает сообщение об ошибке при отправке фото
const showErrorMessage = () => {
  errorMessageElement.appendChild(errorMessageTemplate);
  const messageButton = errorMessageElement.querySelector('.error__button');
  bodyElement.insertAdjacentElement('beforeend', errorMessageElement);
  messageButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};
//Функция закрывает сообщение об ошибке при отправке фото
function closeErrorMessage () {
  errorMessageElement.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

//Функция скрывает кнопку загрузки фото на сервер
const clearDownloadPhotoButton = () => {
  downloadPhotoInputElement.classList.add('hidden');
};

export { bodyElement, isEscapeKey, isUniqueArray, numberAsStringIncrement, getPercentFromString, setPercentToString, clearDownloadPhotoButton, showSuccessMessage, showErrorMessage, getXRandomUniqueArrayElements };
