// Application simple avec mise à jour d'état
document.addEventListener('DOMContentLoaded', function () {
    // Mettre à jour l'horodatage
    document.getElementById('timestamp').textContent = new Date().toLocaleString('fr-FR');

    // Simuler une vérification d'état
    simulateStatusCheck();
});

function simulateStatusCheck() {
    const statusElement = document.getElementById('status');

    // Simulation d'une vérification asynchrone
    setTimeout(() => {
        statusElement.textContent = '✅ Déployé avec succès';
        statusElement.style.color = '#48bb78';

        // Ajouter une notification visuelle
        showNotification('Application déployée avec succès !');
    }, 2000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 5000);
}