// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

function createGalleryItemMarkup({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems
  .map((item) => createGalleryItemMarkup(item))
  .join("");

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

galleryList.addEventListener("click", (event) => {
  event.preventDefault();

  const { target } = event;

  if (target.classList.contains("gallery__image")) {
    const source = target.dataset.source;

    const instance = basicLightbox.create(`
      <img src="${source}" alt="${target.alt}" />
    `);

    instance.show();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    basicLightbox.close();
  }
});
