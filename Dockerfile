#Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]