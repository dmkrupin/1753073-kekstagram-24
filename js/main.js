//РАЗДЕЛ ОБЪЯВЛЕНИЯ ПЕРЕМЕННЫХ
//_________________________________________________________________________________________________________________
const IMAGE_NUMBER = 25;
const COMMENT_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENTATOR_NAME_ARRAY = [
  'Дима',
  'Антон',
  'Арина',
  'Александр',
  'Дмитрий',
  'Анастасия',
  'Игорь',
  'Станислав',
  'Юрий',
  'Ярослав',
];
//РАЗДЕЛ ОБЪЯВЛЕНИЯ ФУНКЦИЙ
//_________________________________________________________________________________________________________________
/** Функция возвращает случайное целое число из указанного числового диапазона включительно,
 * @author https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} rangeStart - нижняя граница выбранного диапазона.
 * @param {number} rangeEnd - верхняя граница выбранного диапазона.
 * @returns {number} - Cлучайное целое число из указанного числового диапазона, включая границы.
*/
const getRandomIntFromRange = function (rangeStart, rangeEnd) {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
};
/** Функция проверяет, не превышает ли длина входящей строки заданную длину
 * @deprecated
 * @param {string} string - Принимаемая на проверку строка
 * @param {number} maxLength - Максимально допустимое значение длины строки
 * @returns {bool} - Истина, если длина строки <= заданной, иначе ложь
 */
const isAllowedLength = (string, maxLength) => string.length <= maxLength;
/** Функция возвращает случайный элемент массива
 * @param {Array} - Массив, из которого будем выбирать элемент
 * @returns Случайный элемент из массива
 */
const getRandomArrayElement = (arr) => arr[getRandomIntFromRange(0, arr.length - 1)];

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
      avatar: `../img/avatar- ${getRandomIntFromRange(1, 6)}.svg`,
      message: [getRandomArrayElement(COMMENT_ARRAY), getRandomArrayElement(COMMENT_ARRAY)],
      name: getRandomArrayElement(COMMENTATOR_NAME_ARRAY),
    };
  };
  /** Функция генерирует массив комментариев к фотографии
 *
 * @returns {Array} - массив случайной длины от 1 до 3, где каждым элементом будет результат выполнения функции getRandomComment()
 */
  const getComments = () => Array.from({length: getRandomIntFromRange(1, 3)}, getRandomComment);

  return {
    id: getRandomIntFromRange(1, IMAGE_NUMBER),
    url: `../photos/${getRandomIntFromRange(1, IMAGE_NUMBER)}.jpg`,
    description: `Описание фотографии${getRandomIntFromRange(1, IMAGE_NUMBER)}`,
    likes: getRandomIntFromRange(15, 200),
    comments: getComments(),
  };
};

// Генерируем массив фотографий
const imageArray = Array.from({length: IMAGE_NUMBER}, getRandomImageDescription);
