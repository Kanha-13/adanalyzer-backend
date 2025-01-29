FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Start the Node.js app
CMD ["node", "app.js"]
