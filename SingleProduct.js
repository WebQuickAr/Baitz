document.addEventListener('DOMContentLoaded', () => {
  const contenedorProducto = document.getElementById('product-details');
  if (!contenedorProducto) {
    console.error('El contenedor "product-details" no se encuentra en el DOM.');
    return;
  }

  const productoSeleccionado = localStorage.getItem('productoSeleccionado');
  if (!productoSeleccionado) {
    console.error('No se encontró un producto seleccionado en Local Storage.');
    contenedorProducto.innerHTML = '<p>Producto no disponible.</p>';
    return;
  }

  const producto = JSON.parse(productoSeleccionado);
  mostrarProducto(producto, contenedorProducto);

  fetch('Products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los productos.');
      }
      return response.json();
    })
    .then(data => {
      const relacionados = mostrarProductosRelacionados(data, producto);
      renderizarProductosRelacionados(relacionados);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});

function mostrarProducto(producto, contenedorProducto) {
  if (window.innerWidth > 700) {
    estructuraDesktop(producto, contenedorProducto);
  } else {
    estructuraMobile(producto, contenedorProducto);
  }
}

function estructuraDesktop(producto, contenedorProducto) {
  const imagenes = producto.colores.flatMap(color => color[1].imagenes);

  // Estructura desktop
  contenedorProducto.innerHTML = `
    <h2 class="nombre-remera">${producto.nombre}</h2>
    <div class="contenedor-imagenes">
      <div class="imagen-carrusel">
        ${imagenes.map((img, index) => `
          <img src="${img}" class="imagen-miniatura ${index === 0 ? 'seleccionada' : ''}" data-index="${index}" alt="Imagen ${index + 1}">
        `).join('')}
      </div>
      <div class="imagen-grande-container">
        <img src="${imagenes[0]}" class="imagen-grande" alt="Imagen grande">
      </div>
    </div>
    <div class="contenedor-producto-info">
      <div class="contenedor-info-producto-escencial">
        <p class="nombre-remera-2">${producto.nombre}</p>
        <p class="precio-remera">$${producto.precio},00</p>
      </div>
      <hr class="hr-producto">
    </div>
  `;

  // Agregar colores y talles
  const infoRemeraContainer = contenedorProducto.querySelector('.contenedor-producto-info');
  agregarColores(infoRemeraContainer, producto);
  agregarTalles(infoRemeraContainer, producto);


  let botonDeCompra = document.createElement('a');
  botonDeCompra.href = `https://wa.me/5491126289291?text=Hola,%20estoy%20interesado%20en%20${producto.nombre}`;
  botonDeCompra.target = "_blank";
  botonDeCompra.className = "products-section_section-btn boton-compra";
  botonDeCompra.textContent = "COMPRAR PRODUCTO";
  
  infoRemeraContainer.appendChild(botonDeCompra);
  


  // Implementar interacción para las miniaturas
  const imagenGrande = contenedorProducto.querySelector('.imagen-grande');
  const miniaturas = contenedorProducto.querySelectorAll('.imagen-miniatura');

  miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', () => {
      miniaturas.forEach(img => img.classList.remove('seleccionada'));
      miniatura.classList.add('seleccionada');
      imagenGrande.src = miniatura.src;
    });
  });

  // Efecto de zoom en la imagen grande
  imagenGrande.addEventListener('mousemove', (e) => {
    const rect = imagenGrande.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imagenGrande.style.transformOrigin = `${x}% ${y}%`;
    imagenGrande.style.transform = 'scale(2)';
  });

  imagenGrande.addEventListener('mouseleave', () => {
    imagenGrande.style.transformOrigin = 'center center';
    imagenGrande.style.transform = 'scale(1)';
  });
}

function estructuraMobile(producto, contenedorProducto) {
  const imagenes = producto.colores.flatMap(color => color[1].imagenes);

  // Estructura mobile
  contenedorProducto.innerHTML = `
    <h2 class="nombre-remera">${producto.nombre}</h2>
    <div class="swiper-container swiperProduct">
      <div class="swiper-wrapper">
        ${imagenes.map(img => `
          <div class="swiper-slide">
            <img src="${img}" alt="${producto.nombre}">
          </div>
        `).join('')}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  `;

  // Inicializar Swiper
  new Swiper('.swiperProduct', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Agregar colores y talles
  const infoRemeraContainer = document.createElement('div');
  infoRemeraContainer.classList.add('info-remera-container');
  infoRemeraContainer.innerHTML = `
    <p class="nombre-remera-2">${producto.nombre}</p>
    <p class="precio-remera">$${producto.precio},00</p>
    <a href="https://wa.me/5491126289291?text=Hola,%20estoy%20interesado%20en%20${producto.nombre}" 
       target="_blank" 
       class="products-section_section-btn boton-compra">COMPRAR PRODUCTO</a>
    <hr class="hr-producto">
  `;
  agregarColores(infoRemeraContainer, producto);
  agregarTalles(infoRemeraContainer, producto);
  contenedorProducto.appendChild(infoRemeraContainer);
}

function agregarColores(container, producto) {
  const coloresContainer = document.createElement('div');
  coloresContainer.classList.add('product-colors-container');
  coloresContainer.innerHTML = '<h3 class="colors-title">Colores disponibles:</h3>';

  const contenedorDivColores = document.createElement('div');
  contenedorDivColores.classList.add('colors-content');

  for (const [colorNombre, colorInfo] of Object.entries(producto.colores)) {
    const colorDiv = document.createElement('span');
    colorDiv.classList.add('product-color');
    colorDiv.style.backgroundColor = `var(${colorInfo[0]})`;
    contenedorDivColores.appendChild(colorDiv);
  }

  coloresContainer.appendChild(contenedorDivColores);
  container.appendChild(coloresContainer);
}

function agregarTalles(container, producto) {
  const tallesGralContainer = document.createElement('div');
  tallesGralContainer.classList.add('talles-gral-container');

  const tallesTitle = document.createElement('h3');
  tallesTitle.classList.add('talles-title');
  tallesTitle.textContent = 'Talles:';


  const tallesContainer = document.createElement('div');
  tallesContainer.classList.add('talles-container');
  producto.talles.forEach(talle => {
    const talleText = document.createElement('p');
    talleText.classList.add('talles');
    talleText.textContent = talle;
    tallesContainer.appendChild(talleText);
  });

  tallesGralContainer.appendChild(tallesTitle);
  tallesGralContainer.appendChild(tallesContainer);
  container.appendChild(tallesGralContainer)

  const guíaDeTallesContainer = document.createElement('div');
  guíaDeTallesContainer.classList.add('guia-talles-container');

  const guíaDeTallesTitle = document.createElement('h3');
  guíaDeTallesTitle.classList.add('guia-talles-title');
  guíaDeTallesTitle.textContent = 'Ver guía de talles:';


  const guíaDeTalles = document.createElement('div');
  guíaDeTalles.classList.add('guia-talles-img-container');
  switch (producto.tipo) {
    case "buzo":
      guíaDeTalles.innerHTML = `<img class="talles-img" src="resources/guia-de-talles-buzos.webp" alt="Tabla de talles">`;
      break;
      
      default:
      guíaDeTalles.innerHTML = `<img class="talles-img" src="resources/guia-de-talles-remeras.webp" alt="Tabla de talles">`;
      break;
  }
  

  guíaDeTallesContainer.appendChild(guíaDeTallesTitle);
  guíaDeTallesContainer.appendChild(guíaDeTalles);
  container.appendChild(guíaDeTallesContainer)
}


// PRODUCTOS RELACIONADOS - - - - - - - - - - - - - - - - - -
function mostrarProductosRelacionados(datos, productoActual) {
  return datos.filter(item => item.nombre !== productoActual.nombre)
              .sort(() => Math.random() - 0.4)
              .slice(0, 4);
}

function renderizarProductosRelacionados(productosRelacionados) {
  const relacionadosDiv = document.getElementById('related-products-items-container');
  if (!relacionadosDiv) {
    console.error('El contenedor "swiper-related-products" no existe en el DOM.');
    return;
  }

  productosRelacionados.forEach(item => {
    const primerColor = item.colores?.[0]?.[1]?.imagenes?.[0] || 'ruta-predeterminada.webp';
    const itemRelacionadoDiv = document.createElement('div');
    itemRelacionadoDiv.classList.add('products-section_product');
    itemRelacionadoDiv.innerHTML = `
      <a href="#" class="products-section_product-img-container disparador">
        <img src="${primerColor}" alt="${item.nombre}">
      </a>
      <a href="#" class="products-section_product-name disparador">${item.nombre}</a>
      <div class="products-section_product-price-container">
        <span class="product-price-container_old-price">$10.000</span>
        <span class="product-price-container_division-price">|</span>
        <p class="product-price-container_new-price">$${item.precio}</p>
      </div>
      <a href="#" class="products-section_product-btn disparador">Ver producto</a>
    `;

    // Agregar evento a cada elemento creado en el ciclo
    itemRelacionadoDiv.querySelectorAll('.disparador').forEach(elemento => {
      elemento.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que el enlace navegue inmediatamente
        localStorage.setItem('productoSeleccionado', JSON.stringify(item));
        window.location.href = 'card-product.html';
      });
    });

    relacionadosDiv.appendChild(itemRelacionadoDiv);
  });
}