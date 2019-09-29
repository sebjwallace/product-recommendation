FROM nikolaik/python-nodejs

WORKDIR /app
ADD ./ ./

RUN npm install -g nodemon

RUN apt-get update
RUN pip install -r requirements.txt