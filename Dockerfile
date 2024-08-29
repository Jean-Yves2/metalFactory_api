FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN npm run build

ENV NODE_ENV=production

CMD if [ "$NODE_ENV" = "production" ]; then \
        npm run start:prod; \
    elif [ "$NODE_ENV" = "development" ]; then \
        npm run start:dev; \
    elif [ "$NODE_ENV" = "test" ]; then \
        npm run test; \
    else \
        npm run start; \
    fi



