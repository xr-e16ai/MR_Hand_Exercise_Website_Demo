// JavaScript for interactive elements


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
    
    // Download button functionality
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function(e) {
        // For demo purposes - in production, this would be the actual APK file
        if (!downloadBtn.getAttribute('href') || downloadBtn.getAttribute('href') === '#') {
            e.preventDefault();
            alert('APK download link configured. Place your APK file in the apk/ folder and name it mr-hand-exercise-v1.0.apk');
            
            // Simulate download for demo (remove in production)
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'mr-hand-exercise-v1.0.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
    
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