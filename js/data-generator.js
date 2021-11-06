import {IMAGE_NUMBER, COMMENT_ARRAY, COMMENTATOR_NAME_ARRAY} from './global-variables.js';
import {getRandomArrayElement, getRandomIntFromRange} from './utilities.js';

/** Функция генерирует случайную фотографию
 * @returns {object} - возвращает объект фотографии со следующими случайными параметрами:
 * @key {number} id - id фотографии, случайное число от 1 до IMAGE_NUMBER
 * @key {string} url - случайно сгенерированная ссылка на расположение фотографии, название которой представляет собой число от 1 до IMAGE_NUMBER
 * @key {string} description - описание, случайно сгенерированное путем добавления случайного числа к слову 'Описание'
 * @key {number} likes - случайное число в диапазоне от 15 до 200
 * @key {Array} comments - результат выполнения функции getComments()
 */
const getRandomImageDescription = () => {
  /** Функция генерирует случайный комментарий
   * @returns {object} - возвращает объект комментария со следующими случайными параметрами:
   * @key {number} id  - id комментария, случайное число от 1 до 999
   * @key {string} avatar - случайно сгенерированная ссылка на расположение аватара комментатора, название которого включает случайное число от 1 до 6
   * @key {Array} message - массив из двух комментариев, случайно выбранных из массива COMMENT_ARRAY
   * @key {string} name - имя комментатора, случайно выбранное из массива COMMENTATOR_NAME_ARRAY
  */
  const getRandomComment = () => {
    return {
      id: getRandomIntFromRange(1, 999),
      avatar: `img/avatar-${getRandomIntFromRange(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENT_ARRAY),
      name: getRandomArrayElement(COMMENTATOR_NAME_ARRAY),
    };
  };
  /** Функция генерирует массив комментариев к фотографии
 * @returns {Array} - массив случайной длины от 1 до 3, где каждым элементом будет результат выполнения функции getRandomComment()
 */
  const getComments = () => Array.from({length: getRandomIntFromRange(1, 3)}, getRandomComment);

  return {
    id: getRandomIntFromRange(1, IMAGE_NUMBER),
    url: `photos/${getRandomIntFromRange(1, IMAGE_NUMBER)}.jpg`,
    description: `Описание фотографии${getRandomIntFromRange(1, IMAGE_NUMBER)}`,
    likes: getRandomIntFromRange(15, 200),
    comments: getComments(),
  };
};

// Генерируем массив фотографий
const generateImages = () => Array.from({length: IMAGE_NUMBER}, getRandomImageDescription);
export {generateImages};
