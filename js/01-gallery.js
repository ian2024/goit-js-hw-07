import { galleryItems } from './gallery-items.js';


const refs = {
gallery: document.querySelector('.gallery'),
};

function createImageGallery(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `<div class="gallery__item">
                    <a class="gallery__link" href="large-image.jpg">
                    <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                    </a>
                </div>`
    }).join("");
};

refs.gallery.insertAdjacentHTML("beforeend", createImageGallery(galleryItems));
refs.gallery.addEventListener("click", zoomOnClick);

function zoomOnClick(e) {
const isImgEl = e.target.classList.contains('gallery__image');
  if (!isImgEl) {
        return;
    }
    e.preventDefault();
    
    const largeImgLink = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${largeImgLink}" alt="${e.target.alt}">`, {onClose: (instance) => {
        refs.gallery.removeEventListener("keydown", escape); 
    }})
    instance.show();

    function escape(e) {
        if (e.key === 'Escape') {
            instance.close();
        }
    }
    
    refs.gallery.addEventListener("keydown", escape); 
}