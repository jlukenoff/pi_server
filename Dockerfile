#image to build upon
FROM arm32v7/node

#make the directory within container for source code to live
RUN mkdir -p /src/app

#tell docker where the source should live
WORKDIR /src/app

#Move source code to WORKDIR
COPY . /src/app

#Install dependencies
RUN npm install

#Expose container port
EXPOSE 8080

#start app
CMD [ "npm", "start" ]