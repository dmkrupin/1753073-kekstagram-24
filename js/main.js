import { generatePhotos } from './mocks/photo-generator.js';
import { renderPreviewPhotos } from './preview-photo-renderer.js';
import { PHOTO_NUMBER } from './global-variables.js';
import './upload-photo-modal.js';

//Генерируем массив фотографий;
const photosDataset = generatePhotos(PHOTO_NUMBER);

//Отрисовываем превью фотографий в разметке;
renderPreviewPhotos(photosDataset);

