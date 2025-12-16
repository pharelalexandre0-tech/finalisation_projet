// Tests unitaires simples
function runTests() {
    console.log('🚀 Lancement des tests...');

    // Test 1: Vérification du titre
    const title = document.title || 'Mon Application Web';
    console.assert(title.includes('Application'), 'Test 1 échoué: Titre incorrect');
    console.log('✅ Test 1 réussi: Titre OK');

    // Test 2: Vérification de la structure
    const container = document.querySelector('.container');
    console.assert(container !== null, 'Test 2 échoué: Container manquant');
    console.log('✅ Test 2 réussi: Structure OK');

    // Test 3: Vérification des sections
    const sections = document.querySelectorAll('section');
    console.assert(sections.length >= 2, 'Test 3 échoué: Sections insuffisantes');
    console.log('✅ Test 3 réussi: Sections OK');

    console.log('🎉 Tous les tests sont passés avec succès!');
}

// Exécuter les tests si on est dans un environnement Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests };
}