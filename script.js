/**
 * CONFIGURACIÓN GLOBAL
 * Centralizamos los datos importantes para que sea fácil cambiarlos en el futuro.
 */
const WHATSAPP_NUM = "573147401760"; 

// Inicializamos la librería de iconos Lucide para que los gráficos carguen correctamente.
lucide.createIcons();

/**
 * 1. CONTROL DE ACCESO (MAYORÍA DE EDAD)
 * Usamos el 'localStorage' para recordar si el usuario ya confirmó su edad.
 */
window.addEventListener('load', () => {
    if (!localStorage.getItem('maxVerified')) {
        const modal = document.getElementById('age-modal');
        if (modal) modal.classList.remove('hidden');
    }
});

function verifyAge() {
    localStorage.setItem('maxVerified', 'true');
    const modal = document.getElementById('age-modal');
    if (modal) modal.classList.add('hidden');
}

/**
 * 2. GESTIÓN DE COMPRAS Y MÉTRICAS (WHATSAPP + ANALYTICS)
 * Registra el interés del cliente en Google y lo redirige al chat de ventas.
 */
function handleBuyClick(item) {
    // A) REGISTRO EN GOOGLE ANALYTICS
    if (typeof gtag === 'function') {
        gtag('event', 'click_compra_whatsapp', {
            'nombre_producto': item,
            'pagina': window.location.pathname
        });
    }

    // B) NOTIFICACIÓN VISUAL (Toast)
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('flex'); // Asegura que se vea si usas display flex
        toast.classList.add('toast-animate');
    }

    // C) ENLACE A WHATSAPP
    const message = encodeURIComponent(`Hola MAX PLACER, me interesa el producto: ${item}`);
    
    setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUM}?text=${message}`, '_blank');
        if (toast) toast.classList.add('hidden');
    }, 1000);
}

/**
 * 3. BASE DE DATOS DE PRODUCTOS
 * Mapeamos los IDs de los botones con la información técnica.
 */
const infoProductos = {
    // PRODUCTOS DEL INDEX (Aseguramos que coincidan los IDs)
    'X-Bull Energizante': {
        tagline: 'Energía natural para tu máximo rendimiento.',
        desc: 'Bebida a base de Borojó, Chontaduro y Noni. Potencia tu energía física y mental. \n• Combate la fatiga. \n• Registro Invima.',
        img: 'XBULL.png'
    },
    'Minotauro Prolong Gold': {
        tagline: 'Control total. Placer prolongado.',
        desc: 'Gel retardante masculino diseñado para mejorar la resistencia y disfrutar más tiempo.',
        img: 'minotauro.png'
    },
    'PowerS\'X Potenciador': {
        tagline: 'Recuperación rápida y firmeza natural.',
        desc: 'Pastillas potenciadoras naturales de efecto rápido (40 min). Erecciones más firmes.',
        img: 'Pastillero 3.png'
    },
    // PRODUCTOS DEL CATÁLOGO
    'Magnetic': {
        tagline: 'Sutilmente irresistible. Poderosamente tú.',
        desc: 'Bruma facial con feromonas, ácido hialurónico y Vitamina C. Hidrata y resalta tu magnetismo.',
        img: 'magnetic.png'
    },
    'Frequency Intense': {
        tagline: 'Más vibración. Más intensidad. Más placer.',
        desc: 'Gel estimulante que activa canales iónicos y oxigena tejidos. Genera oleadas de placer.',
        img: 'frequency.png'
    },
    'Cool Sensation': {
        tagline: 'Frescura intensa, placer sin límites.',
        desc: 'Lubricante efecto frío que potencia la sensibilidad. Ideal para sexo oral.',
        img: 'cool.png'
    },
    'Cum Sensitive': {
        tagline: 'Realismo y emoción para piel sensible.',
        desc: 'Simula la eyaculación femenina con una fórmula suave. Compatible con juguetes.',
        img: 'cum.png'
    },
    'Cum Neutro': {
        tagline: 'Experiencia auténtica y realista.',
        desc: 'Textura y apariencia real de eyaculación femenina. Sin olor ni sabor.',
        img: 'cum1.png'
    },
    'Lubricante Cremoso': {
        tagline: 'Sensación Realista y Dulce.',
        desc: 'Reproduce la textura de la eyaculación masculina. Sabor dulce placentero.',
        img: 'creamy.png'
    },
    'Lubricante 5 Sensaciones': {
        tagline: 'Un viaje para todos tus placeres.',
        desc: 'Frío, calor, sabor y calma con Aloe Vera. Lubricación sedosa duradera.',
        img: 'sens5.png'
    },
    'Lubricante Natural Elixir': {
        tagline: 'Cuidado íntimo diario y puro.',
        desc: 'Recomendado por ginecólogos. Sin fragancias ni colorantes. pH balanceado.',
        img: 'natural.png'
    },
    'X-Bull Sachet': {
        tagline: 'Estallido natural de energía.',
        desc: 'Potenciador natural para mayor resistencia física y una energía imparable.',
        img: 'sachet.png' // Revisa si esta imagen es correcta o debe ser otra
    },
    'X-Bull Vitaminas': {
        tagline: 'Vigor y confianza masculina.',
        desc: 'Suplemento para elevar el estado de ánimo y la vitalidad. Vigor masculino.',
        img: 'vitaminas.png'
    },
    'Friction Gel': {
        tagline: 'Reclama tu placer y firmeza.',
        desc: 'Efecto estrechante que contrae paredes vaginales. Aumenta la fricción.',
        img: 'friction.png'
    },
    'Lubricantes de Sabores Elixir': {
        tagline: 'Pasión, calor y sabor.',
        desc: 'Sabores ardientes: Fresa bombón, coco, chicle y más. Efecto térmico.',
        img: 'sabor.png'
    }
};

/**
 * 4. LÓGICA DEL MODAL DE DETALLES
 */
function openModal(id) {
    const data = infoProductos[id];
    if (!data) return;

    if (typeof gtag === 'function') {
        gtag('event', 'ver_detalle_producto', { 'nombre_producto': id });
    }

    document.getElementById('modal-title').innerText = id;
    document.getElementById('modal-tagline').innerText = data.tagline;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-img').src = data.img;
    
    document.getElementById('modal-buy-btn').onclick = function() {
        handleBuyClick(id);
    };

    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 5. FUNCIONES DE CIERRE
 */
function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function closeModalOutside(event) {
    if (event.target.id === 'product-modal') {
        closeModal();
    }
}

/**
 * 6. MENÚ MÓVIL
 */
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}