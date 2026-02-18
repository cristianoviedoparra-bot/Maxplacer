// Configuración Global
const WHATSAPP_NUM = "573147401760"; // Asegúrate de poner tu número aquí

// Inicializar iconos de Lucide
lucide.createIcons();

// Control del Modal de Mayoría de Edad
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

// Control del Menú Móvil
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Gestión de clics de compra y WhatsApp
function handleBuyClick(item) {
    const toast = document.getElementById('toast');
    
    // Mostrar notificación visual
    if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('toast-animate');
    }

    const message = encodeURIComponent(`Hola MAX PLACER, me interesan tus productos: ${item}`);
    
    // Pequeño retardo para mejorar la experiencia de usuario (UX)
    setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUM}?text=${message}`, '_blank');
        if (toast) toast.classList.add('hidden');
    }, 1000);
}