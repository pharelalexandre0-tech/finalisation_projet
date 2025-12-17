# Étape 1: Builder avec les fichiers FRAIS
FROM node:18-alpine as builder

WORKDIR /app

# ⭐⭐ COPIE TOUS LES FICHIERS ACTUELS ⭐⭐
# Pas de cache, toujours copier les fichiers frais
COPY . .

# Installer les dépendances pour les tests
RUN npm init -y && npm install --save-dev jest

# Optionnel : Exécuter les tests pendant le build
# RUN npx jest tests/ --passWithNoTests || echo "Tests skipped"

# Étape 2: Production avec métadonnées
FROM nginx:alpine

# Métadonnées pour tracer le build
LABEL maintainer="pharelalexandre80-tech"
LABEL version="1.0"
LABEL description="Application TP DevOps CI/CD"
LABEL org.opencontainers.image.source="https://github.com/pharelalexandre80-tech/finalisation_projet"

# ⭐⭐ COPIE LES FICHIERS DU BUILDER ⭐⭐
# Ces fichiers sont FRAIS car copiés depuis l'étape builder
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/styles.css /usr/share/nginx/html/
COPY --from=builder /app/app.js /usr/share/nginx/html/

# ⭐⭐ COPIE DIRECTE AUSSI (double sécurité) ⭐⭐
# Copie aussi directement depuis le contexte actuel
COPY index.html /usr/share/nginx/html/index-current.html 2>/dev/null || true

# Copier la configuration nginx (si existe)
COPY nginx.conf /etc/nginx/nginx.conf 2>/dev/null || echo "Using default nginx config"

# Exposer le port
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]