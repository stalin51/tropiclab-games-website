const SITE_CONFIG = Object.freeze({
  brandName: 'TropicLab Games',
  location: 'Cartagena de Indias, Colombia',
  productionUrl: '',
  contactEmail: '',
  socialLinks: {
    instagram: '',
    youtube: '',
    linkedin: '',
    facebook: '',
  },
  storeLinks: {
    appleAppStore: '',
    googlePlay: '',
    steam: '',
  },
});

const PROJECTS = {
  'hurry-match': {
    title: 'Hurry Match Arena',
    eyebrow: 'Arte conceptual · En desarrollo',
    description: 'Un juego de puzles con espíritu arcade: combina gemas, encadena combos y disfruta de una experiencia llena de energía. Estas imágenes son ilustraciones conceptuales, no capturas del juego.',
    images: [
      { src: 'assets/images/hurry-match-ilustracion.png', alt: 'Ilustración conceptual de gemas de colores para Hurry Match Arena', caption: 'Ilustración conceptual principal' },
      { src: 'assets/images/hurry-match-tablero.png', alt: 'Ilustración conceptual de un tablero de gemas', caption: 'Arte conceptual · tablero de gemas' },
      { src: 'assets/images/hurry-match-combo.png', alt: 'Ilustración conceptual de un combo de gemas', caption: 'Arte conceptual · combo de gemas' },
      { src: 'assets/images/hurry-match-mapa.png', alt: 'Ilustración conceptual de un mapa colorido', caption: 'Arte conceptual · mapa' },
    ],
  },
  metroidvania: {
    title: 'Metroidvania en Cartagena',
    eyebrow: 'Arte conceptual · Proyecto próximo',
    description: 'Un proyecto de aventura y exploración en pixel art inspirado en Cartagena de Indias. Estas imágenes representan arte conceptual del proyecto, no escenas de una versión jugable.',
    images: [
      { src: 'assets/images/metroidvania-portada.png', alt: 'Escena conceptual en pixel art de Cartagena junto a sus murallas', caption: 'Arte conceptual · vista de Cartagena' },
      { src: 'assets/images/metroidvania-calle.png', alt: 'Calle de Cartagena reinterpretada en pixel art', caption: 'Arte conceptual · calle de Cartagena' },
      { src: 'assets/images/metroidvania-murallas.png', alt: 'Murallas y fortificaciones de Cartagena en pixel art', caption: 'Arte conceptual · murallas' },
      { src: 'assets/images/metroidvania-interior.png', alt: 'Interior de una fortificación reinterpretado en pixel art', caption: 'Arte conceptual · interior' },
    ],
  },
};

document.querySelectorAll('[data-brand]').forEach((element) => {
  element.textContent = SITE_CONFIG.brandName;
});
document.querySelectorAll('[data-location]').forEach((element) => {
  element.textContent = SITE_CONFIG.location;
});
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
if (SITE_CONFIG.productionUrl.trim()) {
  const baseUrl = SITE_CONFIG.productionUrl.endsWith('/') ? SITE_CONFIG.productionUrl : `${SITE_CONFIG.productionUrl}/`;
  const pagePath = document.body.classList.contains('privacy-page') ? 'privacidad.html' : '';
  const canonicalUrl = new URL(pagePath, baseUrl).href;
  const canonicalLink = document.createElement('link');
  canonicalLink.rel = 'canonical';
  canonicalLink.href = canonicalUrl;
  document.head.append(canonicalLink);
  const openGraphUrl = document.createElement('meta');
  openGraphUrl.setAttribute('property', 'og:url');
  openGraphUrl.content = canonicalUrl;
  document.head.append(openGraphUrl);
}

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

function closeMenu() {
  siteNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    siteNav.classList.toggle('is-open', !isOpen);
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

const projectDialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogEyebrow = document.querySelector('#dialog-eyebrow');
const dialogDescription = document.querySelector('#dialog-description');
const galleryImage = document.querySelector('#gallery-image');
const galleryCaption = document.querySelector('#gallery-caption');
const galleryThumbnails = document.querySelector('#gallery-thumbnails');
let activeProject;
let activeImageIndex = 0;

function showImage(index) {
  activeImageIndex = (index + activeProject.images.length) % activeProject.images.length;
  const image = activeProject.images[activeImageIndex];
  galleryImage.src = image.src;
  galleryImage.alt = image.alt;
  galleryCaption.textContent = image.caption;
  galleryThumbnails.querySelectorAll('button').forEach((button, buttonIndex) => {
    if (buttonIndex === activeImageIndex) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
}

function openProject(projectId, imageIndex = 0) {
  activeProject = PROJECTS[projectId];
  if (!activeProject) return;
  dialogTitle.textContent = activeProject.title;
  dialogEyebrow.textContent = activeProject.eyebrow;
  dialogDescription.textContent = activeProject.description;
  galleryThumbnails.replaceChildren(...activeProject.images.map((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Mostrar imagen ${index + 1}: ${image.caption}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = image.src;
    thumbnail.alt = '';
    thumbnail.width = 187;
    thumbnail.height = 75;
    button.append(thumbnail);
    button.addEventListener('click', () => showImage(index));
    return button;
  }));
  showImage(imageIndex);
  projectDialog.showModal();
  document.body.classList.add('dialog-open');
}

if (projectDialog) {
  document.querySelectorAll('.project-open').forEach((button) => {
    button.addEventListener('click', () => openProject(button.dataset.project, Number(button.dataset.imageIndex || 0)));
  });
  document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
  document.querySelector('.gallery-prev').addEventListener('click', () => showImage(activeImageIndex - 1));
  document.querySelector('.gallery-next').addEventListener('click', () => showImage(activeImageIndex + 1));
  projectDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });
  projectDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      projectDialog.close();
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showImage(activeImageIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(activeImageIndex + 1);
    }
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const contactUnavailable = document.querySelector('#contact-unavailable');
  const formNote = document.querySelector('#form-note');
  const formSubmit = contactForm.querySelector('[type="submit"]');
  if (SITE_CONFIG.contactEmail) {
    contactUnavailable.hidden = true;
    formSubmit.disabled = false;
    formNote.textContent = 'Al continuar, se abrirá tu aplicación de correo con el mensaje preparado para que lo revises y lo envíes.';
  }
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!SITE_CONFIG.contactEmail || !contactForm.reportValidity()) return;
    const values = new FormData(contactForm);
    const subject = `Consulta desde el sitio de ${SITE_CONFIG.brandName}`;
    const body = `Nombre: ${values.get('name')}\nCorreo: ${values.get('email')}\n\n${values.get('message')}`;
    const mailto = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    document.querySelector('#form-feedback').textContent = 'Se preparó el correo en tu aplicación. Revísalo y envíalo desde allí.';
  });
}

const socialLabels = { instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', facebook: 'Facebook' };
const configuredSocials = Object.entries(SITE_CONFIG.socialLinks).filter(([, url]) => url.trim());
const socialList = document.querySelector('#social-links');
if (configuredSocials.length && socialList) {
  socialList.replaceChildren(...configuredSocials.map(([network, url]) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = socialLabels[network] || network;
    item.append(link);
    return item;
  }));
  socialList.hidden = false;
}