﻿# Verwende ein Node.js-Image als Basis
FROM node:18 as build

# Erstelle ein Verzeichnis für die Anwendung
WORKDIR /app

# Kopiere package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install --legacy-peer-deps

# Kopiere den Rest des Anwendungscodes
COPY . .

# Baue das Projekt
RUN npm run build

# Installiere ein einfaches Webserver-Image für die Bereitstellung
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere den Port, den die Anwendung nutzt (z.B., 80)
EXPOSE 80

# Kein CMD nötig, nginx startet automatisch
