// 1. Smooth Scroll for Navigation
document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70,  // Adjusting for navbar height
            behavior: 'smooth'
        });
    });
});

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

// 3. Hero Section Background Image Fade In
window.addEventListener('load', () => {
    document.querySelector('.hero-image img').classList.add('fade-in');
});

// 4. Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.classList.add('back-to-top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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






// contact form 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Event listener for form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let valid = true;

        // Clear previous error messages
        document.querySelectorAll('.form-text').forEach(error => error.textContent = '');

        // Name Validation
        if (nameField.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            valid = false;
        }

        // Email Validation
        if (!validateEmail(emailField.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            valid = false;
        }

        // Subject Validation
        if (subjectField.value.trim() === '') {
            document.getElementById('subjectError').textContent = 'Subject is required.';
            valid = false;
        }

        // Message Validation
        if (messageField.value.trim() === '') {
            document.getElementById('messageError').textContent = 'Message cannot be empty.';
            valid = false;
        }

        if (valid) {
            // Submit form or perform AJAX request
            alert('Message sent successfully!');
            form.reset(); // Reset form on successful submission
        }
    });

    // Email validation function
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
});
