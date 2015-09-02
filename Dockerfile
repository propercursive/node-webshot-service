FROM node:0.10-onbuild

# Install fonts

RUN mkdir -p /usr/share/fonts/truetype/app/

COPY fonts/* /usr/share/fonts/truetype/app/

RUN fc-cache -f -v

# Install app dependencies
RUN npm install

EXPOSE  8080

CMD ["node", "server.js"]