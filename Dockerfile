FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
# ci is for contunues inegrations
RUN npm ci 
COPY . .
# CMD [ "npm","start" ]
# CMD npm start
CMD [ "npm", "run", "dev" ]