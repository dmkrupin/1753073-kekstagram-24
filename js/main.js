import { renderPreviewPhotos } from './preview-photo-renderer.js';
import { closeModalUploadOverlay } from './upload-photo-modal.js';
import { getPhotos } from './api.js';
import { setFormSubmit } from './upload-photo-editor.js';
import { clearDownloadPhotoButton, showSuccessMessage, showErrorMessage } from './common.js';
import { setDefaultClick, setRandomClick, setDiscussedClick } from './preview-photo-filters.js';

const filtersElement = document.querySelector('.img-filters');

//Получаем фотографии с сервера и отрисовываем превью фотографий в разметке
getPhotos((photosDataset) => {
  renderPreviewPhotos(photosDataset);
  //После загрузки всех фотографий с сервера включаем отображение фильтров
  filtersElement.classList.remove('img-filters--inactive');
  //Вешаем обработчики клика на каждый фильтр
  setDefaultClick(photosDataset);
  setRandomClick(photosDataset);
  setDiscussedClick(photosDataset);
});

//Задаем действия по кнопке отправки фотографии из редактора
setFormSubmit(
  () => {
    closeModalUploadOverlay();
    clearDownloadPhotoButton();
    showSuccessMessage();
  },
  () => {
    closeModalUploadOverlay();
    showErrorMessage();
  },
);
