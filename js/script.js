// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Manejo del formulario de contacto
const formulario = document.getElementById('formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        this.reset();
    });
}


// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.servicio-card, .galeria-item');
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Agregar clase CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .servicio-card, .galeria-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }
    
    .servicio-card.visible, .galeria-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ======================
// MODO OSCURO
// ======================

document.addEventListener('DOMContentLoaded', function () {

    const darkToggle = document.getElementById('dark-mode-toggle');
    const icon = document.querySelector('.toggle-icon');

    if (!darkToggle) {
        console.error("Botón modo oscuro no encontrado");
        return;
    }

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
    }

    // Evento del botón
    darkToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.textContent = '☀️';
        }
    });

});
