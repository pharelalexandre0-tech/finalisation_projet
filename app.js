document.addEventListener('DOMContentLoaded', function () {
    // Configuration des planètes avec données réelles
    const planetsData = {
        sun: {
            name: "Soleil",
            type: "Étoile",
            diameter: "1 391 000 km",
            mass: "1.989 × 10³⁰ kg",
            temperature: "5 500°C (surface)",
            description: "Notre étoile, source d'énergie du système solaire"
        },
        mercury: {
            name: "Mercure",
            type: "Planète tellurique",
            diameter: "4 879 km",
            distance: "57.9 millions km",
            period: "88 jours",
            temperature: "-173°C à 427°C",
            description: "La plus petite et la plus proche du Soleil"
        },
        venus: {
            name: "Vénus",
            type: "Planète tellurique",
            diameter: "12 104 km",
            distance: "108.2 millions km",
            period: "225 jours",
            temperature: "462°C",
            description: "L'atmosphère la plus chaude du système solaire"
        },
        earth: {
            name: "Terre",
            type: "Planète tellurique",
            diameter: "12 756 km",
            distance: "149.6 millions km",
            period: "365.25 jours",
            temperature: "15°C (moyenne)",
            description: "Notre planète, la seule connue à abriter la vie"
        },
        mars: {
            name: "Mars",
            type: "Planète tellurique",
            diameter: "6 792 km",
            distance: "227.9 millions km",
            period: "687 jours",
            temperature: "-63°C (moyenne)",
            description: "La planète rouge, cible d'exploration spatiale"
        },
        jupiter: {
            name: "Jupiter",
            type: "Géante gazeuse",
            diameter: "142 984 km",
            distance: "778.5 millions km",
            period: "12 ans",
            temperature: "-108°C",
            description: "La plus grande planète du système solaire"
        },
        saturn: {
            name: "Saturne",
            type: "Géante gazeuse",
            diameter: "120 536 km",
            distance: "1.43 milliards km",
            period: "29 ans",
            temperature: "-139°C",
            description: "Célèbre pour ses anneaux spectaculaires"
        },
        uranus: {
            name: "Uranus",
            type: "Géante glacée",
            diameter: "51 118 km",
            distance: "2.87 milliards km",
            period: "84 ans",
            temperature: "-197°C",
            description: "Planète inclinée sur son axe de rotation"
        },
        neptune: {
            name: "Neptune",
            type: "Géante glacée",
            diameter: "49 528 km",
            distance: "4.5 milliards km",
            period: "165 ans",
            temperature: "-201°C",
            description: "La planète la plus éloignée du Soleil"
        }
    };

    // Variables de simulation
    let simulationSpeed = 1;
    let isPlaying = true;
    let rotationAngles = {
        mercury: 0,
        venus: 0,
        earth: 0,
        mars: 0,
        jupiter: 0,
        saturn: 0,
        uranus: 0,
        neptune: 0
    };
    let simulationTime = 0;
    let rotationCount = 0;
    let distanceTraveled = 0;
    let cometPasses = 0;
    let selectedPlanet = null;
    let showOrbits = true;
    let zoomLevel = 1;
    let isNightMode = false;

    // Éléments du DOM
    const speedControl = document.getElementById('speed-control');
    const speedValue = document.getElementById('speed-value');
    const playPauseBtn = document.getElementById('play-pause');
    const resetViewBtn = document.getElementById('reset-view');
    const toggleOrbitsBtn = document.getElementById('toggle-orbits');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const nightModeBtn = document.getElementById('night-mode');
    const selectedPlanetTitle = document.getElementById('selected-planet');
    const planetStats = document.getElementById('planet-stats');
    const simulationTimer = document.getElementById('simulation-timer');
    const rotationCountEl = document.getElementById('rotation-count');
    const distanceTraveledEl = document.getElementById('distance-traveled');
    const cometPassesEl = document.getElementById('comet-passes');
    const universeBg = document.getElementById('universe-bg');
    const sun = document.getElementById('sun');
    const comet = document.getElementById('comet');
    const stars = document.getElementById('stars');
    const creditsModal = document.getElementById('credits-modal');
    const helpModal = document.getElementById('help-modal');
    const fullscreenBtn = document.getElementById('fullscreen');

    // Initialiser les étoiles
    function initStars() {
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = Math.random() * 0.5 + 0.2;
            star.style.animationDelay = `${Math.random() * 3}s`;
            stars.appendChild(star);
        }
    }

    // Mettre à jour l'affichage d'une planète
    function updatePlanetDisplay(planetId) {
        const planet = planetsData[planetId];
        if (!planet) return;

        selectedPlanet = planetId;
        selectedPlanetTitle.textContent = planet.name;

        let statsHTML = `
            <div style="margin-bottom: 15px; font-size: 1.1rem; color: #00ff88;">
                ${planet.description}
            </div>
            <div style="display: grid; gap: 10px;">
        `;

        if (planetId === 'sun') {
            statsHTML += `
                <div><strong>Type :</strong> ${planet.type}</div>
                <div><strong>Diamètre :</strong> ${planet.diameter}</div>
                <div><strong>Masse :</strong> ${planet.mass}</div>
                <div><strong>Température :</strong> ${planet.temperature}</div>
            `;
        } else {
            statsHTML += `
                <div><strong>Type :</strong> ${planet.type}</div>
                <div><strong>Diamètre :</strong> ${planet.diameter}</div>
                <div><strong>Distance du Soleil :</strong> ${planet.distance}</div>
                <div><strong>Période orbitale :</strong> ${planet.period}</div>
                <div><strong>Température :</strong> ${planet.temperature}</div>
            `;
        }

        statsHTML += `</div>`;
        planetStats.innerHTML = statsHTML;

        // Surligner la planète sélectionnée
        document.querySelectorAll('.planet').forEach(p => {
            p.style.boxShadow = '';
        });

        const selectedPlanetEl = document.getElementById(planetId);
        if (selectedPlanetEl) {
            selectedPlanetEl.style.boxShadow = '0 0 30px #00ff88';
        }
    }

    // Animer les planètes
    function animatePlanets() {
        if (!isPlaying) return;

        // Vitesses orbitales relatives (jours terrestres pour une orbite complète)
        const orbitalSpeeds = {
            mercury: 0.24,
            venus: 0.62,
            earth: 1,
            mars: 1.88,
            jupiter: 11.86,
            saturn: 29.46,
            uranus: 84.01,
            neptune: 164.8
        };

        // Mettre à jour les angles de rotation
        Object.keys(rotationAngles).forEach(planet => {
            rotationAngles[planet] += (0.5 / orbitalSpeeds[planet]) * simulationSpeed;
            rotationAngles[planet] %= 360;

            const planetContainer = document.querySelector(`[data-planet="${planet}"]`);
            if (planetContainer) {
                planetContainer.style.transform = `rotate(${rotationAngles[planet]}deg)`;
            }
        });

        // Mettre à jour la distance parcourue (estimation)
        distanceTraveled += 1000 * simulationSpeed;
        distanceTraveledEl.textContent = formatNumber(Math.round(distanceTraveled));

        // Animer la comète
        animateComet();
    }

    // Animer la comète
    function animateComet() {
        const time = Date.now() * 0.001;
        const cometX = Math.cos(time * 0.3) * 400 + 50;
        const cometY = Math.sin(time * 0.5) * 300 + 50;

        comet.style.left = `${cometX}%`;
        comet.style.top = `${cometY}%`;

        // Compteur de passages
        if (Math.sin(time * 0.3) > 0.99) {
            cometPasses++;
            cometPassesEl.textContent = cometPasses;

            // Effet de traînée
            createCometTrail(cometX, cometY);
        }
    }

    // Créer une traînée de comète
    function createCometTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'comet-trail';
        trail.style.cssText = `
            position: absolute;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            left: ${x}%;
            top: ${y}%;
            transform-origin: left center;
            transform: rotate(${Math.random() * 360}deg);
            opacity: 0.7;
            filter: blur(1px);
        `;
        universeBg.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 2000);
    }

    // Formater les grands nombres
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Mettre à jour le timer
    function updateTimer() {
        simulationTime++;

        const minutes = Math.floor(simulationTime / 60);
        const seconds = simulationTime % 60;

        simulationTimer.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Compter les rotations complètes
        if (simulationTime % 60 === 0) {
            rotationCount++;
            rotationCountEl.textContent = rotationCount;
        }
    }

    // Gestionnaires d'événements
    speedControl.addEventListener('input', function () {
        simulationSpeed = parseFloat(this.value);
        speedValue.textContent = `${simulationSpeed}x`;
    });

    playPauseBtn.addEventListener('click', function () {
        isPlaying = !isPlaying;

        if (isPlaying) {
            this.innerHTML = '<i class="fas fa-pause"></i> Pause';
            this.classList.remove('active');
        } else {
            this.innerHTML = '<i class="fas fa-play"></i> Lecture';
            this.classList.add('active');
        }
    });

    resetViewBtn.addEventListener('click', function () {
        rotationAngles = {
            mercury: 0,
            venus: 0,
            earth: 0,
            mars: 0,
            jupiter: 0,
            saturn: 0,
            uranus: 0,
            neptune: 0
        };

        simulationTime = 0;
        rotationCount = 0;
        distanceTraveled = 0;
        cometPasses = 0;

        rotationCountEl.textContent = '0';
        distanceTraveledEl.textContent = '0';
        cometPassesEl.textContent = '0';

        // Réappliquer les transformations
        Object.keys(rotationAngles).forEach(planet => {
            const planetContainer = document.querySelector(`[data-planet="${planet}"]`);
            if (planetContainer) {
                planetContainer.style.transform = `rotate(${rotationAngles[planet]}deg)`;
            }
        });
    });

    toggleOrbitsBtn.addEventListener('click', function () {
        showOrbits = !showOrbits;

        document.querySelectorAll('.orbit').forEach(orbit => {
            orbit.style.display = showOrbits ? 'block' : 'none';
        });

        this.classList.toggle('active');
        this.innerHTML = showOrbits ?
            '<i class="fas fa-circle"></i> Orbites' :
            '<i class="fas fa-circle"></i> Cacher orbites';
    });

    zoomInBtn.addEventListener('click', function () {
        zoomLevel = Math.min(zoomLevel + 0.2, 2);
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', function () {
        zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
        updateZoom();
    });

    function updateZoom() {
        const scale = `scale(${zoomLevel})`;
        document.querySelectorAll('.planet-container').forEach(container => {
            container.style.transform = `rotate(${rotationAngles[container.dataset.planet]}deg) ${scale}`;
        });
    }

    nightModeBtn.addEventListener('click', function () {
        isNightMode = !isNightMode;

        if (isNightMode) {
            universeBg.style.background = 'radial-gradient(circle at center, #000814 0%, #000000 100%)';
            this.innerHTML = '<i class="fas fa-sun"></i> Mode jour';
        } else {
            universeBg.style.background = 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)';
            this.innerHTML = '<i class="fas fa-moon"></i> Mode nuit';
        }
    });

    // Sélection des planètes
    document.querySelectorAll('.planet, .planet-card').forEach(element => {
        element.addEventListener('click', function () {
            const planetId = this.dataset.planet || this.id;
            updatePlanetDisplay(planetId);
        });
    });

    // Gestion des modals
    document.getElementById('show-credits').addEventListener('click', function () {
        creditsModal.style.display = 'flex';
    });

    document.getElementById('show-help').addEventListener('click', function () {
        helpModal.style.display = 'flex';
    });

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function () {
            creditsModal.style.display = 'none';
            helpModal.style.display = 'none';
        });
    });

    // Plein écran
    fullscreenBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Erreur plein écran: ${err.message}`);
            });
            this.innerHTML = '<i class="fas fa-compress"></i> Quitter plein écran';
        } else {
            document.exitFullscreen();
            this.innerHTML = '<i class="fas fa-expand"></i> Plein écran';
        }
    });

    // Fermer les modals en cliquant à l'extérieur
    window.addEventListener('click', function (event) {
        if (event.target === creditsModal) {
            creditsModal.style.display = 'none';
        }
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Initialisation
    function init() {
        initStars();
        updatePlanetDisplay('earth');

        // Animation loop
        setInterval(() => {
            if (isPlaying) {
                animatePlanets();
            }
        }, 50);

        // Timer loop
        setInterval(() => {
            if (isPlaying) {
                updateTimer();
            }
        }, 1000);

        // Lancer une comète initiale
        setTimeout(() => {
            animateComet();
        }, 1000);
    }

    // Lancer l'application
    init();
});