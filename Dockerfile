FROM node

WORKDIR /var/www/frontend

COPY package.json .

RUN npm install -g npm
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]