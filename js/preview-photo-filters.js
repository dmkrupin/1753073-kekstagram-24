import { renderPreviewPhotos, clearPreviewPhotos } from './preview-photo-renderer.js';
import { RANDOM_FILTER_PHOTOS_COUNT, RERENDER_DELAY } from './global-variables.js';
import { getXRandomUniqueArrayElements } from './common.js';
import { debounce } from './utils/debounce.js';

const defaultFilterButtonElement = document.querySelector('#filter-default');
const randomFilterButtonElement = document.querySelector('#filter-random');
const discussedFilterButtonElement = document.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const clearActiveFilterButtonState = () => {
  defaultFilterButtonElement.classList.remove('img-filters__button--active');
  randomFilterButtonElement.classList.remove('img-filters__button--active');
  discussedFilterButtonElement.classList.remove('img-filters__button--active');
};

const setDefaultClick = (photosDataset) => {
  defaultFilterButtonElement.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        defaultFilterButtonElement.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        renderPreviewPhotos(photosDataset);
      },
      RERENDER_DELAY));
};

const setRandomClick = (photosDataset) => {
  randomFilterButtonElement.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        randomFilterButtonElement.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        const randomPhotosDataset = getXRandomUniqueArrayElements(photosDataset, RANDOM_FILTER_PHOTOS_COUNT);
        renderPreviewPhotos(randomPhotosDataset);
      },
      RERENDER_DELAY));
};

const setDiscussedClick = (photosDataset) => {
  discussedFilterButtonElement.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        discussedFilterButtonElement.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        const sortedPhotosDataset = photosDataset.slice();
        sortedPhotosDataset.sort(compareComments);
        renderPreviewPhotos(sortedPhotosDataset);
      },
      RERENDER_DELAY));
};

export {setDefaultClick, setRandomClick, setDiscussedClick};
