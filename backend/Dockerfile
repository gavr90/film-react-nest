FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package-lock.json /app/
COPY --from=build /app/public /app/public
RUN npm i --only=production
EXPOSE 3000
CMD ["node", "dist/main"]