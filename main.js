/**
 * Hotel Website Main JavaScript
 * Enhanced for responsive design and mobile experience
 */
function barsan()
{
    getElementById()
}

(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function() {
        
        // Initialize all components
        initMobileNavigation();
        initCarousel();
        initSmoothScrolling();
        initFormHandling();
        initCounterAnimation();
        initImageLazyLoading();
        initHeaderScrollEffect();
        initTouchOptimizations();
        
        // Initialize search functionality
        initSearchFunctionality();
        
        // Initialize responsive utilities
        initResponsiveUtilities();
        
        console.log('Hotel website initialized successfully');
    });

    /**
     * Mobile Navigation Handler
     */
    function initMobileNavigation() {
        const menuToggle = $('#menuToggle');
        const navlinks = $('#navlinks');
        const body = $('body');
        
        // Toggle mobile menu
        menuToggle.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navlinks.toggleClass('active');
            $(this).toggleClass('active');
            
            // Toggle body scroll
            if (navlinks.hasClass('active')) {
                body.addClass('menu-open').css('overflow', 'hidden');
                $(this).removeClass('fa-bars').addClass('fa-times');
            } else {
                body.removeClass('menu-open').css('overflow', '');
                $(this).removeClass('fa-times').addClass('fa-bars');
            }
        });
        
        // Close menu when clicking on nav links
        navlinks.find('a').on('click', function() {
            if ($(window).width() < 992) {
                navlinks.removeClass('active');
                menuToggle.removeClass('active fa-times').addClass('fa-bars');
                body.removeClass('menu-open').css('overflow', '');
            }
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#navlinks, #menuToggle').length) {
                navlinks.removeClass('active');
                menuToggle.removeClass('active fa-times').addClass('fa-bars');
                body.removeClass('menu-open').css('overflow', '');
            }
        });
        
        // Handle window resize
        $(window).on('resize', function() {
            if ($(window).width() >= 992) {
                navlinks.removeClass('active');
                menuToggle.removeClass('active fa-times').addClass('fa-bars');
                body.removeClass('menu-open').css('overflow', '');
            }
        });
    }

    /**
     * Carousel Initialization with responsive settings
     */
    function initCarousel() {
        const carousel = $('.home-carousel');
        
        if (carousel.length) {
            carousel.owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                nav: true,
                dots: false,
                navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 600,
                responsive: {
                    0: {
                        nav: false,
                        autoplay: true,
                        autoplayTimeout: 4000
                    },
                    768: {
                        nav: true,
                        autoplay: true,
                        autoplayTimeout: 5000
                    },
                    992: {
                        nav: true,
                        autoplay: true,
                        autoplayTimeout: 6000
                    }
                }
            });
            
            // Add touch swipe support for mobile
            if ('ontouchstart' in window) {
                carousel.on('touchstart', function(e) {
                    carousel.trigger('stop.owl.autoplay');
                });
                
                carousel.on('touchend', function(e) {
                    carousel.trigger('play.owl.autoplay');
                });
            }
        }
    }

    /**
     * Smooth Scrolling for Navigation Links
     */
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                
                const headerHeight = $('header').outerHeight();
                const offset = target.offset().top - headerHeight - 20;
                
                $('html, body').animate({
                    scrollTop: offset
                }, 800, 'swing');
            }
        });
    }

    /**
     * Form Handling with Validation
     */
    function initFormHandling() {
        // Booking form
        $('.book input[type="submit"]').on('click', function(e) {
            e.preventDefault();
            
            const checkinDate = $('.book input[type="date"]').eq(0).val();
            const checkoutDate = $('.book input[type="date"]').eq(1).val();
            const adults = $('.book input[type="number"]').eq(0).val();
            
            if (!checkinDate || !checkoutDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Information',
                    text: 'Please select check-in and check-out dates.',
                    confirmButtonColor: '#ff004f'
                });
                return;
            }
            
            if (new Date(checkinDate) >= new Date(checkoutDate)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Dates',
                    text: 'Check-out date must be after check-in date.',
                    confirmButtonColor: '#ff004f'
                });
                return;
            }
            
            if (!adults || adults < 1) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Missing Information',
                    text: 'Please specify number of adults.',
                    confirmButtonColor: '#ff004f'
                });
                return;
            }
            
            // Simulate booking process
            Swal.fire({
                icon: 'success',
                title: 'Checking Availability...',
                text: 'Please wait while we check available rooms.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Rooms Available!',
                    text: 'Great! We have rooms available for your dates. Redirecting to booking...',
                    confirmButtonColor: '#ff004f'
                });
            });
        });
        
        // Contact form
        $('.contact-form form').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const name = form.find('input[type="text"]').val();
            const email = form.find('input[type="email"]').val();
            const subject = form.find('input[type="text"]').eq(1).val();
            const message = form.find('textarea').val();
            
            if (!name || !email || !subject || !message) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Form',
                    text: 'Please fill in all fields.',
                    confirmButtonColor: '#ff004f'
                });
                return;
            }
            
            // Simulate form submission
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for your message. We will get back to you soon.',
                confirmButtonColor: '#ff004f'
            });
            
            form[0].reset();
        });
        
        // Room booking buttons
        $('.room-card .primary-btn').on('click', function(e) {
            e.preventDefault();
            
            const roomType = $(this).closest('.room-card').find('h3').text();
            
            Swal.fire({
                icon: 'info',
                title: `Book ${roomType}`,
                text: 'Redirecting to booking page...',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            });
        });
    }

    /**
     * Counter Animation on Scroll
     */
    function initCounterAnimation() {
        const counters = $('.count-number');
        let animated = false;
        
        function animateCounters() {
            counters.each(function() {
                const $this = $(this);
                const countTo = parseInt($this.text());
                
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
        
        $(window).on('scroll', function() {
            const counterSection = $('.counter');
            if (counterSection.length && !animated) {
                const sectionTop = counterSection.offset().top;
                const sectionHeight = counterSection.outerHeight();
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                if (windowTop + windowHeight > sectionTop + sectionHeight / 2) {
                    animated = true;
                    animateCounters();
                }
            }
        });
    }

    /**
     * Image Lazy Loading for Performance
     */
    function initImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            $('.lazy').each(function() {
                imageObserver.observe(this);
            });
        }
    }

    /**
     * Header Scroll Effect
     */
    function initHeaderScrollEffect() {
        const header = $('header');
        let lastScrollTop = 0;
        
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            
            if (scrollTop > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
            
            // Hide/show header on scroll (mobile)
            if ($(window).width() < 768) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.addClass('header-hidden');
                } else {
                    header.removeClass('header-hidden');
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }

    /**
     * Search Functionality
     */
    function initSearchFunctionality() {
        const searchIcon = $('#searchIcon');
        
        searchIcon.on('click', function(e) {
            e.preventDefault();
            
            Swal.fire({
                title: 'Search Our Hotel',
                input: 'text',
                inputLabel: 'What are you looking for?',
                inputPlaceholder: 'Enter your search terms...',
                showCancelButton: true,
                confirmButtonText: 'Search',
                confirmButtonColor: '#ff004f',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please enter something to search for!';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Simulate search
                    Swal.fire({
                        icon: 'info',
                        title: 'Searching...',
                        text: `Looking for "${result.value}"`,
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            });
        });
    }

    /**
     * Touch Optimizations for Mobile
     */
    function initTouchOptimizations() {
        // Add touch feedback to buttons
        $('.primary-btn, .secondary-btn, .header-btn').on('touchstart', function() {
            $(this).addClass('touch-active');
        });
        
        $('.primary-btn, .secondary-btn, .header-btn').on('touchend touchcancel', function() {
            const $this = $(this);
            setTimeout(() => {
                $this.removeClass('touch-active');
            }, 150);
        });
        
        // Prevent zoom on double tap for specific elements
        $('.primary-btn, .secondary-btn, .header-btn, input, textarea').on('touchend', function(e) {
            e.preventDefault();
            $(this).focus();
        });
        
        // Improve carousel touch handling
        if ('ontouchstart' in window) {
            $('.owl-carousel').on('touchstart', function(e) {
                $(this).addClass('touching');
            });
            
            $('.owl-carousel').on('touchend', function(e) {
                const $this = $(this);
                setTimeout(() => {
                    $this.removeClass('touching');
                }, 300);
            });
        }
    }

    /**
     * Responsive Utilities
     */
    function initResponsiveUtilities() {
        // Update viewport height for mobile browsers
        function updateViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        updateViewportHeight();
        
        $(window).on('resize orientationchange', function() {
            updateViewportHeight();
            
            // Close mobile menu on orientation change
            if ($(window).width() >= 992) {
                $('#navlinks').removeClass('active');
                $('#menuToggle').removeClass('active fa-times').addClass('fa-bars');
                $('body').removeClass('menu-open').css('overflow', '');
            }
        });
        
        // Debounced resize handler for performance
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                $(window).trigger('debouncedResize');
            }, 250);
        });
        
        // Handle keyboard navigation
        $(document).on('keydown', function(e) {
            // Close mobile menu with Escape key
            if (e.keyCode === 27) {
                $('#navlinks').removeClass('active');
                $('#menuToggle').removeClass('active fa-times').addClass('fa-bars');
                $('body').removeClass('menu-open').css('overflow', '');
            }
        });
        
        // Add focus management for accessibility
        $('#menuToggle').on('keydown', function(e) {
            if (e.keyCode === 13 || e.keyCode === 32) {
                e.preventDefault();
                $(this).click();
            }
        });
        
        // Preload critical images for better performance
        const criticalImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    /**
     * Performance Monitoring
     */
    function initPerformanceMonitoring() {
        // Monitor page load time
        $(window).on('load', function() {
            if (window.performance && window.performance.timing) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Log slow page loads
                if (loadTime > 3000) {
                    console.warn('Slow page load detected');
                }
            }
        });
        
        // Monitor carousel performance
        $('.owl-carousel').on('initialized.owl.carousel', function() {
            console.log('Carousel initialized successfully');
        });
    }

    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }

})(jQuery);

// Add CSS for touch feedback
const style = document.createElement('style');
style.textContent = `
    .touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
    
    .header-hidden {
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease !important;
    }
    
    .menu-open {
        position: fixed !important;
        width: 100% !important;
    }
    
    /* Custom scrollbar for webkit browsers */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #ff004f;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #e60047;
    }
    
    /* Loading animation for images */
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* Focus styles for accessibility */
    *:focus {
        outline: 2px solid #ff004f;
        outline-offset: 2px;
    }
    
    /* Skip link for screen readers */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #ff004f;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    }
    
    .skip-link:focus {
        top: 6px;
    }
`;

document.head.appendChild(style);
