# Utiliser une image Node.js basée sur Debian ou Ubuntu
FROM node:21-bullseye-slim

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y curl

# Télécharger le script wait-for-it
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
