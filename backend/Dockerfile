# Verwende ein Node.js-Image als Basis
FROM node:14

# Erstelle ein Verzeichnis für die Anwendung
WORKDIR /app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Anwendungscodes
COPY . .

# Exponiere den Port, den die Anwendung nutzt (z.B., 5000)
EXPOSE 5000

# Starte die Anwendung
CMD ["npm", "start"]
