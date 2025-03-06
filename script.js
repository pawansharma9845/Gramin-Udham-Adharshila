document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-active');
  });

  // Close Menu on Link Click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
        console.log('Mobile menu closed via link click');
      }
    });
  });

  // Smooth Scroll with Menu Close
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      // Close menu if mobile
      if (window.innerWidth <= 992) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-active');
      }

      // Scroll after menu animation completes
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });
  });

  setTimeout(() => {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const target = document.querySelector(this.getAttribute('href'));
    const targetPosition = target.offsetTop - headerHeight;
  
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, 300);

  // Close Menu on Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-active');
      console.log('Menu closed via resize');
    }
  });

  // Close Menu When Clicking Outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-active');
      console.log('Menu closed via outside click');
    }
  });

  // Product Carousel Functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.product-card');
  const totalSlides = slides.length;
  const productsGrid = document.querySelector('.products-grid');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');

  // For responsive view only, use native scroll positioning based on each product's offset
  function moveSlide(direction) {
    if (window.innerWidth <= 768) {
      // Update slide index with wrap-around
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      // Get the left offset of the target product card
      const targetPosition = slides[currentSlide].offsetLeft;
      // Smoothly scroll the container to the target product
      productsGrid.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
      console.log(`Current slide: ${currentSlide + 1}/${totalSlides}`);
    }
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => moveSlide(-1));
    nextButton.addEventListener('click', () => moveSlide(1));
  }

  // Carousel Responsive Check (optional)
  function checkScreenSize() {
    const carousel = document.querySelector('.products-carousel');
    if (window.innerWidth <= 768) {
      carousel.classList.add('carousel-active');
      // Align to the current slide on resize
      const targetPosition = slides[currentSlide].offsetLeft;
      productsGrid.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    } else {
      carousel.classList.remove('carousel-active');
      // Reset scroll position for desktop view
      productsGrid.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      currentSlide = 0;
    }
  }

  window.addEventListener('load', checkScreenSize);
  window.addEventListener('resize', checkScreenSize);

  // Drag-to-Scroll Functionality for Responsive View with Clamping
  if (window.innerWidth <= 768) {
    let isDown = false;
    let startX;
    let initialScrollLeft;

    productsGrid.addEventListener('mousedown', (e) => {
      isDown = true;
      productsGrid.classList.add('active');
      startX = e.pageX - productsGrid.offsetLeft;
      initialScrollLeft = productsGrid.scrollLeft;
    });

    productsGrid.addEventListener('mouseleave', () => {
      isDown = false;
      productsGrid.classList.remove('active');
    });

    productsGrid.addEventListener('mouseup', () => {
      isDown = false;
      productsGrid.classList.remove('active');
    });

    productsGrid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - productsGrid.offsetLeft;
      const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
      let newScroll = initialScrollLeft - walk;
      
      // Calculate maximum scroll position and clamp newScroll between 0 and maxScroll
      const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));
      
      productsGrid.scrollLeft = newScroll;
    });
  }

  // Animations for Product and Stat Cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .stat-card').forEach((el) => {
    observer.observe(el);
  });
});
