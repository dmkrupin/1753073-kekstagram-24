/**
 * РАЗДЕЛ ОБЪЯВЛЕНИЯ ПЕРЕМЕННЫХ
 * _________________________________________________________________________________________________________________
 */
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
/**
 * РАЗДЕЛ ОБЪЯВЛЕНИЯ ФУНКЦИЙ
 * _________________________________________________________________________________________________________________
 */
/*
 Функция возвращает случайное целое число из указанного диапазона включительно,
Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const getRandomIntFromRange = function (rangeStart, rangeEnd) {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
};

//Функция определяет, не превышает ли длина входящей строки заданную длину
const isAllowedLength = (string, maxLength) => string.length <= maxLength;

//Функция генерирует случайный элемент массива
const getRandomArrayElement = (arr) => arr[getRandomIntFromRange(0, arr.length - 1)];

//Функция генерирует случайную фотографию
const getRandomImageDescription = () => {
  const getRandomComment = () => {
    return {
      id: getRandomIntFromRange(1, 999),
      avatar: '../img/avatar-' + getRandomIntFromRange(1, 6) + '.svg',
      message: [getRandomArrayElement(COMMENT_ARRAY), getRandomArrayElement(COMMENT_ARRAY)],
      name: getRandomArrayElement(COMMENTATOR_NAME_ARRAY),
    };
  };

  const getComments = () => Array.from({length: getRandomIntFromRange(1, 3)}, getRandomComment);

  return {
    id: getRandomIntFromRange(1, IMAGE_NUMBER),
    url: 'photos/' + getRandomIntFromRange(1, IMAGE_NUMBER) + '.jpg',
    description: 'Описание фотографии' + getRandomIntFromRange(1, IMAGE_NUMBER),
    likes: getRandomIntFromRange(15, 200),
    comments: getComments(),
  };
};

 // Генерируем массив фотографий
const imageArray = Array.from({length: IMAGE_NUMBER}, getRandomImageDescription);
