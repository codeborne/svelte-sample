FROM node:18-alpine as build-ui
WORKDIR /app

COPY ui/*.json ./
RUN npm ci

COPY ui ./
RUN npm run build
RUN npm run check


FROM nginx:alpine-slim as final

ARG VERSION=dev
ENV VERSION=$VERSION

WORKDIR /usr/share/nginx/html
COPY --from=build-ui /app/build ./

RUN echo "Setting built version to $VERSION" &&  \
    sed -Ei "s/\\\$VERSION/$VERSION/" index.html
