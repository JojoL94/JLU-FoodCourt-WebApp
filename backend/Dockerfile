FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

EXPOSE 3010
CMD [ "node", "index.js" ]
