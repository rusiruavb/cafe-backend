FROM node:14.18-alpine AS BUILD_IMAGE
RUN apk add --no-cache nodejs npm
WORKDIR /cafe-backend
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run prepare 

FROM node:14.18-alpine
WORKDIR /app
COPY --from=BUILD_IMAGE /cafe-backend /app/
EXPOSE 8087
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]