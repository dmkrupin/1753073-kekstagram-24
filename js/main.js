import { renderPreviewPhotos } from './preview-photo-renderer.js';
import { closeModalUploadOverlay } from './upload-photo-modal.js';
import { getPhotos } from './api.js';
import { setFormSubmit } from './upload-photo-editor.js';
import { clearDownloadPhotoButton, showSuccessMessage, showErrorMessage } from './common.js';

//Получаем фотографии с сервера и отрисовываем превью фотографий в разметке;
getPhotos((photosDataset) => renderPreviewPhotos(photosDataset));

//Pадаем действия по кнопке отправки фотографии из редактора
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
