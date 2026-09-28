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
        desc: 'Bebida energizante 100% natural a base de Borojó, Chontaduro y Noni, los ingredientes que la tradición amazónica usa para elevar el vigor y la resistencia.\n• Aumenta tu energía física y mental en minutos.\n• Combate la fatiga y la falta de deseo.\n• Ideal para noches que quieres que duren más.\n• Registro Invima, 100% natural.',
        img: 'XBULL.png'
    },
    'Minotauro Prolong Gold': {
        tagline: 'Control total. Placer prolongado.',
        desc: 'Gel retardante masculino que actúa directo sobre la piel para que tomes el control del momento, sin perder sensibilidad ni intensidad.\n• Prolonga la relación de forma notable.\n• Absorción rápida, sin dejar residuos.\n• Compatible con preservativo.\n• Nuestro producto TOP 1, el favorito de los clientes.',
        img: 'minotauro.png'
    },
    'PowerS\'X Potenciador': {
        tagline: 'Recuperación rápida y firmeza natural.',
        desc: 'Cápsulas potenciadoras 100% naturales que actúan en solo 40 minutos, para que la espontaneidad nunca sea un problema.\n• Erecciones más firmes y duraderas.\n• Efecto rápido: listo en 40 minutos.\n• Ingredientes naturales, sin receta médica.\n• Perfecto para tener siempre a la mano.',
        img: 'Pastillero 3.png'
    },
    // PRODUCTOS DEL CATÁLOGO
    'Magnetic': {
        tagline: 'Sutilmente irresistible. Poderosamente tú.',
        desc: 'Bruma facial con feromonas, ácido hialurónico y Vitamina C que hidrata tu piel mientras potencia tu magnetismo natural, como un imán invisible que atrae miradas.\n• Hidrata e ilumina el rostro al instante.\n• Feromonas que resaltan tu presencia.\n• Aroma sutil a agua de rosas.\n• Perfecto antes de una cita o salida especial.',
        img: 'magnetic.jpg'
    },
    'Frequency Intense': {
        tagline: 'Más vibración. Más intensidad. Más placer.',
        desc: 'Gel estimulante que activa canales iónicos en la piel, generando oleadas de vibración real, sin baterías ni juguetes.\n• Sensación de vibrador líquido, 100% natural.\n• Oxigena los tejidos e intensifica cada roce.\n• Ideal para combinar con caricias o juguetes.\n• El efecto sube en oleadas: perfecto para alargar el juego previo.',
        img: 'frequency.jpg'
    },
    'Cool Sensation': {
        tagline: 'Frescura intensa, placer sin límites.',
        desc: 'Lubricante a base de agua con efecto frío que despierta cada sensación desde el primer contacto.\n• Frescura intensa que potencia la sensibilidad.\n• Ideal para sexo oral y juegos previos.\n• Fórmula suave, no irritante.\n• Combínalo con Frequency Intense para una experiencia multisensorial.',
        img: 'cool.jpg'
    },
    'Cum Sensitive': {
        tagline: 'Realismo y emoción para piel sensible.',
        desc: 'Simula la eyaculación femenina con una fórmula suave pensada para pieles delicadas, sin perder realismo.\n• Textura y apariencia auténtica.\n• Compatible con juguetes de silicona.\n• Ideal si buscas intensidad sin irritación.\n• Perfecto para elevar la fantasía en pareja.',
        img: 'cum.jpg'
    },
    'Cum Neutro': {
        tagline: 'Experiencia auténtica y realista.',
        desc: 'La versión más discreta de nuestra línea realista: la misma textura auténtica, sin olor ni sabor que delate el juego.\n• Apariencia 100% realista.\n• Sin olor ni sabor: total discreción.\n• Fácil de limpiar, no mancha.\n• Ideal para llevar la fantasía al siguiente nivel.',
        img: 'cum1.jpg'
    },
    'Lubricante Cremoso': {
        tagline: 'Sensación Realista y Dulce.',
        desc: 'Reproduce la textura de la eyaculación masculina con un toque dulce que hace que cada momento se sienta aún más real.\n• Textura cremosa y realista.\n• Sabor dulce placentero.\n• A base de agua, fácil de limpiar.\n• Perfecto para elevar la fantasía en pareja.',
        img: 'creamy.jpg'
    },
    'Lubricante 5 Sensaciones': {
        tagline: 'Un viaje para todos tus placeres.',
        desc: 'Una sola fórmula con Aloe Vera que recorre frío, calor, sabor y calma, para que nunca sepas qué sensación viene después.\n• 5 efectos en un solo lubricante.\n• Hidratación sedosa y duradera.\n• Con Aloe Vera calmante.\n• Ideal para quienes buscan variedad sin cambiar de producto.',
        img: 'sens5.jpg'
    },
    'Lubricante Natural Elixir': {
        tagline: 'Cuidado íntimo diario y puro.',
        desc: 'Fórmula pura a base de agua y pH balanceado, recomendada por ginecólogos, para tu bienestar íntimo de todos los días.\n• Sin fragancias ni colorantes.\n• pH balanceado, ideal para piel sensible.\n• Uso diario o durante la intimidad.\n• Compatible con preservativo y juguetes.',
        img: 'natural.jpg'
    },
    'X-Bull Sachet': {
        tagline: 'Estallido natural de energía.',
        desc: 'La misma energía natural de X-Bull, ahora en un sobre individual que llevas a donde vayas, para nunca quedarte sin resistencia.\n• Potenciador natural de acción rápida.\n• Presentación individual, fácil de llevar.\n• Ideal para tener siempre en el bolso o la maleta.\n• Energía imparable cuando la necesitas.',
        img: 'sachet.jpg'
    },
    'X-Bull Vitaminas': {
        tagline: 'Vigor y confianza masculina.',
        desc: 'Suplemento diario diseñado para mantener tu vitalidad y confianza en niveles altos, día tras día.\n• Eleva el estado de ánimo y la energía.\n• Apoya el vigor masculino a diario.\n• Ingredientes naturales.\n• Ideal para complementar tu rutina.',
        img: 'vitaminas.jpg'
    },
    'Friction Gel': {
        tagline: 'Reclama tu placer y firmeza.',
        desc: 'Gel con efecto estrechante que tonifica y contrae las paredes vaginales, intensificando la fricción y el placer en cada encuentro.\n• Efecto estrechante notable desde la primera aplicación.\n• Aumenta la fricción y la sensación en pareja.\n• Fórmula suave para uso frecuente.\n• Ideal para recuperar firmeza y sensibilidad.',
        img: 'friction.jpg'
    },
    'Lubricantes de Sabores Elixir': {
        tagline: 'Pasión, calor y sabor.',
        desc: 'Sabores ardientes que convierten el sexo oral y el juego previo en una experiencia distinta cada vez que los usas.\n• Sabores: fresa bombón, coco, chicle y más.\n• Efecto térmico que intensifica cada sensación.\n• Ideal para sexo oral y juegos en pareja.\n• Cambia el sabor, cambia la experiencia.',
        img: 'saboror.jpg'
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