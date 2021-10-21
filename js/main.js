//Функция возвращает случайное целое число из указанного диапазона включительно,
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntFromRange = function (rangeStart, rangeEnd) {
  rangeStart = Math.ceil(rangeStart);
  rangeEnd = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart);
};
// eslint-disable-next-line no-console
console.log(getRandomIntFromRange(1, 10));


// Функция определяет, не превышает ли длина входящей строки заданную длину
const isAllowedLength = (string, maxLength) => string.length <= maxLength;
// eslint-disable-next-line no-console
console.log(isAllowedLength('Я написал!', 10));
