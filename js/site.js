// Initialize when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  // DOM already loaded, initialize immediately
  setTimeout(initializeAll, 0);
}

function initializeAll() {
  initializeMenu();
  initializeSubmenus();
  initializeSlideshow();
}

// Mobile menu button toggle
function initializeMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navWrap = document.querySelector('.nav-wrap');
  
  if (!toggle || !navWrap) {
    console.warn('Menu elements not found');
    return;
  }
  
  // Set initial state: menu is closed, button shows down arrow
  toggle.textContent = '▼';
  navWrap.classList.remove('open');
  
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const isOpen = navWrap.classList.contains('open');
    
    if (isOpen) {
      // Menu is open, close it and show down arrow
      navWrap.classList.remove('open');
      toggle.textContent = '▼';
    } else {
      // Menu is closed, open it and show up arrow
      navWrap.classList.add('open');
      toggle.textContent = '▲';
    }
  });
}

// Projects submenu toggle (works on both desktop and mobile)
function initializeSubmenus() {
  const toggles = document.querySelectorAll('a.toggle');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const listItem = this.closest('li.has-children');
      if (listItem) {
        listItem.classList.toggle('open');
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

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') navigateSlide(-1);
    if (e.key === 'ArrowRight') navigateSlide(1);
    if (e.key === 'Escape') closeLightbox();
  });

  function navigateSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Image zoom
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
