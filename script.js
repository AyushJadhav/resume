document.addEventListener("DOMContentLoaded", function() {
    // Word flick effect
    const wordElement = document.getElementById('word');
    var words = ["INNOVATE...", "CREATE...", "SOLVE...", "DELIVER..."],
        part,
        i = 0,
        offset = 0,
        len = words.length,
        forwards = true,
        skip_count = 0,
        skip_delay = 15,
        speed = 70;

    var wordflick = function () {
        setInterval(function () {
            if (forwards) {
                if (offset >= words[i].length) {
                    ++skip_count;
                    if (skip_count == skip_delay) {
                        forwards = false;
                        skip_count = 0;
                    }
                }
            } else {
                if (offset == 0) {
                    forwards = true;
                    i++;
                    offset = 0;
                    if (i >= len) {
                        i = 0;
                    }
                }
            }
            part = words[i].substr(0, offset);
            if (skip_count == 0) {
                if (forwards) {
                    offset++;
                } else {
                    offset--;
                }
            }
            wordElement.textContent = part;
        }, speed);
    };

    wordflick();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let subject = document.getElementById('subject').value.trim();
    let message = document.getElementById('message').value.trim();

    // Simple validation: Check if required fields are not empty
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Form data object
    let formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Example: Send form data using fetch (you may replace with your preferred method)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form data submitted:', data);
        alert('Form submitted successfully!');
        // Clear form fields after successful submission
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Error submitting form data:', error);
        alert('An error occurred. Please try again later.');
    });
}

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', handleSubmit);

// Function to show certificate based on type (java or iot)
function showCertificate(type) {
    let certificateImage = document.getElementById('certificateImage');
    let modalLabel = document.getElementById('certificateModalLabel');

    // Determine which certificate to show based on type
    if (type === 'java') {
        certificateImage.src = 'images/Java NPTEL certificate.jpg'; // Replace with actual path to Java certificate image
        modalLabel.textContent = 'Java Programming Language Certificate';
    } else if (type === 'iot') {
        certificateImage.src = 'images/IOT NPTEL certificate.jpg';// Replace with actual path to IoT certificate image
        modalLabel.textContent = 'Internet of Things Certificate';
    }

    // Show the modal
    $('#certificateModal').modal('show');
}
// Function to handle the Resume link logic
function openResume() {
    // Check if the current URL contains '/grad'
    if (window.location.pathname.includes('/grad')) {
        window.location.href = "Ayush_Jadhav_2025.pdf"; // Redirect to the new PDF file
    } else {
        window.location.href = "Ayush_Jadhav_Resume.pdf"; // Default resume PDF
    }
}

// Check URL and redirect if needed
window.onload = function () {
    // If URL contains '/grad', set the resume link to 'Ayush_Jadhav_2024.pdf'
    if (window.location.pathname.includes('/grad')) {
        document.getElementById('resume-link').href = "Ayush_Jadhav_2024.pdf";
    }
};
