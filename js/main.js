import { generatePhotos } from './mocks/photo-generator.js';
import { renderImages } from './image-renderer.js';
import { IMAGE_NUMBER } from './global-variables.js';

//Генерируем массив фотографий;
const photosDataset = generatePhotos();

//Отрисовываем превью фотографий в разметке;
renderImages(IMAGE_NUMBER, photosDataset);

