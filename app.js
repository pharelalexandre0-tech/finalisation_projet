// Données réalistes des planètes
const solarSystemData = {
    sun: {
        name: "Soleil",
        type: "Étoile naine jaune",
        diameter: "1 391 000 km",
        distance: "0 km",
        temperature: "5 500°C (surface), 15 000 000°C (noyau)",
        orbitPeriod: "N/A",
        description: "Le Soleil est l'étoile au centre de notre système solaire. C'est une boule de plasma presque parfaite avec un champ magnétique complexe. Il contient 99,86% de la masse totale du système solaire.",
        composition: "Hydrogène (74%), Hélium (24%), Oxygène (1%), Carbone (0.4%)",
        gravity: "274 m/s²",
        age: "4.6 milliards d'années",
        rotation: "27 jours (équateur)"
    },
    mercury: {
        name: "Mercure",
        type: "Planète tellurique",
        diameter: "4 879 km",
        distance: "57.9 millions km",
        temperature: "-173°C à 427°C",
        orbitPeriod: "88 jours terrestres",
        description: "Mercure est la planète la plus proche du Soleil et la plus petite du système solaire. Sa surface est criblée de cratères similaires à ceux de la Lune.",
        composition: "Fer (70%), Roche silicatée (30%)",
        gravity: "3.7 m/s²",
        moons: "0",
        dayLength: "59 jours terrestres"
    },
    venus: {
        name: "Vénus",
        type: "Planète tellurique",
        diameter: "12 104 km",
        distance: "108.2 millions km",
        temperature: "462°C (constante)",
        orbitPeriod: "225 jours terrestres",
        description: "Vénus est souvent appelée la 'planète sœur' de la Terre à cause de sa taille similaire, mais son atmosphère est toxique avec des nuages d'acide sulfurique.",
        composition: "Dioxyde de carbone (96.5%), Azote (3.5%)",
        gravity: "8.87 m/s²",
        moons: "0",
        dayLength: "243 jours terrestres (rotation rétrograde)"
    },
    earth: {
        name: "Terre",
        type: "Planète tellurique",
        diameter: "12 756 km",
        distance: "149.6 millions km",
        temperature: "-89°C à 58°C",
        orbitPeriod: "365.25 jours",
        description: "La Terre est la seule planète connue à abriter la vie. Sa surface est composée à 71% d'eau et elle possède une atmosphère riche en oxygène.",
        composition: "Azote (78%), Oxygène (21%), Argon (0.9%)",
        gravity: "9.81 m/s²",
        moons: "1 (La Lune)",
        dayLength: "24 heures"
    },
    mars: {
        name: "Mars",
        type: "Planète tellurique",
        diameter: "6 792 km",
        distance: "227.9 millions km",
        temperature: "-87°C à -5°C",
        orbitPeriod: "687 jours terrestres",
        description: "Mars, la 'planète rouge', doit sa couleur à l'oxyde de fer présent à sa surface. Elle possède la plus grande montagne du système solaire (Olympus Mons).",
        composition: "Dioxyde de carbone (95%), Azote (2.7%)",
        gravity: "3.71 m/s²",
        moons: "2 (Phobos et Deimos)",
        dayLength: "24h 37m"
    },
    jupiter: {
        name: "Jupiter",
        type: "Géante gazeuse",
        diameter: "142 984 km",
        distance: "778.5 millions km",
        temperature: "-108°C",
        orbitPeriod: "11.86 années terrestres",
        description: "Jupiter est la plus grande planète du système solaire. Sa Grande Tache Rouge est une tempête anticyclonique qui dure depuis au moins 400 ans.",
        composition: "Hydrogène (90%), Hélium (10%)",
        gravity: "24.79 m/s²",
        moons: "79 confirmées",
        dayLength: "9h 56m"
    },
    saturn: {
        name: "Saturne",
        type: "Géante gazeuse",
        diameter: "120 536 km",
        distance: "1.43 milliards km",
        temperature: "-139°C",
        orbitPeriod: "29.46 années terrestres",
        description: "Saturne est célèbre pour ses anneaux spectaculaires composés principalement de glace et de poussière. C'est la planète la moins dense du système solaire.",
        composition: "Hydrogène (96%), Hélium (3%)",
        gravity: "10.44 m/s²",
        moons: "82 confirmées",
        ringSystem: "7 anneaux principaux"
    },
    uranus: {
        name: "Uranus",
        type: "Géante glacée",
        diameter: "51 118 km",
        distance: "2.87 milliards km",
        temperature: "-197°C",
        orbitPeriod: "84.01 années terrestres",
        description: "Uranus tourne sur son côté avec un axe incliné à 98 degrés. Sa couleur bleue-verte est due au méthane présent dans son atmosphère.",
        composition: "Hydrogène (83%), Hélium (15%), Méthane (2%)",
        gravity: "8.69 m/s²",
        moons: "27 confirmées",
        dayLength: "17h 14m"
    },
    neptune: {
        name: "Neptune",
        type: "Géante glacée",
        diameter: "49 528 km",
        distance: "4.5 milliards km",
        temperature: "-201°C",
        orbitPeriod: "164.8 années terrestres",
        description: "Neptune est la planète la plus éloignée du Soleil. Elle possède les vents les plus rapides du système solaire, atteignant 2 100 km/h.",
        composition: "Hydrogène (80%), Hélium (19%), Méthane (1%)",
        gravity: "11.15 m/s²",
        moons: "14 confirmées",
        dayLength: "16h 6m"
    }
};

// Variables globales
let simulationActive = true;
let simulationSpeed = 1;
let timeElapsed = 0;
let selectedBody = null;
let showOrbits = true;
let showLabels = true;
let zoomLevel = 1;
let isRotating3D = false;
let closeupActive = false;

// Positions initiales des planètes (angles en degrés)
const planetPositions = {
    mercury: 0,
    venus: 45,
    earth: 90,
    mars: 135,
    jupiter: 180,
    saturn: 225,
    uranus: 270,
    neptune: 315
};

// Rayons orbitaux proportionnels
const orbitalRadii = {
    mercury: 180,
    venus: 240,
    earth: 300,
    mars: 360,
    jupiter: 480,
    saturn: 600,
    uranus: 720,
    neptune: 840
};

// Vitesses de rotation proportionnelles
const rotationSpeeds = {
    mercury: 4.14,
    venus: 1.62,
    earth: 1,
    mars: 0.53,
    jupiter: 0.084,
    saturn: 0.034,
    uranus: 0.012,
    neptune: 0.006
};

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    // Initialiser les étoiles
    createStars();

    // Positionner les planètes
    positionPlanets();

    // Mettre à jour l'affichage
    updatePlanetInfo('earth');

    // Démarrer l'animation
    startAnimation();

    // Configurer les événements
    setupEventListeners();

    // Démarrer le timer
    startTimer();
});

// Créer des étoiles en arrière-plan
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 500;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Taille aléatoire
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Position aléatoire
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Opacité aléatoire
        star.style.opacity = Math.random() * 0.8 + 0.2;

        // Durée d'animation aléatoire
        const duration = Math.random() * 5 + 2;
        star.style.setProperty('--twinkle-duration', `${duration}s`);

        starsContainer.appendChild(star);
    }
}

// Positionner les planètes sur leurs orbites
function positionPlanets() {
    Object.keys(planetPositions).forEach(planetId => {
        const planet = document.getElementById(planetId);
        if (!planet) return;

        const angle = planetPositions[planetId];
        const radius = orbitalRadii[planetId];

        // Convertir l'angle en radians
        const rad = (angle * Math.PI) / 180;

        // Calculer les coordonnées
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        // Appliquer la position
        planet.style.transform = `translate(${x}px, ${y}px)`;

        // Définir la vitesse de rotation
        const texture = planet.querySelector('.planet-texture');
        if (texture) {
            const speed = 50 * rotationSpeeds[planetId]; // 50 secondes pour une rotation
            texture.style.setProperty('--rotation-speed', `${speed}s`);
        }
    });
}

// Animer le système solaire
function animateSolarSystem() {
    if (!simulationActive) return;

    // Mettre à jour les positions des planètes
    Object.keys(planetPositions).forEach(planetId => {
        planetPositions[planetId] += rotationSpeeds[planetId] * simulationSpeed;
        planetPositions[planetId] %= 360;
    });

    // Re-positionner les planètes
    positionPlanets();

    // Animer la Lune
    animateMoon();
}

// Animer la Lune autour de la Terre
function animateMoon() {
    const earth = document.getElementById('earth');
    const moon = earth?.querySelector('.moon');
    if (!moon) return;

    // Récupérer l'angle actuel de la Lune
    let moonAngle = parseFloat(moon.style.getPropertyValue('--moon-angle')) || 0;
    moonAngle += 10 * simulationSpeed;

    // Mettre à jour la rotation
    moon.style.setProperty('--moon-angle', `${moonAngle}deg`);

    // Positionner la Lune
    const radius = 30; // Distance Lune-Terre
    const rad = (moonAngle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    moon.style.transform = `translate(${x}px, ${y}px)`;
}

// Mettre à jour les informations de la planète
function updatePlanetInfo(planetId) {
    const data = solarSystemData[planetId];
    if (!data) return;

    // Mettre à jour les informations principales
    document.getElementById('planet-name').textContent = data.name;
    document.getElementById('planet-type').textContent = data.type;
    document.getElementById('stat-diameter').textContent = data.diameter;
    document.getElementById('stat-distance').textContent = data.distance;
    document.getElementById('stat-temperature').textContent = data.temperature;
    document.getElementById('stat-orbit').textContent = data.orbitPeriod;
    document.getElementById('planet-description').textContent = data.description;

    // Mettre à jour la vue 3D
    update3DView(planetId);

    // Mettre à jour la sélection visuelle
    updateSelection(planetId);
}

// Mettre à jour la vue 3D
function update3DView(planetId) {
    const planetModel = document.querySelector('.planet-model');
    const texture = document.querySelector(`#${planetId} .planet-texture`);

    if (planetModel && texture) {
        // Copier le style de la texture
        planetModel.style.backgroundImage = texture.style.backgroundImage;
        planetModel.style.backgroundSize = 'cover';
        planetModel.style.backgroundPosition = 'center';
    }
}

// Mettre à jour la sélection visuelle
function updateSelection(planetId) {
    // Retirer la sélection précédente
    document.querySelectorAll('.celestial-body.selected').forEach(body => {
        body.classList.remove('selected');
    });

    // Ajouter la nouvelle sélection
    const selectedBody = document.getElementById(planetId);
    if (selectedBody) {
        selectedBody.classList.add('selected');

        // Zoom sur la planète sélectionnée
        zoomToPlanet(planetId);
    }
}

// Zoom sur une planète
function zoomToPlanet(planetId) {
    const spaceContainer = document.getElementById('space-container');
    const planet = document.getElementById(planetId);

    if (!planet || !spaceContainer) return;

    const containerRect = spaceContainer.getBoundingClientRect();
    const planetRect = planet.getBoundingClientRect();

    // Calculer le centre de la planète
    const planetCenterX = planetRect.left + planetRect.width / 2;
    const planetCenterY = planetRect.top + planetRect.height / 2;

    // Calculer le centre du conteneur
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

    // Calculer le décalage nécessaire
    const offsetX = containerCenterX - planetCenterX;
    const offsetY = containerCenterY - planetCenterY;

    // Appliquer le décalage avec animation
    spaceContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
}

// Ouvrir la vue rapprochée 3D
function openCloseupView(planetId) {
    if (closeupActive) return;

    const data = solarSystemData[planetId];
    if (!data) return;

    closeupActive = true;

    // Mettre à jour le titre
    document.getElementById('closeup-title').textContent = data.name;

    // Créer le modèle 3D
    const closeup3D = document.getElementById('closeup-3d');
    closeup3D.innerHTML = `
        <div class="planet-closeup-model" 
             style="background-image: ${document.querySelector(`#${planetId} .planet-texture`).style.backgroundImage}">
        </div>
    `;

    // Mettre à jour les informations détaillées
    const infoGrid = document.getElementById('closeup-info');
    infoGrid.innerHTML = `
        <div class="info-item">
            <h4>Type</h4>
            <p>${data.type}</p>
        </div>
        <div class="info-item">
            <h4>Description</h4>
            <p>${data.description}</p>
        </div>
        <div class="info-item">
            <h4>Composition</h4>
            <p>${data.composition || 'Données non disponibles'}</p>
        </div>
        <div class="info-item">
            <h4>Gravité</h4>
            <p>${data.gravity || 'Données non disponibles'}</p>
        </div>
        <div class="info-item">
            <h4>Durée du jour</h4>
            <p>${data.dayLength || 'Données non disponibles'}</p>
        </div>
        <div class="info-item">
            <h4>Satellites naturels</h4>
            <p>${data.moons || 'Données non disponibles'}</p>
        </div>
    `;

    // Afficher la vue rapprochée
    document.getElementById('closeup-view').classList.add('active');

    // Empêcher le défilement de la page
    document.body.style.overflow = 'hidden';

    showNotification(`Exploration de ${data.name} en cours...`);
}

// Fermer la vue rapprochée
function closeCloseupView() {
    closeupActive = false;
    document.getElementById('closeup-view').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Configurer les événements
function setupEventListeners() {
    // Contrôles de vitesse
    const speedControl = document.getElementById('time-speed');
    const speedDisplay = document.getElementById('speed-display');

    speedControl.addEventListener('input', function () {
        simulationSpeed = parseFloat(this.value);
        speedDisplay.textContent = `${simulationSpeed}x`;
    });

    // Bouton Play/Pause
    const playPauseBtn = document.getElementById('play-pause');
    playPauseBtn.addEventListener('click', function () {
        simulationActive = !simulationActive;
        this.classList.toggle('active');
        this.innerHTML = simulationActive ?
            '<i class="fas fa-pause"></i>' :
            '<i class="fas fa-play"></i>';
    });

    // Bouton Reset
    document.getElementById('reset').addEventListener('click', function () {
        // Réinitialiser les positions
        Object.keys(planetPositions).forEach(planet => {
            planetPositions[planet] = 0;
        });

        // Réinitialiser le zoom
        zoomLevel = 1;
        const spaceContainer = document.getElementById('space-container');
        spaceContainer.style.transform = 'scale(1)';

        // Réinitialiser le temps
        timeElapsed = 0;

        // Re-positionner les planètes
        positionPlanets();

        showNotification('Simulation réinitialisée');
    });

    // Bouton étiquettes
    document.getElementById('toggle-labels').addEventListener('click', function () {
        showLabels = !showLabels;
        this.classList.toggle('active');

        document.querySelectorAll('.planet-label').forEach(label => {
            label.style.opacity = showLabels ? '1' : '0';
        });
    });

    // Navigation
    document.getElementById('zoom-in').addEventListener('click', function () {
        zoomLevel = Math.min(zoomLevel + 0.2, 3);
        updateZoom();
    });

    document.getElementById('zoom-out').addEventListener('click', function () {
        zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
        updateZoom();
    });

    document.getElementById('rotate-view').addEventListener('click', function () {
        isRotating3D = !isRotating3D;
        this.classList.toggle('active');

        const model = document.querySelector('.planet-model');
        if (model) {
            model.style.animationPlayState = isRotating3D ? 'running' : 'paused';
        }
    });

    document.getElementById('toggle-orbits').addEventListener('click', function () {
        showOrbits = !showOrbits;
        this.classList.toggle('active');

        document.querySelectorAll('.orbital-path').forEach(orbit => {
            orbit.style.display = showOrbits ? 'block' : 'none';
        });
    });

    // Fermer la vue rapprochée
    document.getElementById('close-closeup').addEventListener('click', closeCloseupView);

    // Fermer avec Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && closeupActive) {
            closeCloseupView();
        }
    });

    // Clic sur les planètes
    document.querySelectorAll('.celestial-body').forEach(body => {
        body.addEventListener('click', function (e) {
            e.stopPropagation();
            const planetId = this.id;

            // Mettre à jour les informations
            updatePlanetInfo(planetId);

            // Ouvrir la vue rapprochée après un court délai
            setTimeout(() => {
                openCloseupView(planetId);
            }, 300);
        });
    });

    // Clic sur l'espace pour désélectionner
    document.getElementById('space-container').addEventListener('click', function (e) {
        if (e.target === this) {
            document.querySelectorAll('.celestial-body.selected').forEach(body => {
                body.classList.remove('selected');
            });

            // Réinitialiser la transformation
            this.style.transform = 'scale(1)';

            // Réinitialiser les informations
            document.getElementById('planet-name').textContent = 'Sélectionnez une planète';
            document.getElementById('planet-type').textContent = 'Cliquez sur un corps céleste pour commencer l\'exploration';
            document.getElementById('planet-description').textContent = 'Cliquez sur une planète pour découvrir ses caractéristiques détaillées.';

            showNotification('Planète désélectionnée');
        }
    });
}

// Mettre à jour le zoom
function updateZoom() {
    const spaceContainer = document.getElementById('space-container');
    if (spaceContainer) {
        spaceContainer.style.transform = `scale(${zoomLevel})`;
    }
}

// Démarrer l'animation
function startAnimation() {
    function animate() {
        animateSolarSystem();
        requestAnimationFrame(animate);
    }
    animate();
}

// Démarrer le timer
function startTimer() {
    setInterval(() => {
        if (simulationActive) {
            timeElapsed++;
            updateTimeDisplay();
        }
    }, 1000);
}

// Mettre à jour l'affichage du temps
function updateTimeDisplay() {
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor((timeElapsed % 3600) / 60);
    const seconds = timeElapsed % 60;

    document.getElementById('time-display').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Afficher une notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    notificationText.textContent = message;
    notification.classList.add('active');

    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Gestion du drag pour déplacer la vue
let isDragging = false;
let startX, startY;
let initialX = 0, initialY = 0;

document.getElementById('space-container').addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    this.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;

    const spaceContainer = document.getElementById('space-container');
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Appliquer la transformation
    const currentTransform = spaceContainer.style.transform || 'translate(0px, 0px) scale(1)';
    const match = currentTransform.match(/translate\(([^)]+)\)/);

    if (match) {
        const [currentX, currentY] = match[1].split(',').map(v => parseFloat(v.trim()));
        spaceContainer.style.transform = `translate(${currentX + deltaX}px, ${currentY + deltaY}px) scale(${zoomLevel})`;
    }

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    document.getElementById('space-container').style.cursor = 'grab';
});

// Empêcher le menu contextuel
document.getElementById('space-container').addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
});