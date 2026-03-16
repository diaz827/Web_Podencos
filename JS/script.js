/* ============================================
   JavaScript - PGridDiazDaniel
   Funcionalidad interactiva de la página web
   ============================================ */

// ============================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================

// Elementos de la pantalla de carga
const pantallaCarga = document.getElementById('pantalla-carga');  // Contenedor pantalla carga
const contenido = document.getElementById('contenido');           // Contenido principal
const videoIntro = document.getElementById('video-intro');        // Video de introducción
const progreso = document.getElementById('progreso');              // Barra de progreso
const btnSaltar = document.getElementById('btn-saltar');          // Botón saltar intro

// Elementos del lightbox
const lightbox = document.getElementById('lightbox');             // Modal lightbox
const lightboxImg = document.getElementById('lightbox-img');       // Imagen del lightbox


// ============================================
// FUNCIONES DE LA PANTALLA DE CARGA
// ============================================

/**
 * mostrarWeb - Función principal para mostrar el contenido principal
 * y ocultar la pantalla de carga con una transición suave
 */
function mostrarWeb() {
  // Detener el intervalo de progreso si está activo
  if (intervaloProgreso) {
    clearInterval(intervaloProgreso);
  }
  
  // Iniciar transición de opacity a 0
  pantallaCarga.style.opacity = '0';
  pantallaCarga.style.transition = 'opacity 0.5s ease';

  // Después de 500ms (duración de la transición):
  setTimeout(() => {
    // Ocultar completamente la pantalla de carga
    pantallaCarga.style.display = 'none';
    
    // Mostrar el contenido principal
    contenido.classList.remove('oculto');
    
    // Añadir clase visible después de 50ms para activar la transición
    setTimeout(() => {
      contenido.classList.add('visible');
    }, 50);
  }, 500);
}

/**
 * Variable para almacenar el intervalo de la barra de progreso
 * Se declara aquí para poder controlarlo desde mostrarWeb()
 */
let intervaloProgreso;

/**
 * iniciarPantallaCarga - Configura y ejecuta la pantalla de carga
 * con video, barra de progreso y botón para saltar
 */
function iniciarPantallaCarga() {
  let porcentaje = 0;
  const duracionTotal = 10000;    // 10 segundos de duración máxima
  const intervaloTiempo = 100;    // Actualizar cada 100ms
  const incremento = (intervaloTiempo / duracionTotal) * 100;  // Porcentaje por actualización

  // Crear intervalo para la barra de progreso
  intervaloProgreso = setInterval(() => {
    porcentaje += incremento;  // Aumentar porcentaje
    
    // Si llega al 100%, detener el intervalo
    if (porcentaje >= 100) {
      porcentaje = 100;
      clearInterval(intervaloProgreso);
    }
    
    // Actualizar el ancho de la barra de progreso
    progreso.style.width = porcentaje + '%';
  }, intervaloTiempo);

  // Evento: Click en botón saltar - muestra la web inmediatamente
  btnSaltar.addEventListener('click', mostrarWeb);

  // Evento: Video terminado - muestra la web
  videoIntro.addEventListener('ended', mostrarWeb);

  // Evento: Error en video - muestra la web como fallback
  videoIntro.addEventListener('error', mostrarWeb);

  // Timeout de seguridad: Si el video no termina en 10 segundos, forzar mostrar web
  setTimeout(() => {
    if (pantallaCarga.style.display !== 'none') {
      mostrarWeb();
    }
  }, 10000);
}


// ============================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ============================================

// Comprobar si es un dispositivo móvil (ancho menor a 37.5rem = 600px)
const esMovil = window.matchMedia("(max-width: 37.5rem)").matches;

// Comportamiento diferenciado para móviles
if (esMovil) {
  // En móviles: ocultar pantalla de carga y mostrar contenido directamente
  pantallaCarga.style.display = 'none';
  contenido.classList.remove('oculto');
  contenido.classList.add('visible');
} else {
  // En escritorio: iniciar la pantalla de carga con video
  iniciarPantallaCarga();
}


// ============================================
// FUNCIONALIDAD LIGHTBOX - IMÁGENES
// ============================================

/**
 * Seleccionar todas las imágenes clickeables
 * (.img-tech y .img-urban)
 */
const imagenes = document.querySelectorAll('.img-tech img, .img-urban img');

// Añadir evento click a cada imagen
imagenes.forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();  // Evitar que el evento llegue al lightbox
    
    // Insertar la imagen en el lightbox
    lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="lightbox-content">`;
    
    // Mostrar el lightbox
    lightbox.classList.add('active');
  });
});


// ============================================
// LIGHTBOX - TARJETAS EXPANDIBLES
// ============================================

/**
 * Seleccionar todas las tarjetas excepto el footer (laboratorio)
 * para hacerlas clickeables y expandir su contenido
 */
const tarjetas = document.querySelectorAll('.card:not(.laboratorio)');

// Añadir evento click a cada tarjeta
tarjetas.forEach(card => {
  card.addEventListener('click', () => {
    // Clonar la tarjeta para extraer su contenido
    const clone = card.cloneNode(true);
    clone.style.cursor = 'default';
    clone.style.transform = 'none';  // Quitar efecto hover
    
    // Extraer elementos del clon
    const label = clone.querySelector('.label');
    const h2 = clone.querySelector('h2');
    const h3 = clone.querySelector('h3');
    const p = clone.querySelector('p');
    const ul = clone.querySelector('ul');
    const img = clone.querySelector('img');
    
    // Construir el contenido HTML para mostrar en el lightbox
    let contenido = '';
    if (label) contenido += `<span class="label">${label.textContent}</span>`;
    if (h2) contenido += `<h2>${h2.textContent}</h2>`;
    if (h3) contenido += `<h3>${h3.textContent}</h3>`;
    if (p) contenido += `<p>${p.textContent}</p>`;
    if (ul) contenido += ul.outerHTML;  // Incluir lista completa
    if (img) contenido += `<img src="${img.src}" alt="${img.alt}" style="max-width:100%;border-radius:1rem;margin-top:1rem;">`;
    
    // Insertar contenido en el lightbox
    lightbox.innerHTML = `<div class="lightbox-card">${contenido}</div>`;
    
    // Mostrar el lightbox
    lightbox.classList.add('active');
  });
});


// ============================================
// CERRAR LIGHTBOX
// ============================================

/**
 * Evento click en el lightbox para cerrarlo
 * Se cierra al hacer click en cualquier parte del fondo
 */
lightbox.addEventListener('click', () => {
  // Ocultar el lightbox
  lightbox.classList.remove('active');
  
  // Restaurar el contenido original del lightbox
  lightbox.innerHTML = '<img src="" alt="Imagen ampliada" class="lightbox-content" id="lightbox-img">';
});

/**
 * Nota: El cambio de tema claro/oscuro se maneja exclusivamente en CSS
 * utilizando la pseudo-clase :has() y un checkbox oculto
 */
