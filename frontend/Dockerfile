FROM node

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY . .

COPY bash.sh /tmp/

RUN bash /tmp/bash.sh

EXPOSE 5173

CMD [ "npm", "run", "dev" ]