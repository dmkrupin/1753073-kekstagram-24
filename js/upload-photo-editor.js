import { getPercentFromString, setPercentToString} from './common.js';
import { UPLOADED_PHOTO_SCALE_STEP, UPLOADED_PHOTO_MIN_SCALE, UPLOADED_PHOTO_MAX_SCALE } from './global-variables.js';
import '../nouislider/nouislider.js';
import { sendPhoto } from './api.js';

const photoScaleUpButtonElement = document.querySelector('.scale__control--bigger');
const photoScaleDownButtonElement = document.querySelector('.scale__control--smaller');
const photoUserScaleFieldElement = document.querySelector('.scale__control--value');
const userScaleHiddenFieldElement = document.querySelector('.user-scale-value');
const uploadedPhotoPreviewElement = document.querySelector('.img-upload__preview').firstElementChild;
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const photoFilterOptions = document.querySelectorAll('.effects__radio');
const photoFilters = {
  chrome: {
    func: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    func: 'sepia',
    unit: '',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  marvin: {
    func: 'invert',
    unit: '%',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  phobos: {
    func: 'blur',
    unit: 'px',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  heat: {
    func: 'brightness',
    unit: '',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
};
let userFilterName = 'none';
const uploadPhotoFormElement = document.querySelector('.img-upload__form');

//Создаем слайдер
noUiSlider.create(sliderElement, {
  start: 0,
  range: {
    'min': 0,
    'max': 100,
  },
  connect: 'lower',
});

//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleUpButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleFieldElement.value);
  scaleValue += UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue > UPLOADED_PHOTO_MAX_SCALE) {
    scaleValue = UPLOADED_PHOTO_MAX_SCALE;
  }
  uploadedPhotoPreviewElement.style.transform = `scale(${scaleValue})`;
  userScaleHiddenFieldElement.value = scaleValue;
  photoUserScaleFieldElement.value = setPercentToString(scaleValue);
};
//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleDownButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleFieldElement.value);
  scaleValue -= UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue < UPLOADED_PHOTO_MIN_SCALE) {
    scaleValue = UPLOADED_PHOTO_MIN_SCALE;
  }
  uploadedPhotoPreviewElement.style.transform = `scale(${scaleValue})`;
  userScaleHiddenFieldElement.value = scaleValue;
  photoUserScaleFieldElement.value = setPercentToString(scaleValue);
};
//Обработчик изменения значения слайдера
const onSliderUpdate = (_, handle, unencoded) => {
  //Записываем значение слайдера в скрытое поле
  sliderValueElement.value = unencoded[handle];
  //Накладываем эффект на картинку путем записи в стили картинки свойства filter : [эффект нажатого фильтра]([значение слайдера][размерность])
  uploadedPhotoPreviewElement.style.filter = `${photoFilters[userFilterName].func}(${sliderValueElement.value}${photoFilters[userFilterName].unit})`;
};
//Обработчик клика по радиокнопке фильтра
const onPhotoFilterOptionChange = (evt) => {
  if (evt.target.checked) {
    userFilterName = evt.target.value;
    if (userFilterName === 'none') {
      //Если выбран фильр "ничего", то прячем слайдер и возвращаем превью изначальный вид
      sliderContainerElement.classList.add('hidden');
      uploadedPhotoPreviewElement.classList = 'img-upload__preview';
      uploadedPhotoPreviewElement.style.filter = 'none';
      //Очищаем все обработчики со слайдера
      sliderElement.noUiSlider.off();
    }
    else {
      //Если выбран другой фильтр, то показываем слайдер
      sliderContainerElement.classList.remove('hidden');
      //Очищаем все обработчики со слайдера
      sliderElement.noUiSlider.off();
      //Вешаем на превью соответствующий модификатор ЗАЧЕМ? ОН ЖЕ НИЧЕГО НЕ ДЕЛАЕТ, Я РАБОТАЮ СО СТИЛЯМИ DOM УЗЛА НАПРЯМУЮ
      uploadedPhotoPreviewElement.classList = `img-upload__preview effects__preview--${userFilterName}`;
      //Обновляем параметры слайдера из карты значений для каждого фильтра
      sliderElement.noUiSlider.updateOptions({
        range: photoFilters[userFilterName].range,
        step: photoFilters[userFilterName].step,
      });
      //Задаем начальное значение ползунку слайдера
      sliderElement.noUiSlider.set(photoFilters[userFilterName].start);
      sliderElement.noUiSlider.on('update', onSliderUpdate);
    }
    //
  }
};

//Задаем начальное состояние редактора фотографии
const setInitialEditorParameters = () => {
  //Задаем масштаб фото по умолчанию = 100%
  photoUserScaleFieldElement.value = '100%';
  uploadedPhotoPreviewElement.style.transform = 'scale(1)';
  //Вешаем слушатели событий на кнопки изменения масштаба
  photoScaleUpButtonElement.addEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButtonElement.addEventListener('click', onPhotoScaleDownButtonClick);
  //Выбираем по умолчанию фильтр "Стандарт"
  photoFilterOptions[0].checked = true;
  //Прячем слайдер для фильтра "Стандарт"
  sliderContainerElement.classList.add('hidden');
  //Задаем картинке чистое состояние
  uploadedPhotoPreviewElement.classList = 'img-upload__preview';
  //Вешаем слушатели выбора на фильтры
  photoFilterOptions.forEach((filter) => filter.addEventListener('change', onPhotoFilterOptionChange));
};
//Очищаем состояние редактора фотографии (при закрытии)
const clearEditorParameters = () => {
  //Задаем масштаб фото по умолчанию = 100%
  photoUserScaleFieldElement.value = '100%';
  uploadedPhotoPreviewElement.style.transform = 'scale(1)';
  //Удаляем все слушатели с фрейма редактора
  photoScaleUpButtonElement.removeEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButtonElement.removeEventListener('click', onPhotoScaleDownButtonClick);
  photoFilterOptions.forEach((filter) => filter.removeEventListener('change', onPhotoFilterOptionChange));
  //Задаем картинке чистое состояние
  uploadedPhotoPreviewElement.classList = 'img-upload__preview';
  uploadedPhotoPreviewElement.style.filter = 'none';
  //Очищаем все обработчики со слайдера
  sliderElement.noUiSlider.off();
};

const setFormSubmit = (onSuccess, onError) => {
  uploadPhotoFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendPhoto(onSuccess, onError, formData);
  });
};


export { setInitialEditorParameters, clearEditorParameters, setFormSubmit };
