FROM node:18.19.1
RUN mkdir /app
WORKDIR /app
ADD package.json /app
RUN npm install
ADD /src/ /app
EXPOSE 3030
CMD npm start