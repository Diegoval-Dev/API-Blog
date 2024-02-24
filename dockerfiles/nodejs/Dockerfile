# Usa la imagen oficial de Node.js como imagen base
FROM node:21.6.2

# Establece el directorio de trabajo en el contenedor
WORKDIR /Blog

# Copia los archivos de definición de paquetes para la caché de capas
COPY package.json .

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos y directorios restantes al directorio de trabajo
COPY . .

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]