import { renderPreviewPhotos, clearPreviewPhotos } from './preview-photo-renderer.js';
import { RANDOM_FILTER_PHOTOS_COUNT, RERENDER_DELAY } from './global-variables.js';
import { getXRandomUniqueArrayElements } from './common.js';
import { debounce } from './utils/debounce.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const clearActiveFilterButtonState = () => {
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
};

const setDefaultClick = (photosDataset) => {
  defaultFilterButton.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        defaultFilterButton.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        renderPreviewPhotos(photosDataset);
      },
      RERENDER_DELAY));
};

const setRandomClick = (photosDataset) => {
  randomFilterButton.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        randomFilterButton.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        const randomPhotosDataset = getXRandomUniqueArrayElements(photosDataset, RANDOM_FILTER_PHOTOS_COUNT);
        renderPreviewPhotos(randomPhotosDataset);
      },
      RERENDER_DELAY));
};

const setDiscussedClick = (photosDataset) => {
  discussedFilterButton.addEventListener('click',
    debounce (
      () => {
        clearActiveFilterButtonState();
        discussedFilterButton.classList.add('img-filters__button--active');
        clearPreviewPhotos();
        const sortedPhotosDataset = photosDataset.slice();
        sortedPhotosDataset.sort(compareComments);
        renderPreviewPhotos(sortedPhotosDataset);
      },
      RERENDER_DELAY));
};

export {setDefaultClick, setRandomClick, setDiscussedClick};
