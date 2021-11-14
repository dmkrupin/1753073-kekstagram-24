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

export {getRandomIntFromRange, isAllowedLength, getRandomArrayElement};
