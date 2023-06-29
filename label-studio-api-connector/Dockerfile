# Base image
FROM node:18.16.1-alpine As development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=development

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Create a user called nestjs
RUN adduser -D nestjs

# Switch to the nestjs user
USER nestjs

# Start the server using the production build
FROM node:18.16.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main.js"]
