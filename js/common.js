import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;

const isUniqueArray = (arr) => new Set(arr).size === arr.length;

export { body, isEscapeKey, isUniqueArray };
