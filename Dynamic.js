document.addEventListener('DOMContentLoaded', () => {
  fetch('Products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos.');
      }
      return response.json();
    })
    .then(data => {
      // Mostrar productos inicialmente
      mostrarProductos(data);

      // Agregar evento para ordenar los productos cuando el usuario seleccione una opción
      document.getElementById('orderSelect').addEventListener('change', () => {
        const orderedData = sortItems(data); // Ordenar productos
        mostrarProductos(orderedData); // Mostrar los productos ordenados
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});

function mostrarProductos(datos) {
  const contenedorProductos = document.getElementById('products');
  contenedorProductos.innerHTML = '';

  datos.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('products-section_product');

    if (item.stock) {
      itemDiv.classList.add('disparador');
    } else {
      itemDiv.classList.add('no-stock');
    }

    // Crear contenedor de imagen
    const imgContainer = document.createElement('a');
    imgContainer.classList.add('products-section_product-img-container');
    const imgElement = document.createElement('img');
    imgElement.alt = item.nombre;
    imgContainer.appendChild(imgElement);
    itemDiv.appendChild(imgContainer);

    // Crear el contenedor de colores
    const itemColorsDiv = document.createElement('div');
    itemColorsDiv.classList.add('products-section_product-colors-container');

    let isFirstColor = true;

    for (const [colorPos, colorInfo] of Object.entries(item.colores)) {
      const colorSpan = document.createElement('span');
      colorSpan.classList.add('product-colors-container_color');
      colorSpan.style.backgroundColor = `var(${colorInfo[0]})`;

      if (isFirstColor) {
        colorSpan.classList.add('selected');
        const imgElement = itemDiv.querySelector('.products-section_product-img-container img');
        if (imgElement) {
          imgElement.src = colorInfo[1].imagenes[0];
        }
        isFirstColor = false;
      }

      colorSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const allSpans = itemDiv.querySelectorAll('.product-colors-container_color');
        allSpans.forEach(span => span.classList.remove('selected'));
        colorSpan.classList.add('selected');

        const imgElement = itemDiv.querySelector('.products-section_product-img-container img');
        imgElement.src = colorInfo[1].imagenes[0];
      });

      itemColorsDiv.appendChild(colorSpan);
    }

    // Crear contenido del producto
    itemDiv.innerHTML = `
      <a class="products-section_product-img-container">
        <img src="${item.colores[0][1].imagenes[0]}" alt="${item.nombre}">
      </a>
      <a class="products-section_product-name">${item.nombre}</a>
      <div class="products-section_product-price-container">
        <span class="product-price-container_old-price">$${item.precio_anterior}</span>
        <span class="product-price-container_division-price">|</span>
        <p class="product-price-container_new-price">$${item.precio}</p>
      </div>
    `;

    itemDiv.appendChild(itemColorsDiv);

    const verProductoBtn = document.createElement('a');
    verProductoBtn.textContent = "VER PRODUCTO";
    verProductoBtn.classList.add('products-section_product-btn');
    itemDiv.appendChild(verProductoBtn);

    contenedorProductos.appendChild(itemDiv);

    if (item.stock) {
      itemDiv.addEventListener('click', () => {
        localStorage.setItem('productoSeleccionado', JSON.stringify(item));
        window.location.href = 'card-product.html';
      });
    }
  });
}


function sortItems(data) {
  const orderSelect = document.getElementById('orderSelect');
  const orderValue = orderSelect.value;

  // Crear una copia temporal de los datos
  let tempData = [...data];  // Usamos el spread operator para hacer una copia superficial del arreglo original

  // Ordenar productos según la opción seleccionada
  switch (orderValue) {
    case 'default': // Más Nuevo al más Viejo
      return data;
      break;
    case 'oldest': // Más Viejo al más Nuevo
      // Invertir el arreglo para que el último sea el primero (más viejo al más nuevo)
      tempData.reverse();
      break;
    case 'priceAsc': // Precio: Menor a Mayor
      // Ordenar por precio ascendente (convierte el precio a número)
      tempData.sort((a, b) => parseFloat(a.precio.replace('.', '').replace(',', '.')) - parseFloat(b.precio.replace('.', '').replace(',', '.')));
      break;
    case 'priceDesc': // Precio: Mayor a Menor
      // Ordenar por precio descendente
      tempData.sort((a, b) => parseFloat(b.precio.replace('.', '').replace(',', '.')) - parseFloat(a.precio.replace('.', '').replace(',', '.')));
      break;
    default:
      break;
  }

  // Retornar la copia ordenada sin afectar el objeto original
  return tempData;
}