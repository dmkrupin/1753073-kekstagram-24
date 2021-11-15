import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;

const isUniqueArray = (arr) => new Set(arr).size === arr.length;

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

export { body, isEscapeKey, isUniqueArray, numberAsStringIncrement, getPercentFromString, setPercentToString };
