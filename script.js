//navbar underlining
const nav = document.querySelector(".links");
const underline = document.querySelector(".underline");
const links = nav.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    const rect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  });

  link.addEventListener("mouseleave", () => {
    underline.style.width = `0`;
  });
});


// Slider only runs if element exists
const slides = document.getElementById('slides');
if (slides) {
  let current = 0;
  const total = slides.children.length;
  let autoplayInterval;

  function showSlide(index) {
    current = (index + total) % total;
    slides.style.transform = `translateX(-${current * 100}vw)`;
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      showSlide(current + 1);
    }, 6000); // 6 seconds
  }

  function restartAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();
}



// blocks in realizacie

// Toggle details on button click
document.querySelectorAll('.open-details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const details = card.querySelector('.project-details');
    const isVisible = details.style.display === 'block';
    details.style.display = isVisible ? 'none' : 'block';
    btn.textContent = isVisible ? 'viac' : 'Menej';
  });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentGalleryImages = [];
let currentIndex = 0;

// Open lightbox on gallery image click
document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', e => {
    e.stopPropagation();
    const card = img.closest('.project-card');
    const gallery = [...card.querySelectorAll('.project-gallery img')];
    currentGalleryImages = gallery.map(i => i.src);
    currentIndex = gallery.indexOf(img);
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = currentGalleryImages[currentIndex];
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  lightboxImg.src = currentGalleryImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentGalleryImages.length;
  lightboxImg.src = currentGalleryImages[currentIndex];
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Close lightbox on background click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});




