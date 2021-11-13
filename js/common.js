import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;

const isUniqueArray = (arr) => new Set(arr).size === arr.length;

const numberAsStringIncrement = (str) => {
  let strAsNumber = parseInt(str, 10);
  strAsNumber++;
  return String(strAsNumber);
};

export { body, isEscapeKey, isUniqueArray, numberAsStringIncrement };
