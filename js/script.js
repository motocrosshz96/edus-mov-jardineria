document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. HEADER SCROLL EFFECT Y MENU MOVIL
       ========================================================================= */
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Al hacer scroll, agregar clase 'scrolled' al header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Validar estado inicial del scroll al cargar
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // Toggle menu móvil
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });


    /* =========================================================================
       2. SMOOTH SCROLL (Desplazamiento Suave)
       ========================================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignorar href="#" vacío
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Ajustar offset considerando el header fijo
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* =========================================================================
       3. INTERSECTION OBSERVER (Animaciones al hacer scroll)
       ========================================================================= */
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', // Activar un poco antes de llegar al fin de pantalla
        threshold: 0.15 // 15% del elemento visible
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos con la clase fade-up-anim
    const elementsToAnimate = document.querySelectorAll('.fade-up-anim');
    elementsToAnimate.forEach(el => {
        fadeInObserver.observe(el);
    });


    /* =========================================================================
       4. DARK MODE (Sistema de Tema)
       ========================================================================= */
    const darkToggle = document.getElementById('dark-mode-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    
    // Verificar si el usuario tiene preferencia por modo oscuro (OS)
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Función para manejar el cambio visual del botón
    const updateToggleButton = (isDark) => {
        if (toggleIcon) {
            toggleIcon.textContent = isDark ? '☀️' : '🌙';
        }
    };

    // Al cargar, verificar si hay algo guardado
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme == 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateToggleButton(true);
    } else if (currentTheme == 'light') {
        document.body.removeAttribute('data-theme');
        updateToggleButton(false);
    } else {
        // Fallback al sistema operativo si no hay localStorage
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
            updateToggleButton(true);
        }
    }

    // Evento click
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateToggleButton(false);
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleButton(true);
            }
        });
    }

});
