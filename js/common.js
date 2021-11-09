import { ESCAPE_KEYCODE } from './global-variables.js';

const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.keyCode === ESCAPE_KEYCODE;

export { body, isEscapeKey };
