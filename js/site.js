// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initializeMenu();
  initializeSubmenus();
  initializeSlideshow();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeSubmenus();
    initializeSlideshow();
  });
} else {
  initializeMenu();
  initializeSubmenus();
  initializeSlideshow();
}

function initializeMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navWrap = document.querySelector('.nav-wrap');
  
  if (!toggle || !navWrap) return;
  
  // Set initial state
  toggle.textContent = '▼';
  
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    navWrap.classList.toggle('open');
    this.textContent = navWrap.classList.contains('open') ? '▲' : '▼';
  });
}

function initializeSubmenus() {
  document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const hasChildren = this.closest('.has-children');
      if (hasChildren) {
        hasChildren.classList.toggle('open');
      }
    });
  });
}

// Slideshow navigation
function initializeSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const slideZones = document.querySelectorAll('.slide-zone');
  let currentSlide = 0;

  if (slides.length === 0) return;

  // Handle left/right zone clicks
  slideZones.forEach(zone => {
    zone.addEventListener('click', function(e) {
      e.stopPropagation();
      if (this.classList.contains('prev')) {
        navigateSlide(-1);
      } else if (this.classList.contains('next')) {
        navigateSlide(1);
      }
    });
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') navigateSlide(-1);
    if (e.key === 'ArrowRight') navigateSlide(1);
    if (e.key === 'Escape') closeLightbox();
  });

  function navigateSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    // Update slide counter if it exists
    const counter = document.querySelector('.slide-counter');
    if (counter) {
      const activeSlide = slides[currentSlide];
      const num = activeSlide.getAttribute('data-num');
      if (num) counter.textContent = num;
    }
  }

  // Image zoom functionality
  const slideImages = document.querySelectorAll('.slide img');
  const lightbox = document.querySelector('.lightbox');
  
  if (lightbox) {
    slideImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = this.src;
        lightbox.classList.add('open');
        document.body.classList.add('lightbox-open');
      });
    });

    lightbox.addEventListener('click', closeLightbox);
  }

  function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.classList.remove('lightbox-open');
    }
  }
}
