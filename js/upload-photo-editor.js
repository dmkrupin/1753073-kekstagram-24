import { getPercentFromString, setPercentToString} from './common.js';
import { UPLOADED_PHOTO_SCALE_STEP, UPLOADED_PHOTO_MIN_SCALE } from './global-variables.js';
import '../nouislider/nouislider.js';

const photoScaleUpButton = document.querySelector('.scale__control--bigger');
const photoScaleDownButton = document.querySelector('.scale__control--smaller');
const photoUserScaleField = document.querySelector('.scale__control--value');
const userScaleHiddenField = document.querySelector('.user-scale-value');
const uploadedPhotoPreview = document.querySelector('.img-upload__preview').firstElementChild;
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
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

//Создаем слайдер
noUiSlider.create(slider, {
  start: 0,
  range: {
    'min': 0,
    'max': 100,
  },
  connect: 'lower',
});

//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleUpButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleField.value);
  scaleValue += UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue > 1) {
    scaleValue = 1;
  }
  uploadedPhotoPreview.style.transform = `scale(${scaleValue})`;
  userScaleHiddenField.value = scaleValue;
  photoUserScaleField.value = setPercentToString(scaleValue);
};
//Обработчик клика по кнопке увеличения масштаба фотографии
const onPhotoScaleDownButtonClick = () => {
  let scaleValue = getPercentFromString(photoUserScaleField.value);
  scaleValue -= UPLOADED_PHOTO_SCALE_STEP;
  if (scaleValue < UPLOADED_PHOTO_MIN_SCALE) {
    scaleValue = UPLOADED_PHOTO_MIN_SCALE;
  }
  uploadedPhotoPreview.style.transform = `scale(${scaleValue})`;
  userScaleHiddenField.value = scaleValue;
  photoUserScaleField.value = setPercentToString(scaleValue);
};
//Обработчик изменения значения слайдера
const onSliderUpdate = (_, handle, unencoded) => {
  //Записываем значение слайдера в скрытое поле
  sliderValue.value = unencoded[handle];
  //Накладываем эффект на картинку путем записи в стили картинки свойства filter : [эффект нажатого фильтра]([значение слайдера][размерность])
  uploadedPhotoPreview.style.filter = `${photoFilters[userFilterName].func}(${sliderValue.value}${photoFilters[userFilterName].unit})`;
};
//Обработчик клика по радиокнопке фильтра
const onphotoFilterOptionChange = (evt) => {
  if (evt.target.checked) {
    userFilterName = evt.target.value;
    if (userFilterName === 'none') {
      //Если выбран фильр "ничего", то прячем слайдер и возвращаем превью изначальный вид
      sliderContainer.classList.add('hidden');
      uploadedPhotoPreview.classList = 'img-upload__preview';
      uploadedPhotoPreview.style.filter = 'none';
      //Очищаем все обработчики со слайдера
      slider.noUiSlider.off();
    }
    else {
      //Если выбран другой фильтр, то показываем слайдер
      sliderContainer.classList.remove('hidden');
      //Очищаем все обработчики со слайдера
      slider.noUiSlider.off();
      //Вешаем на превью соответствующий модификатор ЗАЧЕМ? ОН ЖЕ НИЧЕГО НЕ ДЕЛАЕТ, Я РАБОТАЮ СО СТИЛЯМИ DOM УЗЛА НАПРЯМУЮ
      uploadedPhotoPreview.classList = `img-upload__preview effects__preview--${userFilterName}`;
      //Обновляем параметры слайдера из карты значений для каждого фильтра
      slider.noUiSlider.updateOptions({
        range: photoFilters[userFilterName].range,
        step: photoFilters[userFilterName].step,
      });
      //Задаем начальное значение ползунку слайдера
      slider.noUiSlider.set(photoFilters[userFilterName].start);
      slider.noUiSlider.on('update', onSliderUpdate);
    }
    //
  }
};

//Задаем начальное состояние редактора фотографии
const setInitialEditorParameters = () => {
  //Задаем масштаб фото по умолчанию = 100%
  photoUserScaleField.value = '100%';
  uploadedPhotoPreview.style.transform = 'scale(1)';
  //Вешаем слушатели событий на кнопки изменения масштаба
  photoScaleUpButton.addEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButton.addEventListener('click', onPhotoScaleDownButtonClick);
  //Выбираем по умолчанию фильтр "Стандарт"
  photoFilterOptions[0].checked = true;
  //Прячем слайдер для фильтра "Стандарт"
  sliderContainer.classList.add('hidden');
  //Задаем картинке чистое состояние
  uploadedPhotoPreview.classList = 'img-upload__preview';
  //Вешаем слушатели выбора на фильтры
  photoFilterOptions.forEach((filter) => filter.addEventListener('change', onphotoFilterOptionChange));
};
//Очищаем состояние редактора фотографии (при закрытии)
const clearEditorParameters = () => {
  //Задаем масштаб фото по умолчанию = 100%
  photoUserScaleField.value = '100%';
  uploadedPhotoPreview.style.transform = 'scale(1)';
  //Удаляем все слушатели с фрейма редактора
  photoScaleUpButton.removeEventListener('click', onPhotoScaleUpButtonClick);
  photoScaleDownButton.removeEventListener('click', onPhotoScaleDownButtonClick);
  photoFilterOptions.forEach((filter) => filter.removeEventListener('change', onphotoFilterOptionChange));
  //Задаем картинке чистое состояние
  uploadedPhotoPreview.classList = 'img-upload__preview';
  uploadedPhotoPreview.style.filter = 'none';
  //Очищаем все обработчики со слайдера
  slider.noUiSlider.off();
};
export { setInitialEditorParameters, clearEditorParameters };
