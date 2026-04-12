document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // IoT Data Simulation Logic
    const initIoTSimulation = () => {
        const tempElement = document.getElementById('iot-temp');
        const humidityElement = document.getElementById('iot-humidity');
        const lightElement = document.getElementById('iot-light');

        if (!tempElement || !humidityElement || !lightElement) return;

        setInterval(() => {
            // Temperature simulation (Range: 2.0 - 8.0 C for vaccines)
            const temp = (2 + Math.random() * 6).toFixed(1);
            tempElement.textContent = temp;

            // Humidity simulation (Range: 35 - 55%)
            const humidity = (35 + Math.random() * 20).toFixed(1);
            humidityElement.textContent = humidity;

            // Light simulation (Range: 100 - 500 Lux)
            const light = Math.floor(100 + Math.random() * 400);
            lightElement.textContent = light;
        }, 2000);
    };

    initIoTSimulation();

    // Change Navbar appearance on scroll
    const navbar = document.querySelector('.navbar-new');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.custom-card, .iot-display').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Velocidad del conteo

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats-counter-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }
    // Typing Animation Logic
    const typeWriter = (selector, text, i, fnCallback) => {
        const el = document.querySelector(selector);
        if (!el) return;
        
        if (i < text.length) {
            el.innerHTML = text.substring(0, i + 1);
            setTimeout(() => typeWriter(selector, text, i + 1, fnCallback), 25);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 400);
        }
    };

    const startHeroAnimation = () => {
        typeWriter("#typing-tagline", "Monitoreo IoT para Medicamentos", 0, () => {
            typeWriter("#typing-title", "Control en tiempo real de temperatura, humedad y luz", 0, () => {
                typeWriter("#typing-desc", "Plataforma web para clínicas, farmacias y hospitales. Alertas automáticas y trazabilidad total.", 0, () => {
                    const btn = document.getElementById('hero-cta');
                    if (btn) {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    };

    setTimeout(startHeroAnimation, 500);

    // Global Reveal Animation Observer
    const genericObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // If it's a list or group, staggered reveal
                if (entry.target.classList.contains('reveal-item') || entry.target.classList.contains('reveal-zoom')) {
                    const parent = entry.target.parentElement;
                    const items = parent.querySelectorAll('.reveal-item, .reveal-zoom');
                    const index = Array.from(items).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 180);
                } else {
                    entry.target.classList.add('active');
                }
                genericObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-card, .reveal-left, .reveal-right, .reveal-item, .reveal-zoom, .reveal-watermark').forEach(el => {
        genericObserver.observe(el);
    });
});
