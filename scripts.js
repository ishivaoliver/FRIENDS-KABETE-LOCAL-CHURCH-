// 1. Smooth Scroll for Navigation
document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
});


// Dynamically resize fonts for better readability
function adjustFontSize() {
    const viewportWidth = window.innerWidth;

    const headings = document.querySelectorAll('h1, h2, h3');
    const paragraphs = document.querySelectorAll('p');
    headings.forEach(heading => {
        heading.style.fontSize = viewportWidth < 768 ? '1.5rem' : '2rem';
    });
    paragraphs.forEach(paragraph => {
        paragraph.style.fontSize = viewportWidth < 768 ? '0.9rem' : '1rem';
    });
}

// Call on load and resize
window.addEventListener('resize', adjustFontSize);
adjustFontSize();


// 2. Navbar Collapse on Mobile after Clicking a Link
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarNav = document.querySelector('.navbar-collapse');

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navbarToggler.click(); // This triggers the collapse
        }
    });
});


// Smooth scroll offset adjustment for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        const offset = document.querySelector('.navbar').offsetHeight || 70; // Adjust for navbar height
        const topPosition = targetElement.offsetTop - offset;

        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    });
});


// 3. Hero Section Background Image Fade In
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".hero-slider");
    const slides = document.querySelectorAll(".hero-slider .slide");
    let currentIndex = 0;

    const changeSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Auto-slide every 5 seconds
    setInterval(changeSlide, 5000);

    // Ensure text responsiveness on resize
    const adjustTextSize = () => {
        const viewportWidth = window.innerWidth;
        const heroHeading = document.querySelector("#hero h1");
        const heroParagraph = document.querySelector("#hero p");

        if (viewportWidth <= 576) {
            heroHeading.style.fontSize = `${Math.max(18, viewportWidth * 0.05)}px`;
            heroParagraph.style.fontSize = `${Math.max(14, viewportWidth * 0.03)}px`;
        } else {
            heroHeading.style.fontSize = "";
            heroParagraph.style.fontSize = "";
        }
    };

    adjustTextSize();
    window.addEventListener("resize", adjustTextSize);
});

// Animations for hero sectiom
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".hero-slider");
    const slides = document.querySelectorAll(".hero-slider .slide");
    const heading = document.querySelector("#hero h1");
    const paragraph = document.querySelector("#hero p");
    const buttons = document.querySelectorAll("#hero .btn");

    let currentIndex = 0;

    const changeSlide = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove("active");
            if (index === currentIndex) {
                slide.classList.add("active");
            }
        });

        // Reset animations for text
        heading.style.opacity = "0";
        paragraph.style.opacity = "0";
        buttons.forEach((button) => (button.style.opacity = "0"));

        // Trigger text animations
        setTimeout(() => {
            heading.style.opacity = "1";
            paragraph.style.opacity = "1";
            buttons.forEach((button) => (button.style.opacity = "1"));
        }, 500);
    };

    const startSlider = () => {
        changeSlide();
        currentIndex = (currentIndex + 1) % slides.length;
        setTimeout(startSlider, 5000); // Slide interval
    };

    startSlider();
});

// Parallax scrolling for hero section 
document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const slides = document.querySelectorAll(".hero-slider .slide img");

    slides.forEach((img) => {
        img.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
});


// Smooth Scroll Effect for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Intersection Observer for Animations
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-in-text, .fade-in-list li, .fade-in-button");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});
// About section js
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.why-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Sermons 

document.addEventListener('DOMContentLoaded', function () {
    // Sermon filter and search functionality
    const sermonFilter = document.getElementById('sermonFilter');
    const sermonSearch = document.getElementById('sermonSearch');
    const sermonCards = document.querySelectorAll('#sermonsGrid .col-md-4');

    // Filter Sermons by Category
    sermonFilter.addEventListener('change', filterSermons);
    sermonSearch.addEventListener('input', searchSermons);

    function filterSermons() {
        const selectedCategory = sermonFilter.value.toLowerCase();
        sermonCards.forEach(card => {
            const category = card.getAttribute('data-category').toLowerCase();
            if (selectedCategory === 'all' || category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search Sermons by Title or Description
    function searchSermons() {
        const query = sermonSearch.value.toLowerCase();
        sermonCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize: Show all sermons by default
    filterSermons();
});



// Events section 




// Open and Close Modal
function openDonateModal(type) {
    const modal = document.getElementById('donate-modal');
    modal.style.display = 'flex';
    const title = document.querySelector('.modal-title');
    title.textContent = type === 'one-time' ? 'One-Time Donation' : 'Monthly Support';
}

function closeDonateModal() {
    const modal = document.getElementById('donate-modal');
    modal.style.display = 'none';
}

// Handle Donation Form Submission
document.getElementById('donation-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const amount = document.getElementById('donation-amount').value;
    const method = document.getElementById('payment-method').value;
    alert(`Thank you for your donation of $${amount} via ${method}!`);
    closeDonateModal();
});


document.addEventListener('DOMContentLoaded', function () {
    // Form validation
    const form = document.querySelector('#contact form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Handle form submission
            alert('Message sent successfully!');
        }
        form.classList.add('was-validated');
    }, false);

    // Adjust iframe height dynamically based on screen size
    function adjustMapHeight() {
        const mapIframe = document.querySelector('.contact-section iframe');
        const viewportWidth = window.innerWidth;

        if (viewportWidth < 576) {
            mapIframe.style.height = '200px';
        } else {
            mapIframe.style.height = '250px';
        }
    }

    // Smooth scroll for 'Get Directions' button
    document.querySelector('.btn-outline-primary').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    });

    // Call the map height adjustment function on load and resize
    window.addEventListener('resize', adjustMapHeight);
    adjustMapHeight();






    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scroll({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Show/Hide Button on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
            backToTopButton.classList.remove("hidden");
        } else {
            backToTopButton.classList.add("hidden");
            backToTopButton.classList.remove("visible");
        }
    });

    // Scroll to Top on Click
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
