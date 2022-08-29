FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 8080
EXPOSE 5432
CMD ["yarn", "start"]