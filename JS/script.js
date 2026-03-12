const pantallaCarga = document.getElementById('pantalla-carga');
const contenido = document.getElementById('contenido');
const videoIntro = document.getElementById('video-intro');
const progreso = document.getElementById('progreso');
const btnSaltar = document.getElementById('btn-saltar');


function mostrarWeb() {
  if (intervaloProgreso) {
    clearInterval(intervaloProgreso);
  }
  pantallaCarga.style.opacity = '0';
  pantallaCarga.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    pantallaCarga.style.display = 'none';
    contenido.classList.remove('oculto');
    setTimeout(() => {
      contenido.classList.add('visible');
    }, 50);
  }, 500);
}

let intervaloProgreso;

function iniciarPantallaCarga() {
  let porcentaje = 0;
  const duracionTotal = 10000;
  const intervaloTiempo = 100;
  const incremento = (intervaloTiempo / duracionTotal) * 100;

  intervaloProgreso = setInterval(() => {
    porcentaje += incremento;
    if (porcentaje >= 100) {
      porcentaje = 100;
      clearInterval(intervaloProgreso);
    }
    progreso.style.width = porcentaje + '%';
  }, intervaloTiempo);

  btnSaltar.addEventListener('click', mostrarWeb);

  videoIntro.addEventListener('ended', mostrarWeb);
  videoIntro.addEventListener('error', mostrarWeb);

  setTimeout(() => {
    if (pantallaCarga.style.display !== 'none') {
      mostrarWeb();
    }
  }, 10000);
}

const esMovil = window.matchMedia("(max-width: 37.5rem)").matches;

if (esMovil) {
  pantallaCarga.style.display = 'none';
  contenido.classList.remove('oculto');
  contenido.classList.add('visible');
} else {
  iniciarPantallaCarga();
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const imagenes = document.querySelectorAll('.img-tech img, .img-urban img');

imagenes.forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="lightbox-content">`;
    lightbox.classList.add('active');
  });
});

const tarjetas = document.querySelectorAll('.card:not(.laboratorio)');
tarjetas.forEach(card => {
  card.addEventListener('click', () => {
    const clone = card.cloneNode(true);
    clone.style.cursor = 'default';
    clone.style.transform = 'none';
    
    const label = clone.querySelector('.label');
    const h2 = clone.querySelector('h2');
    const h3 = clone.querySelector('h3');
    const p = clone.querySelector('p');
    const ul = clone.querySelector('ul');
    const img = clone.querySelector('img');
    
    let contenido = '';
    if (label) contenido += `<span class="label">${label.textContent}</span>`;
    if (h2) contenido += `<h2>${h2.textContent}</h2>`;
    if (h3) contenido += `<h3>${h3.textContent}</h3>`;
    if (p) contenido += `<p>${p.textContent}</p>`;
    if (ul) contenido += ul.outerHTML;
    if (img) contenido += `<img src="${img.src}" alt="${img.alt}" style="max-width:100%;border-radius:1rem;margin-top:1rem;">`;
    
    lightbox.innerHTML = `<div class="lightbox-card">${contenido}</div>`;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightbox.innerHTML = '<img src="" alt="Imagen ampliada" class="lightbox-content" id="lightbox-img">';
});

// (Sin JS de tema)
