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
    const text = "Welcome to Friends Church (Quakers) Kabete";
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


// Annoncement bar 
document.addEventListener("DOMContentLoaded", function () {
    const announcementText = document.getElementById("announcement-text");

    // Duplicate content multiple times for infinite scrolling
    let originalText = announcementText.innerHTML;
    announcementText.innerHTML = originalText + " | " + originalText + " | " + originalText + " | " + originalText;
});



// Hero section - Ensure carousel works properly
document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("carouselExampleFade");

    // Autoplay carousel on page load
    new bootstrap.Carousel(carousel, {
        interval: 4000, // Slide every 4 seconds
        pause: "hover"
    });
});

// About section JS - Adds hover effect on cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.why-card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});

// Why join us section
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 1000, // Animation duration
        once: true, // Ensures animations run only once
    });
    // Hover Effect on Cards
    const whyCards = document.querySelectorAll(".why-card");
    whyCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 12px 24px rgba(0, 214, 255, 0.4)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 5px 15px rgba(0, 214, 255, 0.3)";
        });
    });
});

// Sermons  section

document.addEventListener('DOMContentLoaded', function () {
    // Sermon filter and search functionality
    const sermonFilter = document.getElementById('sermonFilter');
    const sermonSearch = document.getElementById('sermonSearch');
    const sermonCards = document.querySelectorAll('#sermonsGrid .col-md-4');

    // YouTube Video Embed URL
    const latestSermonVideo = document.getElementById('latestSermonVideo');
    const latestSermonURL = "https://www.youtube.com/embed/dmNsoMLB3E8"; // Change this for new sermon updates

    // Set YouTube Video Source Dynamically
    if (latestSermonVideo) {
        latestSermonVideo.src = latestSermonURL;
    }

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
            const title = card.querySelector('.sermons-card-title').textContent.toLowerCase();
            const description = card.querySelector('.sermons-card-text').textContent.toLowerCase();
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
document.addEventListener('DOMContentLoaded', function () {
    // Event Countdown Timer
    const eventDates = [
        { id: "event1", date: "2024-12-02T10:00:00" },
        { id: "event2", date: "2024-12-15T08:30:00" },
        { id: "event3", date: "2025-01-12T09:00:00" },
        { id: "event4", date: "2025-02-10T09:00:00" },
        { id: "event5", date: "2025-03-03T15:00:00" },
        { id: "event6", date: "2025-03-23T13:00:00" }
    ];

    eventDates.forEach(event => {
        let countdownElement = document.createElement("p");
        countdownElement.classList.add("events-countdown");
        countdownElement.innerHTML = "Counting down...";

        let eventCard = document.querySelector(`.events-card-title:contains('${event.id}')`);
        if (eventCard) eventCard.parentNode.appendChild(countdownElement);

        function updateCountdown() {
            const now = new Date();
            const eventDate = new Date(event.date);
            const timeLeft = eventDate - now;

            if (timeLeft > 0) {
                let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);

                countdownElement.innerHTML = `Starts in: ${days}d ${hours}h ${minutes}m`;
            } else {
                countdownElement.innerHTML = "Event is Live!";
            }
        }

        setInterval(updateCountdown, 1000);
    });

    // AOS Animation
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
    });
});





// Open donation modal
function openDonateModal(type) {
    const modal = document.getElementById('donate-modal');
    modal.style.display = 'flex';

    document.querySelectorAll('.payment-section').forEach(section => {
        section.style.display = 'none';
    });

    if (type === 'mpesa') {
        document.getElementById('mpesa-section').style.display = 'block';
    }
}

// Close donation modal
function closeDonateModal() {
    document.getElementById('donate-modal').style.display = 'none';
}

// M-Pesa STK Push request with amount
document.getElementById('donation-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const mpesaNumber = document.getElementById('mpesa-number').value;
    const amount = document.getElementById('amount').value;

    if (!mpesaNumber || !amount) {
        alert("Please enter both phone number and amount.");
        return;
    }

    fetch("php/stk_push.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone: mpesaNumber, amount: amount })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ResponseCode === "0") {
                alert("STK Push sent to your phone. Please confirm payment.");
            } else {
                alert("Error: " + data.errorMessage);
            }
        })
        .catch(error => console.error("Error:", error));
});


// Blog section 
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({ duration: 1000, once: true });

    const blogCards = document.querySelectorAll(".blog-card");
    blogCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 12px 24px rgba(0, 214, 255, 0.4)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "0 5px 15px rgba(0, 214, 255, 0.3)";
        });
    });
});


// contact us section 

document.addEventListener('DOMContentLoaded', function () {
    // Form validation
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            alert('Message sent successfully!');
            form.reset();
        }
        form.classList.add('was-validated');
    });

    // Adjust Map Size Based on Screen Width
    function adjustMapHeight() {
        const mapIframe = document.querySelector('#contactMap');
        mapIframe.style.height = window.innerWidth < 576 ? '250px' : '350px';
    }

    window.addEventListener('resize', adjustMapHeight);
    adjustMapHeight();
});



// Chat widget 

document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const closeChat = document.getElementById("close-chat");
    const sendMessage = document.getElementById("send-message");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    // Open chat with animation
    chatToggle.addEventListener("click", function () {
        chatBox.style.display = "flex";
        setTimeout(() => {
            chatBox.style.opacity = "1";
            chatBox.style.transform = "translateY(0)";
        }, 100);
    });

    // Close chat
    closeChat.addEventListener("click", function () {
        chatBox.style.opacity = "0";
        chatBox.style.transform = "translateY(10px)";
        setTimeout(() => {
            chatBox.style.display = "none";
        }, 300);
    });

    // Send message
    sendMessage.addEventListener("click", function () {
        if (chatInput.value.trim() !== "") {
            let userMessage = document.createElement("div");
            userMessage.classList.add("chat-message", "user-message");
            userMessage.textContent = chatInput.value;
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
            chatInput.value = "";
        }
    });

    // Send message on Enter key press
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage.click();
        }
    });
});


// Whatsup floating button 
document.addEventListener("DOMContentLoaded", function () {
    const whatsappBtn = document.getElementById("whatsapp-btn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            whatsappBtn.style.display = "flex";
        } else {
            whatsappBtn.style.display = "none";
        }
    });
});



// Back to top button 
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("back-to-top");

    // Show button when scrolling down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});

// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable common dev tool shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});