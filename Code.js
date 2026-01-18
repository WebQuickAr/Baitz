document.addEventListener("DOMContentLoaded", (event) => {

// ABRIR Y CERRAR VENTANA MODAL -------------------------
const openModalBtn = document.querySelector('.nav-btn-open');
const closeModalBtn = document.querySelector('.nav-btn-close');
const modal = document.querySelector('.nav-modal');
const modalBackground = document.querySelector('.nav-modal-background');
const body = document.querySelector('.body');

const openModal = () => {
  modal.classList.add('show')
  modalBackground.classList.add('show');
  body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('show');
  modalBackground.classList.remove('show');
  body.style.overflow = 'auto';
};

openModalBtn.addEventListener('click', () => {
  openModal();
});

modalBackground.addEventListener('click', () => {
  closeModal();
});

closeModalBtn.addEventListener('click', () => {
  closeModal();
});

// ELIMINAR ADBAR CON EL SCROLL -------------------------
let adbar = document.querySelector('.swiperAdbar');
let nav = document.querySelector('.nav');
let adbarHeight = (adbar.offsetHeight * 5);
let previousScrollPosition = window.scrollY;

window.onscroll = function() {
  let currentScrollPosition = window.scrollY;

  if (currentScrollPosition > previousScrollPosition) {
      if (currentScrollPosition > adbarHeight) {
          adbar.style.transform = "translateY(-100%)";  
          nav.style.top = "0"
          nav.style.height = "84px"
          nav.style.fontSize = "18px"
        }
      } 
      else if (currentScrollPosition <= adbarHeight * 2) {
        adbar.style.transform = "translateY(0)";
        nav.style.top = "30px"
        nav.style.height = "64px"
        nav.style.fontSize = "16px"
      }

  previousScrollPosition = currentScrollPosition;
};

// CAMBIAR COLOR DE LA IMAGEN DE LA REMERA -------------------------
const products = document.querySelectorAll('.products-section_product');

products.forEach(product => {
  const colorSpans = product.querySelectorAll('.product-colors-container_color');
  const imgContainer = product.querySelector('.products-section_product-img-container img');

  colorSpans.forEach(span => {
    span.addEventListener('click', function() {
      const newImage = this.getAttribute('data-image');
      imgContainer.src = newImage;
      colorSpans.forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
});

// CAMBIAR ICONO DEL ACORDEÓN DEL FOOTER -------------------------
function toggleIcon(button) {
  button.innerHTML = button.innerHTML === "add" ? "remove" : "add";
}

const categories = document.querySelector('.categories-title');
const addBtnCategories = document.querySelector('.add-categories');

categories.addEventListener('click', function() {
  toggleIcon(addBtnCategories);
});

const contact = document.querySelector('.contact-title');
const addBtnContact = document.querySelector('.add-contact');

contact.addEventListener('click', function() {
  toggleIcon(addBtnContact);
});

// ------------------------- RESPONSIVE -------------------------
const sectionWelcome = document.querySelector('.swiperWelcome .swiper-wrapper');
const footer = document.querySelector('.footer-section-baitz');

let sectionWelcomeOriginal = '';
if (sectionWelcome) {
  sectionWelcomeOriginal = sectionWelcome.innerHTML;
}
const footerOriginal = footer.innerHTML

// Función para manejar el cambio de tamaño
function detectarCambioAncho() {
  const anchoPantalla = window.screen.availWidth;
  const detailsElements = document.querySelectorAll(".footer-section-baitz details");

  if (anchoPantalla >= 700) {
    if (sectionWelcome) {
    sectionWelcome.innerHTML = '<div class="swiper-slide sliderDesktop"><img src="resources/Welcome/NPNG-desktop-welcome-recortada.webp" alt="Foto Modelo" rel="preload"  id="welcomeImgDesktop-1"></div><div class="swiper-slide sliderDesktop"><img src="resources/Welcome/LA-desktop-welcome-recortada.webp" alt="Foto Modelo" id="welcomeImgDesktop-2"></div><div class="swiper-slide sliderDesktop"><img src="resources/Welcome/DE-desktop-welcome-recortada.webp" alt="Foto Modelo" id="welcomeImgDesktop-3"></div>'
    // Actualiza Swiper
    swiperWelcome.loopDestroy();
    swiperWelcome.update();
    swiperWelcome.loopCreate();
  }
    footer.innerHTML = '<div class="footer-section-baitz"><div class="categories"><h3 class="categories-title">Categorías</h3><a href="/" class="categories-item">Inicio</a><a href="Productos.html" class="categories-item">Productos</a><a href="Contacto.html" class="categories-item">Contacto</a><a href="Preguntas-Frecuentes.html" class="categories-item">FAQs</a></div><div class="follow-us"><h3 class="follow-us-title">Seguinos</h3><div class="follow-us_icon-container"><a href="https://www.instagram.com/baitz.ar/" class="follow-us-link" target="_blank"><i class="fa-brands fa-instagram"></i></a><a href="https://www.tiktok.com/@baitz.ok" class="follow-us-link" target="_blank"><i class="fa-brands fa-tiktok"></i></a></div></div><div class="contact"><h3 class="contact-title">Contactanos</h3><a href="mailto:contacto.baitz@gmail.com" target="_blank" class="contact-item">E-mail: contacto.baitz@gmail.com</a><a href="https://wa.me/5491126289291?text=Hola,%20estoy%20interesado%20en%20una%20de%20las%20remeras."target="_blank" class="contact-item">Wpp: +5491126289291</a><a href="https://www.instagram.com/baitz.ar/"target="_blank" class="contact-item">Instagram: @baitz.ar</a></div></div>'
  }else {
    if (sectionWelcome) {
      sectionWelcome.innerHTML = sectionWelcomeOriginal
    }
    footer.innerHTML = footerOriginal
  }
}

window.addEventListener('resize', detectarCambioAncho);

detectarCambioAncho();
});