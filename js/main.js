import {generateImages} from './data-generator.js';
import {renderImages} from './image-renderer.js';
import { IMAGE_NUMBER } from './global-variables.js';

//генерируем массив фотографий;
export const randomImages = generateImages();

//отрисовываем фотографии в разметке;
renderImages(IMAGE_NUMBER);

