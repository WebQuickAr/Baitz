document.addEventListener('DOMContentLoaded', () => {
  fetch('Products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos.');
      }
      return response.json();
    })
    .then(data => {
      const prioridadesUltimosLanzamientos = ["dark", "green", "blue", "light"];
      const prioridadesNuestrosProductos = ["light", "green", "blue", "dark"];

      mostrarProductos(data, prioridadesUltimosLanzamientos, prioridadesNuestrosProductos);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});

function obtenerColorPreferido(colores, prioridades) {
  for (let preferencia of prioridades) {
    const colorEncontrado = colores.find(color => color[0] === `--color-${preferencia}`);
    if (colorEncontrado) {
      return colorEncontrado;
    }
  }
  return colores[0] || null; // Si no hay colores disponibles, retorna null
}

function mostrarProductos(datos, prioridadesUltimosLanzamientos, prioridadesNuestrosProductos) {
  const ultimosLanzamientosFragment = document.createDocumentFragment();
  const productosFragment = document.createDocumentFragment();

  // ----- Últimos Lanzamientos -----
  const ultimosLanzamientosContainer = document.getElementById('ultimos-lanzamientos-container');

  datos.slice(0, 3).forEach(producto => {
    const colorPreferido = obtenerColorPreferido(producto.colores, prioridadesUltimosLanzamientos);
    if (!colorPreferido) return;

    const productoDiv = document.createElement('div');
    productoDiv.classList.add('ultimos-lanzamientos_img-container', 'disparador');
    productoDiv.setAttribute('data-aos', 'fade-up');
    productoDiv.innerHTML = `
      <img class="ultimos-lanzamientos_img" src="${colorPreferido[1].imagenes[0]}" alt="Imagen Diseño ${producto.nombre}">
      <h3 class="ultimos-lanzamientos_img-title">${producto.nombre}</h3>
      <p class="ultimos-lanzamientos_img-text">Ver producto</p>
    `;
    productoDiv.addEventListener('click', () => {
      localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
      window.location.href = 'card-product.html';
    });

    ultimosLanzamientosFragment.appendChild(productoDiv);
  });
  ultimosLanzamientosContainer.appendChild(ultimosLanzamientosFragment);

  // ----- Nuestros Productos -----
  const contenedorProductos = document.getElementById('productos-inicio');

  datos.slice(0, 12).forEach(producto => {
    const colorPreferido = obtenerColorPreferido(producto.colores, prioridadesNuestrosProductos);
    if (!colorPreferido) return;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('products-section_product', 'disparador');

    itemDiv.innerHTML = `
      <div class="products-section_product-img-container disparador">
        <img src="${colorPreferido[1].imagenes[0]}" alt="${producto.nombre}">
      </div>
      <a class="products-section_product-name disparador">${producto.nombre}</a>
      <div class="products-section_product-price-container">
        <span class="product-price-container_old-price">$10.000</span>
        <span class="product-price-container_division-price">|</span>
        <p class="product-price-container_new-price">$${producto.precio}</p>
      </div>
    `;

    // Contenedor de colores
    const itemColorsDiv = document.createElement('div');
    itemColorsDiv.classList.add('products-section_product-colors-container');
    producto.colores.forEach((colorInfo, index) => {
      const colorSpan = document.createElement('span');
      colorSpan.classList.add('product-colors-container_color');
      colorSpan.style.backgroundColor = `var(${colorInfo[0]})`;

      if (index === 0) {
        colorSpan.classList.add('selected');
      }

      colorSpan.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita activar el evento de la clase disparador
        itemColorsDiv.querySelectorAll('.product-colors-container_color').forEach(span => span.classList.remove('selected'));
        colorSpan.classList.add('selected');
        itemDiv.querySelector('img').src = colorInfo[1].imagenes[0];
      });

      itemColorsDiv.appendChild(colorSpan);
    });

    itemDiv.appendChild(itemColorsDiv);

    const verProductoBtn = document.createElement('a');
    verProductoBtn.textContent = "VER PRODUCTO";
    verProductoBtn.classList.add('products-section_product-btn', 'disparador');
    verProductoBtn.addEventListener('click', () => {
      localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
      window.location.href = 'card-product.html';
    });

    itemDiv.appendChild(verProductoBtn);

    itemDiv.addEventListener('click', () => {
      localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
      window.location.href = 'card-product.html';
    });

    productosFragment.appendChild(itemDiv);
  });

  contenedorProductos.appendChild(productosFragment);
}
