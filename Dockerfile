FROM node:18-alpine as build-ui
WORKDIR /ui

COPY ui/*.json ./
RUN npm ci

COPY ui ./
RUN npm run build
RUN npm run check

FROM azul/zulu-openjdk-alpine:17 as build-server
RUN apk add --no-cache chromium chromium-chromedriver # to run e2e tests later
WORKDIR /app

RUN apk add --no-cache binutils # for objcopy, needed by jlink
COPY build-jre.sh .
RUN ./build-jre.sh jre
RUN ./build-jre.sh jre-test

COPY gradlew ./
COPY gradle gradle/
RUN ./gradlew --version

COPY *gradle* ./
RUN ./gradlew tasks

COPY . ./
RUN ./gradlew testClasses jar

COPY --from=build-ui /ui/build public

# The final image
FROM alpine as final
RUN apk add --no-cache postgresql-client # for backups
RUN adduser -S app

ARG VERSION=dev
ENV VERSION=$VERSION

WORKDIR /app
COPY --from=build-ui /ui/build public
COPY --from=build-server /app/app/build/libs ./
COPY --from=build-server /app/syncer/build/libs/syncer.jar public/syncer-$VERSION.jar
COPY --from=build-server /app/jre /jre
COPY .env docker-*.sh ./

RUN echo "Setting built version to $VERSION" &&  \
    sed -Ei "s/\\\$VERSION/$VERSION/" public/index.html && \
    gzip -k public/assets/* public/i18n/*.json # public/img/*.svg

ENV TZ=Europe/Tallinn
ENV JAVA_MEM="-Xss256K -Xmx350M"

CMD ./docker-cmd.sh

ENV PORT=8080
EXPOSE $PORT
