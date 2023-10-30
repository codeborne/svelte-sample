FROM node:20-alpine as build-ui
WORKDIR /app

COPY ui/*.json ui/.npmrc ./
RUN npm ci

COPY ui ./
RUN npm run build
RUN npm run check


FROM nginx:alpine-slim as final

ARG VERSION=dev
ENV VERSION=$VERSION

WORKDIR /app
COPY --from=build-ui /app/build ./
COPY nginx.conf /etc/nginx/nginx.conf

RUN echo "Setting built version to $VERSION" &&  \
    sed -Ei "s/\\\$VERSION/$VERSION/" index.html
