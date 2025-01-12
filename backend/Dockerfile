FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/public /app/public
RUN npm i --only=production
EXPOSE 3000
CMD ["node", "dist/main"]