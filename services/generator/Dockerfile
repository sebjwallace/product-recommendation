FROM nikolaik/python-nodejs
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN npm install -g nodemon
RUN apt-get update
RUN pip install -r requirements.txt