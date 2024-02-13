# Utiliser l'image Node.js latest comme base
FROM node:alpine as base

# Installer pnpm globalement
RUN npm install -g pnpm

# Créer le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et pnpm-lock.yaml pour installer les dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances avec pnpm
RUN pnpm install 

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

EXPOSE 3000

FROM base as production

RUN pnpm run build

CMD ["pnpm", "start"]