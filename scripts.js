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

// Top navbar  section 
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const text = "Welcome to Friends Church Quakers Kabete";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, getTypingSpeed()); // Adjust speed dynamically
        } else {
            setTimeout(() => {
                textElement.innerHTML = "";
                index = 0;
                typeText(); // Restart typing effect
            }, 2000);
        }
    }

    function getTypingSpeed() {
        if (window.innerWidth <= 480) return 150; // Slower speed for small screens
        if (window.innerWidth <= 768) return 120;
        return 100; // Normal speed for larger screens
    }

    typeText();

    // Recalculate typing speed on window resize
    window.addEventListener("resize", function () {
        index = 0;
        textElement.innerHTML = "";
        typeText();
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


// Hero section js 
document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("carouselExampleFade");

    // Autoplay carousel on page load
    new bootstrap.Carousel(carousel, {
        interval: 4000, // Slide every 4 seconds
        pause: "hover"
    });
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

// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select the testimony form
    const form = document.getElementById('testimony-form');

    // Add an event listener to handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission (refreshing the page)

        // Get the values of the form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const video = document.getElementById('video').files[0]; // Get the selected video file (if any)

        // Basic validation: Check if required fields are filled
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all the required fields.");
            return; // Stop further execution if any required field is empty
        }

        // Optional: Validate the video file size (example: max 10MB)
        if (video && video.size > 10 * 1024 * 1024) {
            alert("File size exceeds 10MB. Please upload a smaller file.");
            return; // Stop further execution if the file is too large
        }

        // If all validation passes, show a success message (in a real app, you would send data to the server)
        alert("Thank you for your testimony! We will review it shortly.");

        // Reset the form after submission (optional)
        form.reset();
    });

    // Select the video input element
    const videoInput = document.getElementById('video');
    // Create a span element to display the name of the selected video file
    const videoLabel = document.createElement('span');
    videoInput.parentNode.appendChild(videoLabel); // Append the label to the parent element

    // Add an event listener to the video input field
    videoInput.addEventListener('change', function () {
        // If a video file is selected, display the file name
        if (this.files && this.files[0]) {
            videoLabel.textContent = `Selected file: ${this.files[0].name}`;
        } else {
            videoLabel.textContent = ""; // Clear the label if no file is selected
        }
    });

    // Optional: Smooth scroll functionality for a button or link to scroll to the form
    const scrollToFormButton = document.getElementById('scroll-to-form');
    if (scrollToFormButton) {
        // Add event listener to the scroll-to-form button
        scrollToFormButton.addEventListener('click', function () {
            // Smooth scroll to the testimony form with an offset (e.g., for a fixed header)
            window.scrollTo({
                top: form.offsetTop - 50, // Scroll to the form, minus 50px offset
                behavior: 'smooth' // Enable smooth scrolling
            });
        });
    }
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
