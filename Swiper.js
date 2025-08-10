// SWIPER ADBAR
const swiperAdbar = new Swiper('.swiperAdbar', {
  direction: 'horizontal',
  loop: true,
  speed: 500,

  autoplay: {
    delay: 4500,
  },

  navigation: {
    nextEl: '.swiperAdbar .swiper-button-next',
    prevEl: '.swiperAdbar .swiper-button-prev',
  }
});

// SWIPER HEADER
const swiperWelcome = new Swiper('.swiperWelcome', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,
  speed: 500,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiperWelcome .swiper-pagination',
    clickable: true,
  }
});

// SWIPER INFO
const swiperInfo = new Swiper('.swiperInfo', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,

  autoplay: {
    delay: 2500,
  },

  pagination: {
    el: '.swiperInfo .swiper-pagination',
    clickable: true,
  }
});

// SWIPER PRODUCT
const swiperProduct = new Swiper('.swiperProduct', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  loop: true,
  
  autoplay: {
    delay: 10000,
  },
  
  pagination: {
    el: '.swiperProduct .swiper-pagination',
    clickable: true,
  }
});

