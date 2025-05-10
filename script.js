document.addEventListener('DOMContentLoaded', function() {

const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const mainNav = document.querySelector('.main-nav'); // Select nav element

if (searchToggle && searchBox && mainNav) {
    searchToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        mainNav.classList.toggle('hidden'); // Add or remove 'hidden' class on nav
    });

    // Close search when clicking outside
    document.addEventListener('click', function (event) {
        if (
            !searchBox.contains(event.target) &&
            !searchToggle.contains(event.target)
        ) {
            searchBox.classList.remove('active');
            mainNav.classList.remove('hidden');
        }
    });
}

document.querySelectorAll('.btn').forEach(btn => {
  const label = btn.dataset.label;
  const iconName = btn.dataset.lucideIcon;
  const iconSize = btn.dataset.size || '12'; // fallback to 24 if not provided

  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', iconName);
  icon.setAttribute('data-size', iconSize);

  const span = document.createElement('span');
  span.textContent = label;

  btn.appendChild(icon);
  btn.appendChild(span);
});

// Render all Lucide icons with their custom sizes
lucide.createIcons();
 
  // Mobile Menu Toggle
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburgerMenu && mobileMenu) {
      hamburgerMenu.addEventListener('click', function() {
          hamburgerMenu.classList.toggle('active');
          mobileMenu.classList.toggle('active');
      });
  }
  
  // Product Gallery
// Image carousel functionality
const mainImage = document.getElementById('alcami-main-image');
const prevBtn = document.querySelector('.alcami-prev-btn');
const nextBtn = document.querySelector('.alcami-next-btn');
const dots = document.querySelectorAll('.alcami-dot');
const thumbnails = document.querySelectorAll('.alcami-thumbnail');

// Array of image sources
const images = [
    '/assets/Group 1000004277.png',
    '/assets/extra3.png',
    '/assets/extra2.png',
    '/assets/extra1.jpg',
    '/assets/green-front.png',
    '/assets/green-back.png',
    '/assets/brown-front.png',
    '/assets/brown-back.png',
];

let currentIndex = 0;

// Function to update the main image
function updateMainImage(index) {
    // Ensure index is within bounds
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    
    currentIndex = index;
    mainImage.src = images[currentIndex];
    
    // Update active dot (only for the first 4 images that have dots)
    dots.forEach((dot, i) => {
        if (i === currentIndex && i < dots.length) {
            dot.classList.add('active');
        } else if (i < dots.length) {
            dot.classList.remove('active');
        }
    });
    
    // Update active thumbnail
    thumbnails.forEach((thumbnail, i) => {
        if (i === currentIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    updateMainImage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    updateMainImage(currentIndex + 1);
});

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateMainImage(index);
    });
});

// Event listeners for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateMainImage(index);
    });
});

// // Radio button functionality for dynamic "Add to Cart" link
// const flavorRadios = document.querySelectorAll('input[name="alcami-flavor"]');
// const purchaseTypeRadios = document.querySelectorAll('input[name="alcami-purchase-type"]');
// const addToCartBtn = document.getElementById('alcami-add-to-cart-btn');

// // Cart URL mapping for all combinations
// const cartUrls = {
//     'original-single-kit': 'https://example.com/cart/original-single-kit',
//     'original-double-kit': 'https://example.com/cart/original-double-kit',
//     'original-try-once': 'https://example.com/cart/original-try-once',
//     'matcha-single-kit': 'https://example.com/cart/matcha-single-kit',
//     'matcha-double-kit': 'https://example.com/cart/matcha-double-kit',
//     'matcha-try-once': 'https://example.com/cart/matcha-try-once',
//     'cacao-single-kit': 'https://example.com/cart/cacao-single-kit',
//     'cacao-double-kit': 'https://example.com/cart/cacao-double-kit',
//     'cacao-try-once': 'https://example.com/cart/cacao-try-once'
// };

// // Function to update the "Add to Cart" link
// function updateAddToCartLink() {
//     let selectedFlavor = '';
//     let selectedPurchaseType = '';
    
//     // Get selected flavor
//     flavorRadios.forEach(radio => {
//         if (radio.checked) {
//             selectedFlavor = radio.value;
//         }
//     });
    
//     // Get selected purchase type
//     purchaseTypeRadios.forEach(radio => {
//         if (radio.checked) {
//             selectedPurchaseType = radio.value;
//         }
//     });
    
//     // Update the link
//     const cartKey = `${selectedFlavor}-${selectedPurchaseType}`;
//     addToCartBtn.href = cartUrls[cartKey] || '#';
    
//     console.log(`Cart URL updated to: ${addToCartBtn.href} (${cartKey})`);
// }

// // Add event listeners to radio buttons
// flavorRadios.forEach(radio => {
//     radio.addEventListener('change', updateAddToCartLink);
// });

// purchaseTypeRadios.forEach(radio => {
//     radio.addEventListener('change', updateAddToCartLink);
// });

// // Initialize the cart link
// updateAddToCartLink();
  
  // Animated Stats Counter
  const statElements = [
      document.getElementById('stat1'),
      document.getElementById('stat2'),
      document.getElementById('stat3'),
      document.getElementById('stat4'),
  ];
  
  const statValues = [84, 78, 89 , 90]; // Target values
  
  // Function to animate counting
  function animateCounter(element, target) {
      if (!element) return;
      
      let current = 0;
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
          current += step;
          if (current >= target) {
              clearInterval(timer);
              current = target;
          }
          element.textContent = Math.floor(current) + '%';
      }, 16);
  }
  
  // Intersection Observer to trigger counter when in view
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const statsSection = entry.target;
              
              // Start animation for each stat
              statElements.forEach((element, index) => {
                  if (element) {
                      animateCounter(element, statValues[index]);
                  }
              });
              
              // Unobserve after triggering
              statsObserver.unobserve(statsSection);
          }
      });
  }, observerOptions);
  
  // Observe the stats section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
      statsObserver.observe(statsSection);
  }
  
  // Testimonials Slider
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  
  if (testimonialsContainer && testimonialPrev && testimonialNext) {
      const scrollAmount = 380; // Width of testimonial card + gap
      
      testimonialPrev.addEventListener('click', function() {
          testimonialsContainer.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
          });
      });
      
      testimonialNext.addEventListener('click', function() {
          testimonialsContainer.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
          });
      });
  }
  
  // FAQ Accordions
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
          // Close all other FAQs
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.classList.remove('active');
              }
          });
          
          // Toggle current FAQ
          item.classList.toggle('active');
      });
  });
});