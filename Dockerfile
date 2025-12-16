# Étape 1: Build
FROM node:18-alpine as builder

WORKDIR /app

# Copier les fichiers de l'application
COPY package*.json ./
COPY index.html ./
COPY styles.css ./
COPY app.js ./
COPY tests/ ./tests/

# Installer les dépendances pour les tests
RUN npm init -y && npm install --save-dev jest

# Étape 2: Production
FROM nginx:alpine

# Copier les fichiers statiques
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/styles.css /usr/share/nginx/html/
COPY --from=builder /app/app.js /usr/share/nginx/html/

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]