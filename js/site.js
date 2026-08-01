document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const navWrap = document.querySelector('.nav-wrap');
  if (toggle && navWrap) {
    toggle.addEventListener('click', () => {
      navWrap.classList.toggle('open');
      toggle.textContent = navWrap.classList.contains('open') ? 'Close' : 'Menu';
    });
  }

  // Expandable submenu in sidebar
  document.querySelectorAll('.has-children > .toggle').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      el.parentElement.classList.toggle('open');
    });
  });

  // Slideshow
  document.querySelectorAll('.slideshow').forEach(initSlideshow);

  // Lightbox (click any slide image to enlarge)
  initLightbox();

  // Postcard tile videos — seek to first frame so a still preview is shown
  document.querySelectorAll('.tile video').forEach(v => {
    v.addEventListener('loadedmetadata', () => {
      try { v.currentTime = 0.1; } catch (e) {}
    });
  });
});

function initSlideshow(root) {
  const slides = Array.from(root.querySelectorAll('.slide'));
  const counter = root.querySelector('.slide-counter');
  if (slides.length === 0) return;
  let i = 0;

  const show = (n) => {
    slides[i].querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    if (counter) counter.textContent = `${i + 1} / ${slides.length}`;
    // Autoplay the active slide's video (muted, so browsers allow it)
    slides[i].querySelectorAll('video').forEach(v => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    });
  };

  root.querySelector('.slide-zone.prev')?.addEventListener('click', () => show(i - 1));
  root.querySelector('.slide-zone.next')?.addEventListener('click', () => show(i + 1));

  document.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('lightbox-open')) return;
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });

  show(0);
}

function initLightbox() {
  // Build a single overlay element used by all images
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = '<img alt="">';
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('img');

  const open = (src, alt) => {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('open');
    document.body.classList.add('lightbox-open');
  };
  const close = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    overlayImg.src = '';
  };

  document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      open(img.currentSrc || img.src, img.alt);
    });
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
