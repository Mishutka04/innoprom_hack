FROM node:appine as build

COPY package.json package.json

RUN npm run


RUN pip insrall -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver"]