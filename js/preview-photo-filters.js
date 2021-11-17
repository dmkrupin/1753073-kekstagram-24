import { renderPreviewPhotos, clearPreviewPhotos } from './preview-photo-renderer.js';
import { RANDOM_FILTER_PHOTOS_COUNT } from './global-variables.js';
import { getXRandomUniqueArrayElements } from './common.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const setDefaultClick = (photosDataset) => {
  defaultFilterButton.addEventListener('click', () => {
    clearPreviewPhotos();
    renderPreviewPhotos(photosDataset);
  });
};

const setRandomClick = (photosDataset) => {
  randomFilterButton.addEventListener('click', () => {
    clearPreviewPhotos();
    const randomPhotosDataset = getXRandomUniqueArrayElements(photosDataset, RANDOM_FILTER_PHOTOS_COUNT);
    renderPreviewPhotos(randomPhotosDataset);
  });
};

const setDiscussedClick = (photosDataset) => {
  discussedFilterButton.addEventListener('click', () => {
    clearPreviewPhotos();
    const sortedPhotosDataset = photosDataset.slice();
    sortedPhotosDataset.sort(compareComments);
    renderPreviewPhotos(sortedPhotosDataset);
  });
};


export {setDefaultClick, setRandomClick, setDiscussedClick};
