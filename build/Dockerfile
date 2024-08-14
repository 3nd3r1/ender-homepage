FROM node:20-alpine AS builder

ARG GRAPHCMS_ENDPOINT=${GRAPHCMS_ENDPOINT}
ENV GRAPHCMS_ENDPOINT=${GRAPHCMS_ENDPOINT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS runner

COPY --from=builder /usr/src/app/out /usr/share/nginx/html
COPY ./build/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
