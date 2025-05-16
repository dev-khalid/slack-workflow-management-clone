FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

RUN npm ci
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]


# I don't need tsconfig right? then why it's not working?