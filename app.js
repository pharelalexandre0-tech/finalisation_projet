document.addEventListener('DOMContentLoaded', function () {
    // Éléments du DOM
    const statusText = document.getElementById('status-text');
    const statusBadge = document.getElementById('status-badge');
    const versionElement = document.getElementById('version');
    const timestampElement = document.getElementById('timestamp');
    const triggerDeployBtn = document.getElementById('trigger-deploy');
    const viewLogsBtn = document.getElementById('view-logs');

    // États possibles du pipeline
    const statuses = [
        { text: "Exécution en cours", badgeClass: "status-warning", icon: "fa-sync-alt" },
        { text: "Succès", badgeClass: "status-success", icon: "fa-check-circle" },
        { text: "Échec", badgeClass: "status-danger", icon: "fa-exclamation-circle" }
    ];

    // Versions simulées
    const versions = ["v2.1.4", "v2.1.5", "v2.2.0", "v2.2.1"];

    // Fonction pour simuler un changement de statut
    function simulateStatusChange() {
        // Changer aléatoirement le statut toutes les 10 secondes
        setInterval(() => {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            statusText.textContent = randomStatus.text;
            statusBadge.className = "status-badge " + randomStatus.badgeClass;
            statusBadge.innerHTML = `<i class="fas ${randomStatus.icon}"></i> ${randomStatus.text}`;

            // Si le statut est "Succès", mettre à jour la version et l'heure
            if (randomStatus.text === "Succès") {
                const newVersion = versions[Math.floor(Math.random() * versions.length)];
                versionElement.textContent = newVersion;

                const now = new Date();
                timestampElement.textContent = now.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });

                // Ajouter un nouvel élément à l'historique
                const historyList = document.getElementById('history-list');
                const newHistoryItem = document.createElement('div');
                newHistoryItem.className = 'history-item';
                newHistoryItem.innerHTML = `
                    <span class="history-version">${newVersion}</span>
                    <span class="history-time">${now.toLocaleDateString('fr-FR')}, ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    <span class="history-status status-success">Succès</span>
                `;

                // Insérer au début de la liste
                historyList.insertBefore(newHistoryItem, historyList.firstChild);

                // Limiter à 4 éléments dans l'historique
                if (historyList.children.length > 4) {
                    historyList.removeChild(historyList.lastChild);
                }
            }
        }, 10000); // 10 secondes
    }

    // Fonction pour mettre à jour les métriques
    function updateMetrics() {
        const metrics = {
            'build-time': ['2.4m', '2.3m', '2.5m', '2.2m'],
            'success-rate': ['98%', '97%', '99%', '98%'],
            'deploy-count': ['142', '143', '144', '145'],
            'test-coverage': ['92%', '91%', '93%', '92%']
        };

        setInterval(() => {
            for (const [metricId, values] of Object.entries(metrics)) {
                const element = document.getElementById(metricId);
                if (element) {
                    const randomValue = values[Math.floor(Math.random() * values.length)];
                    element.textContent = randomValue;
                }
            }
        }, 8000); // 8 secondes
    }

    // Simulation du déclenchement d'un déploiement
    triggerDeployBtn.addEventListener('click', function () {
        // Mettre à jour le statut
        statusText.textContent = "Exécution en cours";
        statusBadge.className = "status-badge status-warning";
        statusBadge.innerHTML = '<i class="fas fa-sync-alt"></i> En cours';

        // Afficher une notification
        showNotification("Déploiement déclenché avec succès !");

        // Désactiver le bouton pendant le déploiement
        triggerDeployBtn.disabled = true;
        triggerDeployBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Déploiement en cours...';

        // Simuler un délai avant la fin du déploiement
        setTimeout(() => {
            const randomStatus = Math.random() > 0.2 ? statuses[1] : statuses[2]; // 80% de succès
            statusText.textContent = randomStatus.text;
            statusBadge.className = "status-badge " + randomStatus.badgeClass;
            statusBadge.innerHTML = `<i class="fas ${randomStatus.icon}"></i> ${randomStatus.text}`;

            // Réactiver le bouton
            triggerDeployBtn.disabled = false;
            triggerDeployBtn.innerHTML = '<i class="fas fa-play-circle"></i> Déclencher un déploiement';

            if (randomStatus.text === "Succès") {
                const newVersion = versions[Math.floor(Math.random() * versions.length)];
                versionElement.textContent = newVersion;

                const now = new Date();
                timestampElement.textContent = now.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });

                showNotification(`Déploiement réussi ! Version ${newVersion} déployée.`);
            } else {
                showNotification("Échec du déploiement. Consultez les logs pour plus d'informations.", "error");
            }
        }, 5000); // 5 secondes de simulation
    });

    // Simulation de la visualisation des logs
    viewLogsBtn.addEventListener('click', function () {
        showNotification("Ouverture des logs du dernier déploiement...");

        // Simulation d'une fenêtre de logs
        setTimeout(() => {
            const logContent = `
[INFO] Démarrage du pipeline CI/CD
[INFO] Clonage du repository... OK
[INFO] Installation des dépendances... OK
[INFO] Exécution des tests unitaires... 152/152 tests passés
[INFO] Build de l'image Docker... OK
[INFO] Publication sur le registry... OK
[INFO] Déploiement sur les serveurs de production... OK
[SUCCESS] Déploiement terminé avec succès en 2m 24s
            `;

            // Créer une modal pour afficher les logs
            showLogModal(logContent);
        }, 500);
    });

    // Fonction pour afficher une notification
    function showNotification(message, type = "success") {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification';

        if (type === "success") {
            notification.style.backgroundColor = "var(--success)";
        } else {
            notification.style.backgroundColor = "var(--danger)";
        }

        notification.innerHTML = `
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Retirer la notification après 5 secondes
        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease-out";
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Fonction pour afficher une modal avec les logs
    function showLogModal(content) {
        // Créer l'overlay de la modal
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        `;

        // Créer la modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #1e293b;
            border-radius: 12px;
            width: 90%;
            max-width: 700px;
            max-height: 80vh;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        `;

        modal.innerHTML = `
            <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: #e2e8f0;"><i class="fas fa-file-alt"></i> Logs du déploiement</h3>
                <button id="close-modal" style="background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1.5rem; overflow-y: auto; max-height: 60vh; font-family: 'Roboto Mono', monospace; font-size: 0.9rem; background: #0f172a; color: #cbd5e1; white-space: pre-wrap;">
                ${content}
            </div>
            <div style="padding: 1rem 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: right;">
                <button id="copy-logs" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer; font-family: 'Poppins', sans-serif;">
                    <i class="fas fa-copy"></i> Copier les logs
                </button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        // Ajouter les animations CSS si elles n'existent pas déjà
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // Gestionnaire pour fermer la modal
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        document.getElementById('close-modal').addEventListener('click', closeModal);

        // Gestionnaire pour copier les logs
        document.getElementById('copy-logs').addEventListener('click', function () {
            navigator.clipboard.writeText(content)
                .then(() => {
                    showNotification("Logs copiés dans le presse-papier !");
                    closeModal();
                })
                .catch(err => {
                    console.error('Erreur lors de la copie: ', err);
                    showNotification("Erreur lors de la copie des logs", "error");
                });
        });

        function closeModal() {
            modalOverlay.style.animation = "fadeOut 0.3s ease-out";
            setTimeout(() => {
                if (modalOverlay.parentNode) {
                    document.body.removeChild(modalOverlay);
                }
            }, 300);
        }
    }

    // Initialiser la simulation
    simulateStatusChange();
    updateMetrics();

    // Mettre à jour l'heure en temps réel
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Mettre à jour l'heure dans le sous-titre
        const subtitle = document.querySelector('.subtitle');
        subtitle.textContent = `Pipeline CI/CD avec GitHub Actions • ${dateString} • ${timeString}`;
    }

    // Mettre à jour l'heure toutes les secondes
    setInterval(updateTime, 1000);
    updateTime(); // Initialiser

    // Ajouter un effet de particules subtil en arrière-plan
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        document.body.appendChild(particlesContainer);

        // Créer 15 particules
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(96, 165, 250, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s linear infinite;
            `;

            particlesContainer.appendChild(particle);
        }

        // Ajouter l'animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Démarrer les particules
    createParticles();
});