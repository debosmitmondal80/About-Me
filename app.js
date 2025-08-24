// Portfolio Website JavaScript - Simplified and reliable version////////////////////NEW CHANGE
// Force scroll to top on page load/reload
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Disable browser scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    
    // Get navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling function
    function smoothScrollToElement(targetElement) {
        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Handle smooth scroll links
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll, a[href^="#"]');
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links that start with #
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1); // Remove the #
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    smoothScrollToElement(targetElement);
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (navToggle) {
                            navToggle.classList.remove('active');
                        }
                    }
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Update navbar appearance on scroll
    function updateNavbar() {
        if (navbar) {
            const scrolled = window.scrollY > 50;
            
            if (scrolled) {
                navbar.style.backgroundColor = 'rgba(19, 52, 59, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(19, 52, 59, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // Highlight active navigation link
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0) return;
        
        const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 80) + 100;
        
        let currentSection = null;
        
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll handler
    let scrollTimer = null;
    function handleScroll() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            updateNavbar();
            highlightActiveSection();
        }, 10);
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Elements to animate
        const animatedElements = document.querySelectorAll('.project-card, .social-link, .hero-content, .section-header');
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .project-card,
        .social-link,
        .hero-content,
        .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .btn {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .project-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s ease-out;
        }
        
        .project-card:hover {
            transform: translateY(-8px);
        }
        
        .social-link {
            transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.8s ease-out;
        }
        
        .social-link:hover {
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(animationStyles);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Page load animation
    function initPageAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }

    // Initialize everything
    function initialize() {
        initPageAnimation();
        updateNavbar();
        highlightActiveSection();
        
        // Force a small delay to ensure everything is loaded
        setTimeout(function() {
            updateNavbar();
            highlightActiveSection();
        }, 500);
    }

    // Start initialization
    initialize();

    // Log success message
    console.log('✅ Debosmit Mondal Portfolio - All systems operational!');
    
    // Test all links on page load
    const allLinks = document.querySelectorAll('a');
    console.log(`📊 Found ${allLinks.length} total links on the page`);
    
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`🔗 Found ${internalLinks.length} internal navigation links`);
    
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    console.log(`🌐 Found ${externalLinks.length} external links with target="_blank"`);
    
});