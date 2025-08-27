// Header Loading Function
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            // Insert header at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Set active navigation based on current page
            setActiveNavigation();
            
            // Initialize mobile navigation after header is loaded
            initMobileNavigation();
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

// Set active navigation state
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();

    // Poster Filtering Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posterItems = document.querySelectorAll('.poster-item');

    if (filterButtons.length > 0 && posterItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                posterItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual form handling)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Poster download and view functionality
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Download functionality is handled by the href attribute
            // No need to prevent default or add extra logic
        });
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const posterItem = this.closest('.poster-item');
            const posterImage = posterItem.querySelector('img');
            const posterTitle = posterItem.querySelector('h3').textContent;
            
            if (posterImage) {
                viewFullSize(posterImage.src, posterTitle);
            }
        });
    });

    // Add loading animation to images when they're replaced with real content
    function addImageLoading() {
        const placeholderImages = document.querySelectorAll('.placeholder-image');
        placeholderImages.forEach(img => {
            img.addEventListener('click', function() {
                this.style.cursor = 'pointer';
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    addImageLoading();

    // Add hover effects to Instagram links
    const instagramLinks = document.querySelectorAll('.instagram-link');
    instagramLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Utility function to show success/error messages
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modal functionality for poster full-size viewing
function viewFullSize(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const magnifier = document.getElementById('magnifier');
    
    if (modal && modalImg && modalTitle && magnifier) {
        modalTitle.textContent = title;
        modalImg.src = imageSrc;
        modal.style.display = 'block';
        
        // Reset magnifier
        magnifier.style.display = 'none';
        
        // Wait for image to load before setting up magnifier
        modalImg.onload = function() {
            setupMagnifier(modalImg, magnifier);
        };
        
        // If image is already loaded
        if (modalImg.complete) {
            setupMagnifier(modalImg, magnifier);
        }
    }
}

function setupMagnifier(image, magnifier) {
    const zoomLevel = 3;
    const magnifierSize = 200;
    
    // Mouse enter - show magnifier
    image.addEventListener('mouseenter', function() {
        magnifier.style.display = 'block';
    });
    
    // Mouse leave - hide magnifier
    image.addEventListener('mouseleave', function() {
        magnifier.style.display = 'none';
    });
    
    // Mouse move - update magnifier position and content
    image.addEventListener('mousemove', function(e) {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate magnifier position relative to the modal content
        const modalContent = image.closest('.modal-content');
        const modalRect = modalContent.getBoundingClientRect();
        const magnifierX = e.clientX - modalRect.left - magnifierSize / 2;
        const magnifierY = e.clientY - modalRect.top - magnifierSize / 2;
        
        // Position the magnifier
        magnifier.style.left = magnifierX + 'px';
        magnifier.style.top = magnifierY + 'px';
        
        // Calculate the scaled dimensions maintaining aspect ratio
        const imageAspectRatio = image.naturalWidth / image.naturalHeight;
        const displayAspectRatio = image.offsetWidth / image.offsetHeight;
        
        let scaledWidth, scaledHeight;
        if (imageAspectRatio > displayAspectRatio) {
            // Image is wider than display
            scaledWidth = image.offsetWidth * zoomLevel;
            scaledHeight = scaledWidth / imageAspectRatio;
        } else {
            // Image is taller than display
            scaledHeight = image.offsetHeight * zoomLevel;
            scaledWidth = scaledHeight * imageAspectRatio;
        }
        
        // Calculate background position for zoomed view
        // The background should be positioned so that the cursor point is centered in the magnifier
        const bgX = (x / image.offsetWidth) * 100;
        const bgY = (y / image.offsetHeight) * 100;
        
        // Set the magnified background with proper aspect ratio
        magnifier.style.backgroundImage = `url(${image.src})`;
        magnifier.style.backgroundPosition = `${bgX}% ${bgY}%`;
        magnifier.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
        magnifier.style.backgroundRepeat = 'no-repeat';
    });
}

// Initialize modal close functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking the X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('imageModal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
