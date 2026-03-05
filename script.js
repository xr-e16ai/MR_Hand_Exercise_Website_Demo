// JavaScript for interactive elements
/* global emailjs */


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Create particle effect for hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Download form modal logic
    // (openDownloadForm / closeDownloadForm / handleDownloadSubmit are global so onclick="" attributes work)
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize particles
    createParticles();
    
    // Add animation to logo on page load
    const logo = document.querySelector('.logo');
    setTimeout(() => {
        logo.classList.add('animate__animated', 'animate__bounceIn');
    }, 500);
    
    // Add animation to download button
    const downloadButton = document.querySelector('.download-btn-large');
    setInterval(() => {
        downloadButton.classList.remove('animate__pulse');
        void downloadButton.offsetWidth; // Trigger reflow
        downloadButton.classList.add('animate__pulse');
    }, 4000);


        // Video Modal Controls
    const videoModal = document.getElementById("videoModal");
    const demoVideo = document.getElementById("demoVideo");
    const videoCard = document.querySelector(".video-card");
    const closeBtn = document.querySelector(".close-btn");

    function openVideoModal() {
        videoModal.style.display = "flex";
        demoVideo.play();
    }

    function closeVideoModal() {
        videoModal.style.display = "none";
        demoVideo.pause();
    }

    // Open modal when clicking the video card
    videoCard.addEventListener("click", openVideoModal);

    // Close when clicking × button
    closeBtn.addEventListener("click", closeVideoModal);

});

// ── Download Lead-Form Modal ──────────────────────────────────────────────────

function openDownloadForm() {
    const modal = document.getElementById('downloadFormModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('downloadLeadForm').reset();
    document.getElementById('dl_form_error').style.display = 'none';
    const btn = document.getElementById('dlSubmitBtn');
    btn.disabled = false;
    document.getElementById('dlSubmitText').textContent = 'Submit & Download APK';
}

function closeDownloadForm() {
    document.getElementById('downloadFormModal').classList.remove('open');
    document.body.style.overflow = '';
}

function closeDLModalOnOverlay(event) {
    if (event.target === document.getElementById('downloadFormModal')) {
        closeDownloadForm();
    }
}

function handleDownloadSubmit(event) {
    event.preventDefault();

    const name        = document.getElementById('dl_name').value.trim();
    const email       = document.getElementById('dl_email').value.trim();
    const countryCode = document.getElementById('dl_country_code').value;
    const phone       = document.getElementById('dl_phone').value.trim();
    const errorBox    = document.getElementById('dl_form_error');

    // Basic validation
    if (!name || !email || !phone) {
        errorBox.textContent = 'Please fill in all required fields.';
        errorBox.style.display = 'block';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorBox.textContent = 'Please enter a valid email address.';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.style.display = 'none';

    const submitBtn = document.getElementById('dlSubmitBtn');
    const submitText = document.getElementById('dlSubmitText');
    submitBtn.disabled = true;
    submitText.textContent = 'Sending…';

    const templateParams = {
        from_name:    name,
        from_email:   email,
        phone:        countryCode + ' ' + phone,
        to_email:     'info@e16ai.com',
        reply_to:     email
    };

    emailjs.send('service_7m006uh', 'template_4o1vblh', templateParams)
        .then(function() {
            submitText.textContent = 'Starting download…';
            // Trigger APK download
            const link = document.createElement('a');
            link.href = 'apk/MR.apk';
            link.download = 'MR.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // Close modal after short delay
            setTimeout(closeDownloadForm, 1500);
        })
        .catch(function(err) {
            console.error('EmailJS error:', err);
            const detail = (err && err.text) ? err.text : (err && err.status ? 'Status ' + err.status : 'Unknown error');
            errorBox.textContent = 'Failed to send: ' + detail + '. Check console for details.';
            errorBox.style.display = 'block';
            submitBtn.disabled = false;
            submitText.textContent = 'Submit & Download APK';
        });
}