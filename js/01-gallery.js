import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');

function createImageGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
		<a class="gallery__link" href="large-image.jpg">
		<img 
		class="gallery__image"
		src="${preview}"
		data-source="${original}"
		alt="${description}"
		/>
		</a>
		</div>`;
    })
    .join('');
}

gallery.insertAdjacentHTML('beforeend', createImageGallery(galleryItems));

gallery.addEventListener('click', zoomOnClick);

function zoomOnClick(e) {
  const isImgEl = e.target.classList.contains('gallery__image');

  if (!isImgEl) {
    return;
  }

  e.preventDefault();

  const largeImgLink = e.target.dataset.source;

  const instance = basicLightbox.create(`
	<img src="${largeImgLink}" alt="${e.target.alt}">
	`);

  instance.show();

  const closeImgOnEsc = e => {
    e.preventDefault();

    if (e.key === 'Escape') {
      instance.close();
    }
  };
  gallery.addEventListener('keydown', closeImgOnEsc);
}