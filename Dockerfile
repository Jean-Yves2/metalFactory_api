FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]