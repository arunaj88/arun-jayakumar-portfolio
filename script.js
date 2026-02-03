document.addEventListener('DOMContentLoaded', () => {
    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit');
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;

            // Loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Validation
            if (!data.email.includes('@')) {
                showStatus('Please enter a valid email address.', 'error');
                resetBtn();
                return;
            }

            // Backend simulation (Replace with real API endpoint if needed)
            try {
                await simulateSubmission(data);
                showStatus('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } catch (err) {
                showStatus('Something went wrong. Please try again later.', 'error');
            } finally {
                resetBtn();
            }

            function resetBtn() {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }

            function showStatus(message, type) {
                formStatus.textContent = message;
                formStatus.className = `form-status ${type}`;
                formStatus.style.display = 'block';

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    async function simulateSubmission(data) {
        console.log('Sending message:', data);
        return new Promise(resolve => setTimeout(resolve, 800));
    }

    // 1. Navbar Scroll Effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.fade-reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Smooth Scrolling for Nav Links
    document.querySelectorAll('.nav-links a, .cta-group a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Subtle Parallax for Mesh Background
    const bgMesh = document.querySelector('.bg-mesh');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        bgMesh.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    // 5. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when a link is clicked (on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 6. Terminal Typewriter Effect (Improved for existing content)
    const terminalBody = document.querySelector('.terminal-body code');
    if (terminalBody) {
        const originalHTML = terminalBody.innerHTML;
        terminalBody.innerHTML = '';
        let i = 0;

        // This is a simple version, for complex HTML it's better to show line by line
        // or just use a typing animation on the container.
        // Let's do a line-by-line reveal for better effect with syntax highlighting.
        terminalBody.style.opacity = '1';
        const lines = originalHTML.split('\n');
        let currentLine = 0;

        function typeLine() {
            if (currentLine < lines.length) {
                terminalBody.innerHTML += lines[currentLine] + '\n';
                currentLine++;
                setTimeout(typeLine, 20);
            }
        }

        // Start typing after initial fade-in
        setTimeout(typeLine, 400);
    }
});
