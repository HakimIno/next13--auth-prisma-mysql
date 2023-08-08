FROM node:18.16

WORKDIR /app

COPY package*.json ./
COPY ./prisma ./prisma

RUN yarn install 
RUN yarn prisma generate --schema prisma/schema.prisma

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]